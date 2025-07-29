import * as M from "../mongodb";

const connectCB = async (db: M.MongoDB) => {
  try {
    const user = db.collection("user");

    const deleteOneResult = await user.deleteOne({ name: { $regex: /^J.*$/ } });
    console.log("deleteOneResult", deleteOneResult);

    const deleteManyResult = await user.deleteMany({
      name: { $regex: /^J.*$/ },
    });
    console.log("deleteManyResult", deleteManyResult);

    const deleteAllResult = await user.deleteMany({});
    console.log("deleteAllResult", deleteAllResult);

    const userDocument = await user.find({}).toArray();
    console.log("userDocument", userDocument);
  } catch (e) {
    if (e instanceof Error) console.error(e.message);
  }
};

const deleteTest = () => {
  M.connectAndUseDB(connectCB, "mydb");
};

deleteTest();
