const { add, get, update } = require("../controllers/userChatState");
const express = require("express");
const router = express.Router();

router.get("/:id", get);
router.post("/", add);
router.patch("/:id", update);

module.exports = router;
