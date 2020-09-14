const userService = require("../services/user-mongodb.js");
const jwt = require("../helpers/jwt.js");

exports.register = (req, res) => {
  userService
    .register(req.body.username, req.body.email, req.body.password, req.body.role)
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

exports.getUserMemes = (req, res) => {
  userService
    .getUserMemes(req.params.username)
    .then((data) => res.json(data))
    .catch((error) => res.status(500).send(error.message + " get user memes " + req.params.username));
}

exports.addUserLikedMeme = (req, res) => {
  userService
    .addUserLikedMeme(req.body.username, req.params.id)
    .then((data) => res.json(data))
    .catch((error) => res.status(500).send(error.message));
}

exports.removeUserLikedMeme = (req, res) => {
  userService
    .removeUserLikedMeme(req.body.username, req.params.id)
    .then((data) => res.json(data))
    .catch((error) => res.status(500).send(error.message));
}

exports.isUserLikedMeme = (req, res) => {
  userService
    .isUserLikedMeme(req.body.username, req.params.id)
    .then((data) => res.json(data))
    .catch((error) => res.status(500).send(error.message));
}
