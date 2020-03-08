describe('clientController', () => {

	const controller = require('../../src/components/controller/clientController');
	const mongoService = require('../../src/components/service/mongoService');

	beforeEach(() => {
		client = {
			_id: 		'5e6452ff94fd2082e8b8b6a5',
			name: 		'Vinicius',
			email: 		'vinicius@email.com',
			active:		true,
			updatedAt: '2020-03-08T02:05:51.997Z',
			createdAt: '2020-03-08T02:05:51.997Z',
			__v:		0
		}
    });

    describe("insert client", function() {
		it('insert client without email', async  () => {
			await controller.addClient(null, null).then((result) => {
				fail('Promise should not resolve', result);
			}).catch((e) => {
				expect(e).toEqual({status: 400, data: {message: 'Falta de parâmetros.'}});
			});
		});
        it('insert correct client', async  () => {
			spyOn(mongoService, 'getClient').and.returnValue(Promise.resolve());
			spyOn(mongoService, 'insertClient').and.returnValue(Promise.resolve(client));
			await controller.addClient('Vinicius', 'vinicius@email.com').then((result) => {
				expect(result).toEqual(client);
			}).catch((e) => {
				fail('Promise should not reject', e);
			});
		});
        it('insert repeated client', async  () => {
			spyOn(mongoService, 'getClient').and.returnValue(Promise.resolve({client: 'Vinicius'}));
			await controller.addClient('Vinicius', 'vinicius@email.com').then((result) => {
				fail('Promise should not resolve', result);
			}).catch((e) => {
				expect(e).toEqual({status: 400, data: {message: 'Cliente já cadastrado!'}});
			});
		});
        it('insert client but error on MongoDB', async  () => {
			spyOn(mongoService, 'getClient').and.returnValue(Promise.resolve());
			spyOn(mongoService, 'insertClient').and.returnValue(Promise.reject({message: 'Error on mongo'}));
			await controller.addClient('Vinicius', 'vinicius@email.com').then((result) => {
				fail('Promise should not resolve', result);
			}).catch((e) => {
				expect(e).toEqual({status: 400, data: {message: 'Error on mongo'}});
			});
		});
	});

    describe("update client", function() {
		it('update client without email', async  () => {
			await controller.updateClient(null, null, null).then((result) => {
				fail('Promise should not resolve', result);
			}).catch((e) => {
				expect(e).toEqual({status: 400, data: {message: 'Falta de parâmetros.'}});
			});
		});
        it('update client not exists', async  () => {
			spyOn(mongoService, 'getClient').and.returnValue(Promise.resolve());
			await controller.updateClient(null, 'vinicius@email.com', true).then((result) => {
				fail('Promise should not resolve', result);
			}).catch((e) => {
				expect(e).toEqual({status: 404, data: {message: 'Cliente não localizado.'}});
			});
		});
        it('update client', async  () => {
			spyOn(mongoService, 'getClient').and.returnValue(Promise.resolve({_id: '5e6452ff94fd2082e8b8b6a5'}));
			spyOn(mongoService, 'updateClient').and.returnValue(Promise.resolve(client));
			await controller.updateClient('Vinicius', 'vinicius@email.com', true).then((result) => {
				expect(result).toEqual(client);
			}).catch((e) => {
				fail('Promise should not reject', e);
			});
		});
        it('update client but error on mongo', async  () => {
			spyOn(mongoService, 'getClient').and.returnValue(Promise.resolve({_id: '5e6452ff94fd2082e8b8b6a5'}));
			spyOn(mongoService, 'updateClient').and.returnValue(Promise.reject({message: 'Error on mongo'}));
			await controller.updateClient('Vinicius', 'vinicius@email.com', true).then((result) => {
				fail('Promise should not resolve', result);
			}).catch((e) => {
				expect(e).toEqual({status: 400, data: {message: 'Error on mongo'}});
			});
		});
	});

});