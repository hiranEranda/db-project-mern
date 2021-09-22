const express = require("express");
const dbOperations = require("../controllers/dbOperations");

const router = express.Router();

// @route   GET api/seller/:id
// @desc    Get seller
// @access  public
router.get("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let data = await dbOperations.getSeller(id);

    res.send(data);
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
