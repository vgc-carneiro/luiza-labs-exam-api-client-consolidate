const mongoService = require('../service/mongoService');

function addClient(name, email){
	return new Promise((resolve, reject) => {
		if(!email || !name){
			reject({status: 400, data: {message: 'Falta de parâmetros.'}});
		}else{
			mongoService.getClient(email).then((result) => {
				if(result){
					reject({status: 400, data: {message: 'Cliente já cadastrado!'}});
				}else{
					return mongoService.insertClient(name, email);
				}
			}).then((result) => {
				resolve(result);
			}).catch((e) => {
				reject({status: 400, data: {message: e.message}});
			});
		}
	});
}

function updateClient(name, email, active){
	return new Promise((resolve, reject) => {
		if(!email){
			reject({status: 400, data: {message: 'Falta de parâmetros.'}});
		}else{
			mongoService.getClient(email).then((result) => {
				if(!result){
					reject({status: 404, data: {message: 'Cliente não localizado.'}});
				}else{
					let data = {
						email: email,
						active: active,
						lastUpdated: new Date()
					};
					if(name){
						data.name = name;
					}
					return mongoService.updateClient(result._id, data);
				}
			}).then((result) => {
				resolve(result);
			}).catch((e) => {
				reject({status: 400, data: {message: e.message}});
			});
		}
	});
}

module.exports = {addClient, updateClient};