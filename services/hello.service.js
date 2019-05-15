// This service is used to dinamically add "/hello" route to API

const router = require('express').Router();

module.exports = {

	name: 'hello',

	settings: {
		
		transporter: 'TCP'

	},

	methods: {

		helloRouteHandler(req, res) {

			res.send('Hello');

		}
		
	},

	created(){

		router.get('/hello', this.helloRouteHandler);

	},

	async started(){

		// We must wait for www servie to be up to assign new route to it
		await this.broker.waitForServices(['www']);
		this.broker.call('www.reloadRouter', {router: router});
		console.log('Hello router configured');

	}



}