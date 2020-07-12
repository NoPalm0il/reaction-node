const memeService = require("../services/meme-mongodb.js");
const formidable = require("formidable");

exports.getMemes = (req, res) => {
  memeService
    .getMemes(req.query)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).send(err.message));
};
exports.insertMeme = (req, res) => {
  memeService
    .insertMeme(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).send(err.message));
};
exports.updateMeme = (req, res) => {
  memeService
    .updateMeme(req.params.id, req.body)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).send(err.message));
};

/*
exports.updateBookCover = (req, res) => {
  formidable().parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      bookService
        .updateBookCover(req.params.id, files.cover)
        .then((result) => res.json(result))
        .catch((err) => res.status(500).send(err.message));
    }
  });
};
*/

exports.removeMeme = (req, res) => {
  memeService
    .removeMeme(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).send(err.message));
};