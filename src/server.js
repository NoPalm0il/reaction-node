require("dotenv").config();

const db = require("./configs/mongodb.js");

Promise.all([db.connectDB()])
  .then(() => {
    console.log(
      `\x1b[32m(PLAIN) Successfuly connected to database and object storage servers\x1b[0m`
    );

    const path = require("path");

    const express = require("express");
    const bodyParser = require("body-parser");
    const cors = require("cors");

    const app = express();

    app.use(bodyParser.json());
    app.use(cors());

    app.use("/meme", require("./routes/meme-route.js"));
    app.use("/user", require("./routes/user-route.js"));

    app.use("/", express.static(path.join(__dirname, "..", "react")));

    const port = process.env.PORT || 5000;

    app.listen(port, () => {
      console.log(`\x1b[32m(PLAIN) Server listening on port ${port}\x1b[0m`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit();
  });
