const {
  add,
  edit,
  addOpening,
  getOpenings,
  get,
  status,
} = require("../controllers/recruiters");
const express = require("express");
const router = express.Router();

router.get("/:id", get);
router.post("/", add);
router.patch("/:id", edit);
router.get("/openings/:id", getOpenings);
router.patch("/openings/:id", addOpening);
router.get("/exists/:id", status);

module.exports = router;
