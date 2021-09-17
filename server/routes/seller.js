const express = require("express");
const dbOperations = require("../controllers/dbOperations");

const router = express.Router();

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  let data = await dbOperations.getSeller(id);
  res.send(data);
});

module.exports = router;
