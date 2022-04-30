const { register, login, setAvatar, getAllUsers, deleteUser } = require("../controllers/usersController")

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
router.get("/allusers/:id", getAllUsers);
router.delete("/deleteUser/:id", deleteUser);


module.exports = router;