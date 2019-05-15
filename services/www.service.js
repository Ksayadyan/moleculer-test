const express = require('express');
const router = express.Router();
const morgan = require('morgan');

module.exports = {

	name: 'www',

	// This is settings object, usefull to override global settings for itself
	settings: {

		port: 3000,
		transporter: 'TCP' // This is experemantal. I just don't want to install nats server.

	},


	// Theese are methods that available and visible only in service like private methods
	methods: {

		setupServer(router){

			const app = express();
			this.app = app;
			this.app.use(morgan('dev'));
			this.app.use(router);

		},

		initRootRoutes(router){

			router.get('/', (req, res) => {

				res.send('Root Url Response');

			})

		}

	},

	//Theese are actions. Thay are callable and visible both from inside and outside(i mean other services);
	actions: {

		reloadRouter(ctx){

			this.app.use(ctx.params.router);

		}

	},

	//And now the lifecycles. Every service has it's own lifecycles like in ReactJS !

	created(){

		this.setupServer(router);
		this.initRootRoutes(router);
		this.server = this.app.listen(3000, () => {

			console.log('Server is running on port 3000');

		});

	},

	stopped(){

		this.server.close();
		console.log('Server port 3000 is closed');

	}

}