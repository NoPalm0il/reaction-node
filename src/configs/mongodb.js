const MongoClient = require("mongodb").MongoClient;

const client = new MongoClient(process.env.MONGO_URI, { useUnifiedTopology: true });

const connectDB = () => {
  return new Promise((resolve, reject) => {
    client.connect((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

const getDB = () => client.db("maindb");

const disconnectDB = () => _client.close();

module.exports = { connectDB, getDB, disconnectDB };
