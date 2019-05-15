const fs = require('fs');
const router = require('express').Router();

module.exports = {

	name: 'backgrounWorker',
	settings: {
		transporter: 'TCO',
	},

	 methods: {

	async	backgroundWork(req, res){

		res.send('Success');

		return new Promise((resolve, reject) => {

			
				for(let i = 0; i < 100000000000000000; i++){

				}
	
				fs.mkdirSync('./success');
	
				
				resolve(true);
			});
		}

	},

	created(){

		router.get('/work', this.backgroundWork);

	},

	async started(){

		// We must wait for www servie to be up to assign new route to it
		await this.broker.waitForServices(['www']);
		this.broker.call('www.reloadRouter', {router: router});
		console.log('Work router configured');

	}

}