const express = require("express");
const dbOperations = require("../controllers/dbOperations");
const auth = require("../middleware/auth");

const router = express.Router();

// get all
router.get("/all", async (req, res) => {
  try {
    let data = await dbOperations.getAll();
    res.send(data);
  } catch (e) {
    console.log(e.message);
  }
});

// filter by type
router.get("/:type", async (req, res) => {
  let type = req.params.type;
  console.log("filter function and type rec: " + type);
  try {
    let data = await dbOperations.filterByType(type);
    res.send(data);
    console.log(data);
  } catch (e) {
    console.log(e.message);
  }
});

// get single product
// router.get("/getall", async (req, res) => {
//   let data = await dbOperations.getAll();
//   res.send(data);
//   console.log(data);
// });

module.exports = router;
