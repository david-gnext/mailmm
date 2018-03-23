var Auth = {
    production : {
        'googleAuth' : {
        'clientID'      : '572912981996-mpds27b69cu89gm86uq63m6anri8ltp8.apps.googleusercontent.com',
        'clientSecret'  : 'M1OfiCS2EzEe24T7DEI2yqbE',
        'callbackURL'   : 'https://mailmm.herokuapp.com/auth/google/callback'
    }
    },
    default: {
    'facebookAuth' : {
        'clientID'      : 'your-secret-clientID-here', // your App ID
        'clientSecret'  : 'your-client-secret-here', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '572912981996-mpds27b69cu89gm86uq63m6anri8ltp8.apps.googleusercontent.com',
        'clientSecret'  : 'M1OfiCS2EzEe24T7DEI2yqbE',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }
}
};

module.exports.get = function (env) {
    return Auth[env] || Auth.default;
}