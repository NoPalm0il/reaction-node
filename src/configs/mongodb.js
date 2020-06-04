const MongoClient = require("mongodb").MongoClient;

const options = process.env.MONGO_CERT
  ? {
      ssl: true,
      sslValidate: true,
      sslCA: [Buffer.from(process.env.MONGO_CERT, "base64")],
      useUnifiedTopology: true,
    }
  : { useUnifiedTopology: true };
const mongodb = new MongoClient(process.env.MONGO_URI, options);

const connectDB = () => {
  return new Promise((resolve, reject) => {
    mongodb.connect((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};
const getDB = () => mongodb.db("lessons");
const disconnectDB = () => _db.close();

module.exports = { connectDB, getDB, disconnectDB };
