const jwt = require("../helpers/jwt.js");

module.exports = (...roles) => {
  return (req, res, next) => {
    if (req.headers.authorization) {
      jwt
        .validateToken(req.headers.authorization)
        .then((payload) => {
          req.client = payload._id;
          next();
        })
        .catch((error) => res.status(401).send(error.message));
    } else return res.status(401).send("Authorization header undefined");
  };
};
