const authRoute = require('express').Router()
const authController =require('../controllers/AuthControllers')

const express = require("express");
const router = express.Router();
const {
  register,
  login,
  users,
  subAdmins,
  getUserDropdown
} = require("../controllers/userController");

// Route for user registration
router.post("/register", register);

// Route for user login
router.post("/login", login);

// Route to get all users
router.get("/users", users).name("getUsers");

// Route to get all sub-admins
router.get("/subadmins", subAdmins).name("getSubAdmins");

// Route to render user dropdown
router.get("/dropdown", getUserDropdown).name("getUserDropdown");

module.exports = authRoute;