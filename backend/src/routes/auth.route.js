const router = require("express").Router();
const authController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/me", authMiddleware, authController.getProfile);
router.put("/me", authMiddleware, authController.updateProfile);

module.exports = router;