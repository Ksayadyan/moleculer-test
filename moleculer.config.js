module.exports = {
	nodeID: "node-server-1",
	logger: true,
	logLevel: "info",

	transporter: "TCP",
	requestTimeout: 5 * 1000,

	retryPolicy: {
		enabled: true,
		retries: 5,
		delay: 100,
		maxDelay: 2000,
		factor: 5,
		check: err => err && !!err.retryable
},

	metrics: true
};