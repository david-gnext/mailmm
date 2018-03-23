// config/database.js
var config = {
	production: {
		url : 'mongodb://davijp:davijpMMM333@ds119129.mlab.com:19129/mailmm'
	},
	default: {
	    'url' : 'mongodb://localhost/mailmm'
	}
};
module.exports.get = function (env) {
	return config[env] || config.default;
};