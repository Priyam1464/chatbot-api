const {
  add,
  edit,
  allOpenings,
  relevantOpenings,
  getInfo,
  status,
} = require("../controllers/candidate");
const express = require("express");
const router = express.Router();

router.get("/:id", getInfo);
router.post("/", add);
router.patch("/:id", edit);
router.get("/openings/:id", allOpenings);
router.get("/relevantopenings/:id", relevantOpenings);
router.get("/exists/:id", status);

module.exports = router;
