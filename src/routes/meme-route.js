const memeController = require("../controllers/meme-controller");
const router = require("express").Router();
const authorize = require("../configs/authorization");

router.get("/:id", authorize(), memeController.getMeme);
router.post("", authorize(), memeController.insertMeme);
router.put("/data/:id", authorize(), memeController.updateMeme);
router.delete("/:id", authorize(), memeController.removeMeme);

module.exports = router;