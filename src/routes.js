const express = require('express');
const EmailController = require('./controllers/EmailController');
const InformationController = require('./controllers/InformationController');
const routes = express.Router();

routes.post('/sendEmail', EmailController.sendMail);

routes.get('/information', InformationController.getInformation);

routes.get('/information/:id', InformationController.getInformationWithID );



// routes.get('/information', )

module.exports = routes;