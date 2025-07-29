import * as M from "../mongodb";

const connectCB = async (db: M.MongoDB) => {
  try {
    const user = db.collection("user");

    const one = await user.findOne({});

    console.log("one", one);

    const many = await user.find({}).toArray();

    console.log("many", many);
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
};

export const findTest = () => {
  M.connectAndUseDB(connectCB, "mydb");
};

findTest();
