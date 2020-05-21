var express = require("express");
const router = express();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const {
  registerValidation,
  loginValidation,
} = require("../src/validation/validation");

router.post("/register", async (req, res, next) => {
  // Register validation
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Email validation
  const emailExist = await User.findOne({ email: req.body.email });
  console.log(req.body.email);
  if (emailExist) return res.status(400).send("Email already exists");

  //Hash password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(req.body.password,salt);

  // Create the object
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  // Exec
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res, next) => {

  // Email validation
  const user = await User.findOne({ email: req.body.email });
  console.log(req.body.email);
  if (!user) return res.status(400).send("Email or password doesn't exists");

  // Check if password is correct 
  const validPass = await bcrypt.compare(req.body.password,user.password);
  if(!validPass) return res.status(400).send('Invalid Password ')


  // Create a token 
  const token = jwt.sign({id:user._id,user:{username:user.username,date_connected:Date.now}},process.env.TOKEN_SECRET)
  res.header('auth-token',token).send(token);

  
});

module.exports = router;
