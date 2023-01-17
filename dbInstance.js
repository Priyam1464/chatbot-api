const { MongoClient, ObjectId } = require("mongodb");
module.exports.MongoDbConnection = class MongoDbConnection {
  constructor() {
    if (!MongoDbConnection._instance) {
      const mongoClient = new MongoClient(process.env.MONGO_DB_URL);
      this.database = mongoClient.db("chatbot");
      MongoDbConnection._instance = this;
    }
    return MongoDbConnection._instance;
  }

  static getInstance() {
    return this._instance;
  }
};
