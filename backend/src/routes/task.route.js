const router = require("express").Router();
const taskController = require("../controllers/task.controller");
const auth = require("../middlewares/auth.middleware");

router.get("/", auth, taskController.getTasks);
router.post("/", auth, taskController.createTask);
router.delete("/:id", auth, taskController.deleteTask);

module.exports = router;
