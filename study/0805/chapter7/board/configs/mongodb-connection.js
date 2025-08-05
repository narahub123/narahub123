const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.MONGO_URI;

module.exports = function (callback) {
  return MongoClient.connect(uri, callback);
};
