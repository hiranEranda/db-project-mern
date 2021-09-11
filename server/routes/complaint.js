const express = require("express");
const dbOperations = require("../controllers/dbOperations");

const router = express.Router();

// add a complaints
router.get("/addcomplaint", async (req, res) => {
  let details = req.query;
  let data = await dbOperations.addComplaints(details);
  res.send(data[0]);
});

// get my complaints
router.get("/mycomplaints/:id", async (req, res) => {
  let id = req.params.id;
  let data = await dbOperations.getMyComplaints(id);
  res.send(data[0]);
});

// view a complaint
router.get("/viewcomplaint", async (req, res) => {
  let details = req.query;
  let data = await dbOperations.viewComplaint(details);
  res.send(data[0]);
});

module.exports = router;
