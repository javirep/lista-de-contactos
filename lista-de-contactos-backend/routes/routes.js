const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { verifiedByToken } = require("../middlewares/middlewares");
const rawContacts = require("../contacts.json")


/*
  POST route for Users Log in

  if the login is unvalid it provides an errorMessage that can be displayed in the frontEnd
  if the login is valid it provides an authorized token

*/
router.post('/login', async function (req, res, next) {

  const { email, password, rememberMe } = req.body;

  try {
    const user = await User.findOne({ email })
    if (!user) {
      res.json({ "errorMessage": "This user doesn´t exist" })
    }
    else if (bcrypt.compareSync(password, user.password)) {
      let expirationDate = Date.now()

      if(!rememberMe){
        expirationDate += 1000*60*60 // +1h
      }
      else{
        expirationDate += 1000*60*60*48 // 2days
      }

      jwt.sign({ user, expirationDate }, "secretKey", (err, token) => {
        res.status(200).json({
          token,
          isLoggedIn: true
        })
      })
    }

    else {
      res.json({ "errorMessage": "Incorrect password" })
    }
  }
  catch (error) {
    console.log("error while login in: " + error)
    res.status(500).json({ "errorMessage": "There is an internal error, please try again in a few minutes." })
  }
});

/* */
router.post("/signup", async function (req, res, next) {
  const { email, password } = req.body;

  try {
    const salt = bcrypt.genSaltSync(saltRounds)
    const encryptedPassword = bcrypt.hashSync(password, salt)
    const newUser = await User.create({ email, "password": encryptedPassword })
    res.status(200).json(newUser)
  }

  catch (error) {
    res.status(500).json({ "errorMessage": "There is an internal error, please try again in a few minutes." })
  }
})
/* GET verifyAuth */
router.get("/verifyAuth", verifiedByToken(), async function(req, res, next) {
  res.status(200).json({
    isLoggedIn: true
  })
})

/* GET contacts */
router.get("/contacts", verifiedByToken(), async function (req, res, next) {
  let contacts = new Array();

  rawContacts.forEach( contact => {
    if(contacts[contact.id]){
      console.log("There are different contacts with the same ID")
    }
    else{
      contacts[contact.id] = contact;
    }

  })

  res.status(200).json({
    isLoggedIn: true,
    contacts
  })
})

module.exports = router;
