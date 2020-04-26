var express = require("express");
var router = express.Router();
const AuthenticationController = require("../controllers/AuthenticationController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json({ route: "authentication" });
});

router.get("/users", AuthenticationController.getAll);

router.post("/register", AuthenticationController.register);
router.post("/recover-password", AuthenticationController.recoverPassword);
router.post("/login", AuthenticationController.login);

module.exports = router;
