const jwt = require("jsonwebtoken");

const JWT_SECRET = "shamanth019";
const fetchuser = (req, res, next) => {
  // Get the user from the JWT token and append the id to the request
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ error: "Please authenticate with a valid token" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Please authenticate with a valid token" });
  }
};

module.exports = fetchuser;
