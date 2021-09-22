const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const Joi = require("joi");
const dbOperations = require("../controllers/dbOperations");
const auth = require("../middleware/auth");

const router = express.Router();

// @route   POST api/auth/login
// @desc    Client login
// @access  public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await dbOperations.getClient(email);
    if (user.length === 0) return res.json({ error: "User not found" });
    else {
      bcrypt.compare(password, user[0].password).then((match) => {
        if (!match) return res.json({ error: "Wrong password" });
        else {
          jwt.sign(
            { id: user[0].consumer_id, username: user[0].uFname },
            config.get("jwtPrivateKey"),
            (err, token) => {
              if (err) return console.log(err.message);
              res.json({
                token,
                username: user[0].uFname + " " + user[0].uLname,
                id: user[0].consumer_id,
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

// @route   POST api/auth/reg
// @desc    Client register
// @access  public
router.post("/reg", async (req, res) => {
  console.log("register server called");
  try {
    const schema = Joi.object({
      nic: Joi.string().min(3).required(),
      fname: Joi.string().min(3).required(),
      lname: Joi.string().min(3).required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
      address: Joi.string().min(3).required(),
      phone: Joi.string().min(3).required(),
    });
    try {
      console.log("second try block");
      const value = await schema.validateAsync(req.body);
      let { password, email } = value;

      try {
        const user = await dbOperations.getClient(email);
        if (user.length === 1) res.send("email already exists");
        else {
          const client = {
            ...value,
            password: await bcrypt.hash(password, 10),
          };
          const reg = await dbOperations.regClient(client);
          const newUser = await dbOperations.getClient(email);
          jwt.sign(
            { id: newUser[0].consumer_id, username: newUser[0].uFname },
            config.get("jwtPrivateKey"),
            (err, token) => {
              if (err) return console.log(err.message);
              res.json({
                token,
                username: user[0].uFname + " " + user[0].uLname,
                id: user[0].consumer_id,
              });
            }
          );
        }
      } catch (err) {
        res.send("Registering to database " + err.message);
      }
    } catch (err) {
      res.send("Schema validation " + err.message);
    }
  } catch (err) {
    res.send("Schema " + err.message);
  }
});

// @route   GET api/auth/login
// @desc    Verify auth token
// @access  ptivate
router.get("/", auth, (req, res) => {
  try {
    res.json(req.client);
  } catch (e) {
    res.send("token auth " + e.message);
  }
});

module.exports = router;
