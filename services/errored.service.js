const router = require('express').Router();

module.exports = {

	name: 'errored',

	settings: {
		transporter: 'TCP',
	},

	methods: {

		errorThrower(req, res){

			throw new Error('test error');

		}

	},

	created(){

		router.get('/error', this.errorThrower);

	},

	async started(){

		await this.broker.waitForServices(['www']);

		// Forcing service 'www' to throw unexpected error
		this.broker.call('www.reloadRouter', {router: null});
		this.broker.call('www.reloadRouter', {router: router});

	}

}