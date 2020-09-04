const db = require("../configs/mongodb.js").getDB();
const storage = require("../configs/minio.js");
const ObjectId = require("mongodb").ObjectID;

exports.getQueryMemes = (queryString) => {
  return new Promise((resolve, reject) => {
    let filter = {};
    if (queryString.search) {
      filter.title = { $regex: new RegExp(queryString.search, "i") };
    }
    db.collection("memes")
      .find({author: queryString.search})
      //.project({ title: 1, author: 1 })
      .toArray()
      .then((memes) => {resolve(memes);
      console.log(queryString.search + "  " + filter)})
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
            votes: body.votes,
          },
        }
      )
      .then(() => resolve({ updated: 1 }))
      .catch((err) => reject(err));
  });
};

exports.updateMemage = (id, file) => {
  return new Promise((resolve, reject) => {
    let url = "";
    db.collection("memes")
      .findOne({ _id: ObjectId(id) })
      .then((meme) => {
        let promises = [storage.uploadFile(file.path, file.type)];
        if (meme.memage) {
          const aux = meme.memage.split("?")[0].split("/");
          promises.push(storage.removeFile(aux[aux.length - 1]));
        }
        return Promise.all(promises);
      })
      .then(([presignedUrl, deleted]) => {
        url = presignedUrl;
        return db.collection("memes").updateOne({ _id: ObjectId(id) }, { $set: { memage: presignedUrl } });
      })
      .then(() => {
        resolve({ updated: 1, url });
      })
      .catch((err) => reject(err));
  });
};

exports.removeMeme = (id) => {
  return new Promise((resolve, reject) => {
    db.collection("memes")
      .deleteOne({ _id: ObjectId(id) })
      .then(() => resolve({ removed: 1 }))
      .catch((err) => reject(err));
  });
};
