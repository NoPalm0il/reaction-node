const memes = require ('./memes.json');

exports.getBooks = () => {
  return new Promise ((resolve, reject) => {
    resolve (
      memes.map (meme => ({
        _id: meme._id,
        title: meme.title,
        author: meme.author,
      }))
    );
  });
};
exports.getMeme = id => {
  return new Promise ((resolve, reject) => {
    resolve (memes.find (meme => meme._id == id));
  });
};
exports.insertMeme = body => {
  return new Promise ((resolve, reject) => {
    resolve ({inserted: 1});
  });
};
exports.updateMeme = (id, body) => {
  return new Promise ((resolve, reject) => {
    resolve ({updated: 1});
  });
};
exports.removeMeme = id => {
  return new Promise ((resolve, reject) => {
    resolve ({removed: 1});
  });
};