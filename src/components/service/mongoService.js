const mongodb = require('../../config/mongodb');
const Client = require('../model/Client');
const log = require('log4js').getLogger('mongoService');

async function tryConnectToMongo() {
	if(mongodb.checkState() !== 1) {
		await mongodb.connection();
	}
}

function getClient(email){
	return new Promise((resolve, reject) => {
		tryConnectToMongo().then(() => {
			Client.findOne({email: email, active: true}).then((result) => {
				resolve(result);
			}, (error) => {
				log.error('getClient:', error);
				reject(error);
			});
		});
	});
}

function insertClient(name, email){
	return new Promise((resolve, reject) => {
		Client.create({
			name: name,
			email: email,
			active: true,
			updatedAt: new Date(),
			createdAt: new Date()
		}).then((result) => {
			resolve(result);
		}, (error) => {
			reject(error);
		});
	});
}

function updateClient(id, data){
	return new Promise((resolve, reject) => {
		Client.findOneAndUpdate({ _id: id, active: true}, data, (err, doc) => {
			if(err){
				log.error('updateClient:', err);
				reject(err);
			}else{
				log.info('Client updated: ', doc);
				resolve(data);
			}
		});
	});
}

module.exports = {insertClient, getClient, updateClient};