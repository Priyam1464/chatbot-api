const { UserChatStateService } = require("../services/userChatStateService");

const userChatStateExists = async (req, res, next) => {
  try {
    const userChatStateService = new UserChatStateService();
    const user = await userChatStateService.userChatStateExists(req.params.id);
    if (user === null) {
      const err = new Error("Candidate doesnt exists");
      throw err;
    }
    res.locals.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

const getUserChatState = (req, res, next) => {
  try {
    return res.json({ data: res.locals.user }).status(200);
  } catch (err) {
    next(err);
  }
};

const addUserChatState = async (req, res, next) => {
  try {
    const userChatStateService = new UserChatStateService();
    const user = await userChatStateService.userChatStateExists(
      req.body.telegramId
    );
    console.log("Recruiter", recruiter);
    if (user !== null) {
      const err = new Error("Recruiter alreaady exists");
      throw err;
    }

    userChatStateService.addUserChatState(req.body);
    res.send("Recruiter Inserted").status(200);
  } catch (err) {
    next(err);
  }
};

const editUserChatState = async (req, res, next) => {
  try {
    const userChatStateService = new UserChatStateService();
    await userChatStateService.updateUserChatState(req.params.id, req.body);
    res.send("Recruiter Profile Updated").status(200);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  add: addUserChatState,
  get: [userChatStateExists, getUserChatState],
  update: [userChatStateExists, editUserChatState],
};
