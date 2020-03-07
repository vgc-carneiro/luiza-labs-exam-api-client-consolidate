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
			Client.findOne({email: email}).then((result) => {
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
			updatedAt: new Date(),
			createdAt: new Date()
		}).then((result) => {
			resolve(result);
		}, (error) => {
			reject(error);
		});
	});
}

function updateClient(id, name, email){
	return new Promise((resolve, reject) => {
		Client.findOneAndUpdate({ _id: id}, {
			name: name,
			email: email,
			updatedAt: new Date()
		}, (err, doc) => {
			if(err){
				log.error('updateClient:', err);
				reject(err);
			}else{
				log.info('Client updated: ', doc);
				resolve({
					_id: id,
					name: name,
					email: email
				});
			}
		});
	});
}

module.exports = {insertClient, getClient, updateClient};