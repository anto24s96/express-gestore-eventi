const events = require("../controllers/events.js");
const express = require("express");
const router = express.Router();

//Rotte
router.get("/", events.index);
router.post("/", events.store);
router.get("/:event", events.show);
router.put("/:id", events.update);

module.exports = router;
