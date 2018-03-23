// config/database.js
var config = {
	production: {
		url : ''
	},
	default: {
	    'url' : 'mongodb://localhost/mailmm'
	}
};
module.exports.get = function (env) {
	return config[env] || config.default;
};