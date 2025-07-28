import * as M from "../mongodb";

const connectCB = async (db: M.MongoDB) => {
  try {
    const user = db.collection("user");

    try {
      await user.drop();
    } catch (e) {
      // 오류 무시
    }

    const jack = await user.insertOne({ name: "Jack", age: 32 });

    console.log("jack", jack);

    const janeAndTom = await user.insertMany([
      {
        name: "Jane",
        age: 22,
      },
      {
        name: "Tom",
        age: 11,
      },
    ]);

    console.log("janeAndTom", janeAndTom);
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
};

export const insertTest = () => {
  M.connectAndUseDB(connectCB, "mydb");
};

insertTest();
