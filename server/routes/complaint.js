const express = require("express");
const dbOperations = require("../controllers/dbOperations");

const router = express.Router();

// add a complaints
router.post("/addcomplaint", async (req, res) => {
  let details = req.query;
  console.log("addcomplaint");
  console.log(details);
  let data = await dbOperations.addComplaints(details);
  res.send(data);
});

// get my complaints
router.get("/mycomplaints/:id", async (req, res) => {
  console.log("mycomplaints");
  let id = req.params.id;
  let data = await dbOperations.getMyComplaints(id);
  res.send(data);
});

// view a complaint
router.get("/viewcomplaint/:complaint_id", async (req, res) => {
  console.log("viewcomplaint");
  let id = req.params.complaint_id;
  let data = await dbOperations.viewComplaint(id);
  res.send(data);
});

// delete a complaint
router.get("/deletecomplaint/:complaint_id", async (req, res) => {
  console.log("deletecomplaint");
  let id = req.params.complaint_id;
  let data = await dbOperations.deleteComplaint(id);
  res.send(data);
});

module.exports = router;
