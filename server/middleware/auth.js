const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function auth(req, res, next) {
  const token = req.header("authToken");
  if (!token)
    res.status(401).json({ error: "Access denied. No token provided" });
  else {
    try {
      const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
      req.client = decoded;
      next();
    } catch (e) {
      res.status(400).json({ error: "Invalid token" });
    }
  }
};
