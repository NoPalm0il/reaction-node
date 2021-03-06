const memeService = require("../services/meme-mongodb.js");
const formidable = require("formidable");

exports.getQueryMemes = (req, res) => {
  memeService
    .getQueryMemes(req.query)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).send(err.message));
};

exports.getCategoryMemes = (req, res) => {
  memeService
  .getCategoryMemes(req.params.category)
  .then((result) => res.json(result))
  .catch((err) => res.status(500).send(err.message));
};

exports.getMemes = (req, res) => {
  memeService
    .getMemes()
    .then((result) => res.json(result))
    .catch((err) => res.status(500).send(err.message));
};

exports.getMemesArr = (req, res) => {
  memeService
    .getMemesArr(req.body.memes)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).send(err.message));
};

exports.getMeme = (req, res) => {
  memeService
    .getMeme(req.params.id)
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

exports.incMemeVotes = (req, res) => {
  memeService
    .incMemeVotes(req.params.id, req.body)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).send(err.message));
};

exports.decMemeVotes = (req, res) => {
  memeService
    .decMemeVotes(req.params.id, req.body)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).send(err.message));
};

exports.getMemeVotes = (req, res) => {
  memeService
    .getMemeVotes(req.params.id, req.body)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).send(err.message));
};

exports.updateMemage = (req, res) => {
  formidable().parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      memeService
        .updateMemage(req.params.id, files.memage)
        .then((result) => res.json(result))
        .catch((err) => res.status(500).send(err.message));
    }
  });
};

exports.removeMeme = (req, res) => {
  memeService
    .removeMeme(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).send(err.message));
};

exports.addComment = (req, res) => {
  memeService
    .addComment(req.params.id, req.body.author, req.body.comment)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).send(err.message));
};
