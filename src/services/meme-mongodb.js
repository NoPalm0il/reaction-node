const db = require("../configs/mongodb.js").getDB();
const storage = require("../configs/minio.js");
const ObjectId = require("mongodb").ObjectID;
const userService = require("./user-mongodb.js");

exports.getQueryMemes = (queryString) => {
  return new Promise((resolve, reject) => {
    let filter = {};
    if (queryString.search) {
      filter.title = { $regex: new RegExp(queryString.search, "i") };
    }
    db.collection("memes")
      .find({ author: queryString.search })
      .toArray()
      .then((memes) => {
        resolve(memes);
        console.log(queryString.search + "  " + filter);
      })
      .catch((err) => reject(err));
  });
};

exports.getCategoryMemes = (category) => {
  return new Promise((resolve, reject) => {
      db.collection("memes")
      .find({ category: category })
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

exports.getMemesArr = (ids) => {
  return new Promise((resolve, reject) => {
    let objids = [];

    ids.forEach(element => {
      objids.push(ObjectId(element))
    });

    db.collection("memes")
      .find({_id: { $in : objids}})
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
        votes: body.votes,
      })
      .then((res) => {
        userService.addUserMeme(body.author, res.insertedId);
        resolve({ inserted: 1, _id: res.insertedId });
      })
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

exports.incMemeVotes = (id, body) => {
  return new Promise((resolve, reject) => {
    db.collection("memes")
      .updateOne({ _id: ObjectId(id) }, { $inc : { votes: 1 }, $push : { whoLiked: body.username} })
      .then(() => {
        userService.addUserLikedMeme(body.username, id);
        resolve({ updated: 1 })})
      .catch((err) => reject(err));
  });
};

exports.decMemeVotes = (id, body) => {
  return new Promise((resolve, reject) => {
    db.collection("memes")
      .updateOne({ _id: ObjectId(id) }, { $inc: { votes: -1 }, $pull : { whoLiked: body.username} })
      .then(() => {
        userService.removeUserLikedMeme(body.username, id);
        resolve({ updated: 1 })})
      .catch((err) => reject(err));
  });
};

exports.getMemeVotes = (id) => {
  return new Promise((resolve, reject) => {
    db.collection("memes")
      .findOne({ _id: ObjectId(id) })
      .then((meme) => resolve(meme.votes))
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
        return db
          .collection("memes")
          .updateOne({ _id: ObjectId(id) }, { $set: { memage: presignedUrl } });
      })
      .then(() => {
        resolve({ updated: 1, url });
      })
      .catch((err) => reject(err));
  });
};

//TODO: remove minio object, remove presign url returns object name, remove the like id on all users who liked the deleted meme
exports.removeMeme = (id) => {
  return new Promise((resolve, reject) => {
    db.collection("memes")
      .deleteOne({ _id: ObjectId(id) })
      .then(() => resolve({ removed: 1 }))
      .catch((err) => reject(err));
  });
};
