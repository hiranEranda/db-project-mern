const express = require("express");
const dbOperations = require("../controllers/dbOperations");
const auth = require("../middleware/auth");

const router = express.Router();

// @route   POST api/complaints/addcomplaint
// @desc    Add a complaints
// @access  Private
router.post("/addcomplaint", auth, async (req, res) => {
  let details = req.body;
  details.client_id = req.client.id;
  try {
    let data = await dbOperations.addComplaints(details);
    if (data) return res.status(200).json({ msg: "complaint added" });
    res.status(400).json({ error: "FATAL ERROR: complaint not added" });
  } catch (e) {
    console.log(e.message);
  }
});

// @route   GET api/complaints/mycomplaints
// @desc    Get my complaints
// @access  Private
router.get("/mycomplaints", auth, async (req, res) => {
  console.log("mycomplaints");
  let id = req.client.id;
  try {
    let data = await dbOperations.getMyComplaints(id);
    res.send(data);
  } catch (e) {
    console.log(e.message);
  }
});

// @route   GET api/complaints/viewcomplaint/complaint_id
// @desc    View a complaint
// @access  Private
router.get("/viewcomplaint/:complaint_id", auth, async (req, res) => {
  console.log("viewcomplaint");
  let id = req.params.complaint_id;
  try {
    let data = await dbOperations.viewComplaint(id);
    res.send(data);
  } catch (e) {
    console.log(e.message);
  }
});

// @route   DELETE api/complaints/deletecomplaint/id
// @desc    Delete a complaint
// @access  Private
router.delete("/deletecomplaint/:complaint_id", auth, async (req, res) => {
  console.log("deletecomplaint");
  let id = req.params.complaint_id;
  try {
    let data = await dbOperations.deleteComplaint(id);
    res.send(data);
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
