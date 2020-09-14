const userController = require("../controllers/user-controller");
const router = require("express").Router();
const authorize = require("../configs/authorization");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/getMemes/:username", authorize(), userController.getUserMemes);
router.put("/addLike/:id", authorize(), userController.addUserLikedMeme);
router.put("/removeLike/:id", authorize(), userController.removeUserLikedMeme);
router.post("/memeLiked/:id", userController.isUserLikedMeme);

/*
router.get("/book", authorize(), userController.getBooks);
router.post("/book/:id", authorize(), userController.addBook);
router.delete("/book/:id", authorize(), userController.removeBook);
*/
module.exports = router;
