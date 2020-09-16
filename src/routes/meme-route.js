const memeController = require("../controllers/meme-controller");
const router = require("express").Router();
const authorize = require("../configs/authorization");

router.get("/:id", authorize(), memeController.getMeme);
router.get("/cat/:category", memeController.getCategoryMemes);
router.get("/data/qry", authorize(), memeController.getQueryMemes);
router.get("/data/list", memeController.getMemes);
router.post("/data/array", authorize(), memeController.getMemesArr);
router.post("", authorize(), memeController.insertMeme);
router.put("/data/:id", authorize(), memeController.updateMeme);
router.post("/vote/inc/:id", authorize(), memeController.incMemeVotes);
router.post("/vote/dec/:id", authorize(), memeController.decMemeVotes);
router.get("/vote/get/:id", authorize(), memeController.getMemeVotes);
router.put("/memage/:id", authorize(), memeController.updateMemage);
router.delete("/data/:id", authorize(), memeController.removeMeme);
router.put("/comment/:id", authorize(), memeController.addComment);

module.exports = router;
