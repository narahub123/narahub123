exports.getUser = async (event) => {
  const userId = event.pathParameters.id;

  const queryParams = event.queryStringParameters;

  const userType = queryParams.userType;

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `User Id: ${userId}, Type: ${userType}`,
      },
      null,
      2
    ),
  };
};

exports.createUser = async (event) => {
  const body = JSON.parse(event.body);
  const { name, email } = body;

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `User created successfully`,
        user: { name, email },
      },
      null,
      2
    ),
  };
};

exports.updateUser = async (event) => {
  const userId = event.pathParameters.id;

  const body = JSON.parse(event.body);

  const { name, email } = body;

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `User Id: ${userId} updated`,
      updated: { name, email },
    }),
  };
};

exports.deleteUser = async (event) => {
  const userId = event.pathParameters.id;

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `User Id: ${userId} deleted`,
    }),
  };
};
