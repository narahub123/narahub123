"use strict";

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");
const { v4: uuidv4 } = require("uuid");

// DynamoDB 클라이언트 설정
const client = new DynamoDBClient({});
const ddb = DynamoDBDocumentClient.from(client);

// 테이블 이름 상수 정의
const USERS_TABLE = process.env.USERS_TABLE || "users-table";

exports.getUser = async (event) => {
  const userId = event.pathParameters.id;

  const result = await ddb.send(
    new GetCommand({
      TableName: USERS_TABLE,
      Key: { id: userId },
    })
  );

  if (!result.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: `User ${userId} not found`,
      }),
    };
  }

  // const queryParams = event.queryStringParameters;

  // const userType = queryParams.userType;

  return {
    statusCode: 200,
    body: JSON.stringify(result.Item),
  };
};

exports.createUser = async (event) => {
  const body = JSON.parse(event.body);
  const id = uuidv4();
  const user = { id, ...body };

  await ddb.send(
    new PutCommand({
      TableName: USERS_TABLE,
      Item: user,
    })
  );

  return {
    statusCode: 201,
    body: JSON.stringify(
      {
        message: `User created successfully`,
        user,
      },
      null,
      2
    ),
  };
};

exports.updateUser = async (event) => {
  const userId = event.pathParameters.id;

  const body = JSON.parse(event.body || "{}");

  const result = await ddb.send(
    new UpdateCommand({
      TableName: USERS_TABLE,
      Key: { id: userId },
      UpdateExpression: "set #name = :name, #email = :email",
      ExpressionAttributeNames: {
        "#name": "name",
        "#email": "email",
      },
      ExpressionAttributeValues: {
        ":name": body.name,
        ":email": body.email,
      },
      ReturnValues: "ALL_NEW",
    })
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "User updated successfully",
      user: result.Attributes,
    }),
  };
};

exports.deleteUser = async (event) => {
  const userId = event.pathParameters.id;

  await ddb.send(
    new DeleteCommand({
      TableName: USERS_TABLE,
      Key: { id: userId },
    })
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `User Id: ${userId} deleted`,
    }),
  };
};
