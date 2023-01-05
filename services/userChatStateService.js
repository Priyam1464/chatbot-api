const MongoDbConnection = require("../dbInstance").MongoDbConnection;

module.exports.UserChatStateService = class UserChatStateService {
  async userChatStateExists(telegramId) {
    const user = await MongoDbConnection.getInstance()
      .database.collection("userChatState")
      .findOne({
        telegramId,
      });

    return user;
  }
  async getUserChatStateDetails(telegramId) {
    const userDetails = await MongoDbConnection.getInstance()
      .database.collection("userChatState")
      .findOne({
        telegramId,
      });
    return userDetails;
  }

  async updateUserChatState(telegramId, profile) {
    await MongoDbConnection.getInstance()
      .database.collection("userChatState")
      .updateOne({ telegramId }, { $set: profile });
  }

  async addUserChatState(user) {
    await MongoDbConnection.getInstance()
      .database.collection("userChatState")
      .insertOne(user);
  }
};
