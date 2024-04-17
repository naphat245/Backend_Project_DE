const adminRoute = require('express').Router()
const Nodecontroller = require('../controllers/Nodecontroller ')
const Dashboardcontroller  = require('../controllers/Dashboardcontroller')


//node
adminRoute.post('/node',Nodecontroller.createNode)
adminRoute.put('/node/:id',Nodecontroller.updateNode)
adminRoute.delete('/node/:id',Nodecontroller.deleteNode)
adminRoute.get('/node/:id',Nodecontroller.getByIdNode)
adminRoute.get('/node',Nodecontroller.getByIdNode)
//adminRoute.get('/drinks/type/:name', DrinkController.getNodeByName);


//dashboard



module.exports = adminRoute