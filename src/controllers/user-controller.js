const userService = require("../services/user-mongodb.js");
const jwt = require("../helpers/jwt.js");

exports.register = (req, res) => {
  userService
    .register(req.body.username, req.body.password, req.body.role)
    .then(() => res.status(200).json({ success: true }))
    .catch((message) => res.status(500).send(message));
};
exports.login = (req, res) => {
  userService
    .authenticate(req.body.username, req.body.password)
    .then((payload) => jwt.createToken(payload))
    .then((data) => res.json(data))
    .catch((error) => res.status(500).send(error.message));
};

/*
exports.getBooks = (req, res) => {
  userService
    .getBooks(req.client, req.query)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).send(err.message));
};
exports.addBook = (req, res) => {
  userService
    .addBook(req.client, req.params.id)
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(500).send(err.message));
};
exports.removeBook = (req, res) => {
  userService
    .removeBook(req.client, req.params.id)
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(500).send(err.message));
};
*/
