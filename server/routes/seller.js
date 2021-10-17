const express = require("express");
const dbOperations = require("../controllers/dbOperations");
const auth = require("../middleware/auth");

const router = express.Router();

// @route   GET api/sellers
// @desc    get sellers info
// @access  Private
router.get("/", auth, async (req, res) => {
  console.log("complanint - sellers");
  try {
    let data = await dbOperations.getSellersInfo();
    res.send(data);
  } catch (e) {
    res.send(e.message);
  }
});

module.exports = router;
