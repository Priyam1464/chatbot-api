const MongoDbConnection = require("../dbInstance").MongoDbConnection;
const { MapApiDataToResponse } = require("../mappers/mappers");

module.exports.RecruiterService = class RecruiterService {
  async recruiterExists(telegramId) {
    const recruiter = await MongoDbConnection.getInstance()
      .database.collection("recruiters")
      .findOne({
        telegramId,
      });

    return recruiter;
  }
  async getMyJobOpenings(telegramId) {
    const jobOpenings = await MongoDbConnection.getInstance()
      .database.collection("recruiters")
      .findOne(
        {
          telegramId,
        },
        { jobOpenings: 1 }
      );

    let mapper = new MapApiDataToResponse();
    return mapper.mapDataToRecruiterJobOpenings(jobOpenings);
  }

  async updateProfile(telegramId, profile, jobOpening) {
    if (jobOpening) {
      this.addJobOpening(telegramId, jobOpening);
    }
    await MongoDbConnection.getInstance()
      .database.collection("recruiters")
      .updateOne({ telegramId }, { $set: profile });
  }

  async addRecruiter(recruiter) {
    await MongoDbConnection.getInstance()
      .database.collection("recruiters")
      .insertOne(recruiter);
  }

  async addJobOpening(telegramId, jobOpening) {
    console.log(jobOpening);
    await MongoDbConnection.getInstance()
      .database.collection("recruiters")
      .update(
        { telegramId },
        {
          $push: {
            jobOpenings: jobOpening,
          },
        }
      );
  }

  viewPotentialCandidates(telegramId) {
    const jobOpenings = this.getMyJobOpenings();
    // for (let i = 0; i < jobOpenings.length; i++) {
    //   const potenti = MongoDbConnection.getDatabase().candidates.find({
    //     "skills": {
    //       $in: skills,
    //     },
    //   });
    // }

    return jobOpenings;
  }
};
