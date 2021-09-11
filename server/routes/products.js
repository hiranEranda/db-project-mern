const express = require("express");
const dbOperations = require("../controllers/dbOperations");

const router = express.Router();

// get all
router.get("/all", async (req, res) => {
  let data = await dbOperations.getAll();
  res.send(data[0]);
});

// filter by type
router.get("/:type", async (req, res) => {
  let type = req.params.type;
  let data = await dbOperations.filterByType(type);
  res.send(data[0]);
});

// get single product
// router.get("/getall", async (req, res) => {
//   let data = await dbOperations.getAll();
//   res.send(data);
//   console.log(data);
// });

module.exports = router;
