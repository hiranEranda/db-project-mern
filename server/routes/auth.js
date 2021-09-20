const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const Joi = require("joi");
const dbOperations = require("../controllers/dbOperations");
const auth = require("../middleware/auth");

const router = express.Router();

// log in
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
                username: user[0].uFname,
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

// register
router.post("/reg", async (req, res) => {
  const schema = Joi.object({
    fname: Joi.string().min(3).required(),
    lname: Joi.string().min(3).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });

  try {
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
            res.json({ token, msg: "user registered" });
          }
        );
      }
    } catch (e) {
      console.log(e);
    }
  } catch (err) {
    res.send(err.message);
  }
});

router.get("/", auth, (req, res) => {
  res.json(req.client);
});

module.exports = router;
