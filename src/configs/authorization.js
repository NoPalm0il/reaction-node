const jwt = require("../helpers/jwt.js");

module.exports = (...roles) => {
  return (req, res, next) => {
    if (req.headers.authorization) {
      jwt
        .validateToken(req.headers.authorization)
        .then((payload) => {
          if (roles.length > 0 && !roles.some((r) => r == payload.role)) {
            res.status(401).send("Not allowed");
          } else {
            req.client = payload._id;
            next();
          }
        })
        .catch((error) => res.status(401).send(error.message));
    } else return res.status(401).send("Authorization header undefined");
  };
};
