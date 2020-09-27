const express = require('express');
const EmailController = require('./controllers/EmailController');
const UserController = require('./controllers/UserController');
const routes = express.Router();

routes.post('/email', EmailController.sendMail);

routes.get('/users', UserController.getUser);

routes.get('/users/:id', UserController.getUserWithID );

routes.post('/users/', UserController.insertUser);

routes.put('/users/:id', UserController.updateUser);

routes.delete('/users/:id', UserController.deleteUser);

module.exports = routes;