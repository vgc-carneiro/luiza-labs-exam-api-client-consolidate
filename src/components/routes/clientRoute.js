const express = require('express');
const router = express.Router();
const log = require('log4js').getLogger('clientRoute');
const controller = require('../controller/clientController');
const authService = require('../service/authService');

router.post('/', authService.authenticationMiddleware(), function(req, res) {
	log.info('/', req.body);
	log.info('/', req.headers.token);
	controller.addClient(req.body.name, req.body.email).then((result) => {
		res.status(200).send(result);
	}).catch((e) => {
		res.status(e.status).send(e.data);
	});
});

router.patch('/', authService.authenticationMiddleware(), function(req, res) {
	log.info('/', req.body);
	log.info('/', req.headers.token);
	controller.updateClient(req.body.name, req.body.email).then((result) => {
		res.status(200).send(result);
	}).catch((e) => {
		res.status(e.status).send(e.data);
	});
});

module.exports = router;