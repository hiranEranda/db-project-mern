const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const dbOperations = require("../controllers/dbOperations");
const auth = require("../middleware/auth");

const router = express.Router();

// @route   POST api/admin/adlogin
// @desc    Admin Login
// @access  public
router.post("/adlogin", async (req, res) => {
  const { adName, password } = req.body;

  try {
    const admin = await dbOperations.getAdmin(adName);
    if (admin.length === 0) return res.json({ error: "admin not found" });
    else {
      bcrypt.compare(password, admin[0].password).then((match) => {
        if (!match) return res.json({ error: "Wrong password" });
        else {
          jwt.sign(
            { id: admin[0].admin_id, adminname: admin[0].admin_name },
            config.get("jwtPrivateKey"),
            (err, token) => {
              if (err) return console.log(err.message);
              res.json({
                token,
                username: admin[0].admin_name,
                id: admin[0].admin_id,
              });
            }
          );
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
});

// @route   GET api/admin/allcomplaints
// @desc    Get all complaints
// @access  Private
router.get("/allcomplaints", auth, async (req, res) => {
  console.log("admin - allcomplaints");
  try {
    let data = await dbOperations.getAllComplaints();
    data.map((item) => {
      item.complaint_date = item.complaint_date.toISOString().split("T")[0];
      return item;
    });
    res.send(data);
  } catch (e) {
    res.send(e.message);
  }
});

// @route   GET api/admin/viewcomplaint/complaint_id
// @desc    View a complaint
// @access  Private
router.get("/viewcomplaint/:complaint_id", auth, async (req, res) => {
  console.log("admin - viewcomplaint");
  let id = req.params.complaint_id;
  try {
    let data = await dbOperations.AdViewComplaint(id);
    data.map((item) => {
      item.complaint_date = item.complaint_date.toISOString().split("T")[0];
      return item;
    });
    res.send(data);
  } catch (e) {
    res.send(e.message);
  }
});

// @route   GET api/admin/sellers
// @desc    get sellers
// @access  Private
router.get("/sellers", auth, async (req, res) => {
  console.log("admin - sellers");
  try {
    let data = await dbOperations.getSellers();
    res.send(data);
  } catch (e) {
    res.send(e.message);
  }
});

module.exports = router;
