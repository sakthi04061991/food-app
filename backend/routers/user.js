const express = require("express");
const {userSignUp, userLogin, getUser} = require('../controllers/user');
const router = express.Router();

router.post("/SignUp",userSignUp);
router.post("/login",userLogin)
router.get("/user/:id",getUser);

module.exports = router;