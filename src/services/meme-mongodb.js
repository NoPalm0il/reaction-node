const db = require("../configs/mongodb.js").getDB();
//const store = require("../configs/minio.js");
const ObjectId = require("mongodb").ObjectID;

exports.getQueryMemes = (queryString) => {
  return new Promise((resolve, reject) => {
    let filter = {};
    if (queryString.search) {
      filter.title = { $regex: new RegExp(queryString.search, "i") };
    }
    db.collection("memes")
      .find(filter)
      //.project({ title: 1, author: 1 })
      .toArray()
      .then((memes) => resolve(memes))
      .catch((err) => reject(err));
  });
};

exports.getMemes = () => {
  return new Promise((resolve, reject) => {
    db.collection("memes")
      .find()
      .toArray()
      .then((memes) => resolve(memes))
      .catch((err) => reject(err));
  });
};

exports.getMeme = (id) => {
  return new Promise((resolve, reject) => {
    db.collection("memes")
      .findOne({ _id: ObjectId(id) })
      .then((meme) => resolve(meme))
      .catch((err) => reject(err));
  });
};

exports.insertMeme = (body) => {
  return new Promise((resolve, reject) => {
    db.collection("memes")
      .insertOne({
        title: body.title,
        category: body.category,
        author: body.author,
        publish: body.publish,
        votes: body.votes
      })
      .then((res) => resolve({ inserted: 1, _id: res.insertedId }))
      .catch((err) => reject(err));
  });
};

exports.updateMeme = (id, body) => {
  return new Promise((resolve, reject) => {
    db.collection("memes")
      .updateOne(
        { _id: ObjectId(id) },
        {
          $set: {
            title: body.title,
            category: body.category,
            author: body.author,
            publish: body.publish,
          },
        }
      )
      .then(() => resolve({ updated: 1 }))
      .catch((err) => reject(err));
  });
};

/*
exports.updateBookCover = (id, file) => {
  return new Promise((resolve, reject) => {
    let url = "";
    db.collection("books")
      .findOne({ _id: ObjectId(id) })
      .then((book) => {
        let promises = [store.uploadFile(file.path, file.type)];
        if (book.cover) {
          const aux = book.cover.split("?")[0].split("/");
          promises.push(store.removeFile(aux[aux.length - 1]));
        }
        return Promise.all(promises);
      })
      .then(([presignedUrl, deleted]) => {
        url = presignedUrl;
        return db.collection("books").updateOne({ _id: ObjectId(id) }, { $set: { cover: presignedUrl } });
      })
      .then(() => {
        resolve({ updated: 1, url });
      })
      .catch((err) => reject(err));
  });
};
*/

exports.removeMeme = (id) => {
  return new Promise((resolve, reject) => {
    db.collection("memes")
      .deleteOne({ _id: ObjectId(id) })
      .then(() => resolve({ removed: 1 }))
      .catch((err) => reject(err));
  });
};
