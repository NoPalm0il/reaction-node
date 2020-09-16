const userController = require("../controllers/user-controller");
const router = require("express").Router();
const authorize = require("../configs/authorization");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/getMemes/:username", authorize(), userController.getUserMemes);
router.put("/addLike/:id", authorize(), userController.addUserLikedMeme);
router.put("/removeLike/:id", authorize(), userController.removeUserLikedMeme);
router.post("/memeLiked/:id", authorize(), userController.isUserLikedMeme);
router.get("/getLikedMemes/:username", authorize(), userController.getLikedMemes);

module.exports = router;
