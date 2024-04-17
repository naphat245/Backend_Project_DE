const authRoute = require('express').Router()
const authController =require('../controllers/AuthControllers')

authRoute.post('/register',authController.register)
authRoute.get('/users',authController.users)
authRoute.post('/login',authController.login)


module.exports = authRoute