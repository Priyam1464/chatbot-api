const RecruiterService =
  require("../services/recruiterService").RecruiterService;
const recruiterExists = async (req, res, next) => {
  try {
    const recruiterService = new RecruiterService();
    const recruiter = await recruiterService.recruiterExists(req.params.id);
    // if (recruiter === null) {
    //   const err = new Error("Recruiter doesnt exists");
    //   throw err;
    // }
    res.locals.recruiter = recruiter;
    next();
  } catch (err) {
    next(err);
  }
};

const recruiterStatus = async (req, res, next) => {
  const recruiterService = new RecruiterService();
  const recruiter = await recruiterService.recruiterExists(req.params.id);
  let result = true;
  if (recruiter === null) {
    result = false;
  }
  res.send(result).status(200);
};

const getRecruiter = (req, res, next) => {
  try {
    return res.json({ data: res.locals.recruiter }).status(200);
  } catch (err) {
    next(err);
  }
};

const addRecruiter = async (req, res, next) => {
  try {
    const recruiterService = new RecruiterService();
    const recruiter = await recruiterService.recruiterExists(
      req.body.telegramId
    );
    console.log("Recruiter", recruiter);
    if (recruiter !== null) {
      const err = new Error("Recruiter alreaady exists");
      throw err;
    }

    recruiterService.addRecruiter(req.body);
    res.send("Recruiter Inserted").status(200);
  } catch (err) {
    next(err);
  }
};

const editRecruiterInfo = async (req, res, next) => {
  try {
    const recruiterService = new RecruiterService();
    const request = {};
    for (let key of Object.keys(req.body)) {
      if (key !== "description") {
        request[key] = req.body[key];
      }
    }
    if (req.body.description) {
      console.log("Request ", request);
      await recruiterService.updateProfile(
        req.params.id,
        request,
        req.body.description
      );
    } else {
      await recruiterService.updateProfile(req.params.id, req.body);
    }
    res.send("Recruiter Profile Updated").status(200);
  } catch (err) {
    next(err);
  }
};

const addJobOpening = async (req, res, next) => {
  try {
    const recruiterService = new RecruiterService();
    await recruiterService.addJobOpening(req.params.id, req.body.description);
    res.send("Job Opening added").status(200);
  } catch (err) {
    next(err);
  }
};

const viewMyOpenings = async (req, res, next) => {
  try {
    const recruiterService = new RecruiterService();
    const jobOpenings = await recruiterService.getMyJobOpenings(req.params.id);
    res.json({ data: jobOpenings }).status(200);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  add: addRecruiter,
  get: [recruiterExists, getRecruiter],
  edit: [recruiterExists, editRecruiterInfo],
  addOpening: [recruiterExists, addJobOpening],
  getOpenings: [recruiterExists, viewMyOpenings],
  status: recruiterStatus,
};
