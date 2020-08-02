const memeController = require("../controllers/meme-controller");
const router = require("express").Router();
const authorize = require("../configs/authorization");

router.get("/:id", authorize(), memeController.getMeme);
router.get("/data/qry", authorize(), memeController.getQueryMemes);
router.get("/data/list", memeController.getMemes);
router.post("", authorize(), memeController.insertMeme);
router.put("/data/:id", authorize(), memeController.updateMeme);
router.delete("/data/:id", authorize(), memeController.removeMeme);

module.exports = router;
