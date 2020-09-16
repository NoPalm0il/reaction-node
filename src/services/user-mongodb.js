const db = require("../configs/mongodb").getDB();
const cipher = require("../helpers/cipher");
const roles = require("../helpers/roles");
const ObjectId = require("mongodb").ObjectID;
const memeService = require("./meme-mongodb.js");

exports.register = (username, email, rawPassword, role) => {
  return new Promise((resolve, reject) => {
    try {
      db.collection("users")
        .findOne({ username: username, email: email })
        .then((found) => {
          if (!found) {
            //if (Object.values(roles).indexOf(role) > -1) {
            //if (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d$@$!%*#?&-.]{8,}$/.test(rawPassword)) {
            const dataIv = cipher.generateIv();
            const password = cipher.encrypt(rawPassword, dataIv);
            db.collection("users")
              .insertOne({
                username,
                email,
                password,
                role,
                dataIv,
                memes: [],
              })
              .then(() => resolve())
              .catch((error) => reject(error.message));
            //} else reject("invalid password");
            //} else reject("invalid role, input role = " + role);
          } else reject("username or email already in use");
        })
        .catch((error) => reject(error.message));
    } catch (error) {
      reject(error.message);
    }
  });
};

exports.authenticate = (username, rawPassword) => {
  return new Promise((resolve, reject) => {
    db.collection("users")
      .findOne({ username: username })
      .then((user) => {
        if (user) {
          const password = cipher.decrypt(user.password, user.dataIv);
          if (password == rawPassword)
            resolve({ _id: user._id, role: user.role });
        }
        reject(new Error("username and password don't match"));
      })
      .catch((error) => reject(error));
  });
};

exports.addUserMeme = (username, memeid) => {
  return new Promise((resolve, reject) => {
    db.collection("users")
      .updateOne({ username: username }, { $push: { memes: ObjectId(memeid) } })
      .then(() => resolve({ updated: 1 }))
      .catch((error) => {
        console.error(error.message);
        reject(error.message);
      });
  });
};

exports.removeUserMeme = (username, memeid) => {
  return new Promise((resolve, reject) => {
    db.collection("users")
      .updateOne({ username: username }, { $pull: { memes: ObjectId(memeid) } })
      .then(() => resolve({ updated: 1 }))
      .catch((error) => {
        console.error(error.message);
        reject(error.message);
      });
  });
};

exports.getUserMemes = (username) => {
  return new Promise((resolve, reject) => {
    db.collection("users")
      .findOne({ username: username })
      .then((user) => resolve(user.memes))
      .catch((error) => {
        console.error(error.message);
        reject(error.message);
      });
  });
};

exports.addUserLikedMeme = (username, memeid) => {
  return new Promise((resolve, reject) => {
    db.collection("users")
      .updateOne(
        { username: username },
        { $push: { liked_memes: ObjectId(memeid) } }
      )
      .then(() => resolve({ updated: 1 }))
      .catch((error) => {
        console.error(error.message);
        reject(error.message);
      });
  });
};

exports.removeUserLikedMeme = (username, memeid) => {
  return new Promise((resolve, reject) => {
    db.collection("users")
      .updateOne(
        { username: username },
        { $pull: { liked_memes: ObjectId(memeid) } }
      )
      .then(() => resolve({ removed: 1 }))
      .catch((error) => {
        console.error(error.message);
        reject(error.message);
      });
  });
};

// does the user likes that meme?
exports.isUserLikedMeme = (username, memeid) => {
  return new Promise((resolve, reject) => {
    db.collection("users")
      .findOne({ username: username })
      .then((user) => {
        try {
          if (!user.liked_memes[0]) resolve({ isLiked: false });
        } catch (exc) {
          resolve({ isLiked: false });
          console.error("no memes");
        } finally {
          user.liked_memes.forEach((element) => {
            if (element == memeid) resolve({ isLiked: true });
          });
          resolve({ isLiked: false });
        }
      })
      .catch((error) => reject(error.message));
  });
};

exports.getLikedMemes = (username) => {
  return new Promise((resolve, reject) => {
    db.collection("users")
      .findOne({ username: username })
      .then((user) => {
        resolve(user.liked_memes)
      })
      .catch((err) => reject(err.message))
  })
}
