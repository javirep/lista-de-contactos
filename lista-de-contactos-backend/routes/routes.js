const express = require("express");
const router = express.Router();
const CryptoJS = require("crypto-js");
const User = require("../models/User");
const contacts = require("../contacts");

/* POST route for Users Log in */
router.post('/login', async function (req, res, next) {
  const { email, password } = req.body;
  console.log("email: " + email)
  console.log("password: " + password)
  try {
    const user = await User.findOne({ email })
    if (!user) {
      res.status(401).json({ "errorMessage": "This user doesn´t exist" })
    }

    decryptedPassword = CryptoJS.AES.encrypt(user.password, "my secret code");
    console.log("encryptedPassword: " + decryptedPassword)

    if (decryptedPassword === password) {
      req.session.currentUser = user;
      res.status(200).json({ user })
      console.log(user)
    }
    else {
      console.log(user)
      res.status(401).json({ "errorMessage": "Incorrect password" })
    }
  }
  catch (error) {
    res.status(500).json({ "errorMessage": "There is an internal error, please try again in a few minutes." })
  }
});

/* */
router.post("/signup", async function (req, res, next) {
  const { email, password } = req.body;
  encryptedPassword = CryptoJS.AES.encrypt(password, "my secret code");
  try {
    newUser = await User.create({ email, "password": encryptedPassword })
    res.status(200).json(newUser)
  }
  catch (error) {
    console.log(error)
    res.status(500).json({ "errorMessage": "There is an internal error, please try again in a few minutes." })
  }
})

/* GET contacts */
router.get("/contacts", function (req, res, next) {
  res.status(200).json(contacts)
})



module.exports = router;
