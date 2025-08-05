const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

client.connect((err) => {
  const collection = client.db("test").collection("devices");

  client.close();
});

async function run() {
  await client.connect();
  const adminDB = client.db("test").admin();
  const listDatabases = await adminDB.listDatabases();

  console.log(listDatabases);

  return "OK";
}

run()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
