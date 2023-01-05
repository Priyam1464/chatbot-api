const CandidateService =
  require("../services/candidateService").CandidateService;

const candidateExists = async (req, res, next) => {
  try {
    const candidateService = new CandidateService();
    const candidate = await candidateService.candidateExists(req.params.id);
    // if (candidate === null) {
    //   const err = new Error("Candidate doesnt exists");
    //   throw err;
    // }
    res.locals.candidate = candidate;
    next();
  } catch (err) {
    next(err);
  }
};

const candidateStatus = async (req, res, next) => {
  const candidateService = new CandidateService();
  const candidate = await candidateService.candidateExists(req.params.id);
  let result = true;
  if (candidate === null) {
    result = false;
  }
  res.send(result).status(200);
};

const getCandidate = (req, res, next) => {
  try {
    return res.json({ data: res.locals.candidate }).status(200);
  } catch (err) {
    next(err);
  }
};
const addCandidate = async (req, res, next) => {
  try {
    const candidateService = new CandidateService();
    const candidate = await candidateService.candidateExists(
      req.body.telegramId
    );
    console.log("Candidate", req.body);
    if (candidate !== null) {
      const err = new Error("Candidate already exists");
      throw err;
    }

    candidateService.addCandidate(req.body);
    res.send("Candidate Inserted").status(200);
  } catch (err) {
    next(err);
  }
};

const editCandidateInfo = async (req, res, next) => {
  try {
    const candidateService = new CandidateService();

    await candidateService.updateProfile(req.params.id, req.body);
    res.send("Candidate Profile Updated").status(200);
  } catch (err) {
    next(err);
  }
};

const viewAllOpenings = async (req, res, next) => {
  try {
    const candidateService = new CandidateService();
    const allOpenings = await candidateService.getAllJobOpenings();
    console.log("allopenings", allOpenings);
    res.json({ data: allOpenings }).status(200);
  } catch (err) {
    next(err);
  }
};

const viewRelevantOpenings = async (req, res, next) => {
  try {
    const skills = res.locals.skills;
    const relevant = await candidateService.viewRelevantJobOpenings(
      req.params.id
    );
    res.json({ data: relevant }).status(200);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  add: addCandidate,
  edit: [candidateExists, editCandidateInfo],
  allOpenings: [candidateExists, viewAllOpenings],
  relevantOpenings: [candidateExists, viewRelevantOpenings],
  getInfo: [candidateExists, getCandidate],
  status: candidateStatus,
};
