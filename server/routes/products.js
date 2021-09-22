const express = require("express");
const dbOperations = require("../controllers/dbOperations");

const router = express.Router();

// @route   GET api/products/all
// @desc    Get all products
// @access  public
router.get("/all", async (req, res) => {
  try {
    let data = await dbOperations.getAll();
    data.map((item) => {
      item.mrp_date = item.mrp_date.toISOString().split("T")[0];
      return item;
    });
    res.send(data);
  } catch (e) {
    console.log(e.message);
  }
});

// @route   GET api/products/:type
// @desc    Filter products by type
// @access  public
router.get("/:type", async (req, res) => {
  let type = req.params.type;
  console.log("filter function and type rec: " + type);
  try {
    let data = await dbOperations.filterByType(type);
    data.map((item) => {
      item.mrp_date = item.mrp_date.toISOString().split("T")[0];
      return item;
    });
    res.send(data);
  } catch (e) {
    console.log(e.message);
  }
});

// @route   GET api/products/:type
// @desc    Get a singal product
// @access  public
// router.get("/getall", async (req, res) => {
//   let data = await dbOperations.getAll();
//   res.send(data);
//   console.log(data);
// });

module.exports = router;
