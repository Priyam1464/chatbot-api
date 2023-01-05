const MongoDbConnection = require("../dbInstance").MongoDbConnection;

const { MapApiDataToResponse } = require("../mappers/mappers");
module.exports.CandidateService = class CandidateService {
  async candidateExists(telegramId) {
    console.log(telegramId);
    const candidate = await MongoDbConnection.getInstance()
      .database.collection("candidates")
      .findOne({
        telegramId: telegramId,
      });

    console.log("Result", candidate);

    return candidate;
  }

  async getAllJobOpenings() {
    const jobOpenings = await MongoDbConnection.getInstance()
      .database.collection("recruiters")
      .find({})
      .toArray();

    console.log("Job openings", jobOpenings);
    let mapper = new MapApiDataToResponse();
    return mapper.mapDataToJobOpenings(jobOpenings);
  }

  async updateProfile(telegramId, profile) {
    await MongoDbConnection.getInstance()
      .database.collection("candidates")
      .updateOne({ telegramId }, { $set: profile });
  }

  async addCandidate(candidate) {
    await MongoDbConnection.getInstance()
      .database.collection("candidates")
      .insertOne(candidate);
  }

  async viewRelevantJobOpenings(skills) {
    const jobOpenings = await MongoDbConnection.getInstance()
      .database.collection("recruiters")
      .find({
        "jobOpenings.description": {
          $in: skills,
        },
      })
      .toArray();

    return jobOpenings;
  }
};
