var Gmail = require('node-gmail-api');

module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', isAuthUser,function(req, res) {
        res.render('index.ejs',{layout: 'header'}); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage'),layout: 'header'});
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage'),layout: 'header' });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
          var gmail = new Gmail(req.user.google.token)
          , s = gmail.messages('label:inbox', {max: 10}), data = [];

        s.on('data', function(d) {
          data.push(getHtml(d));
        });
        s.on('end', function() {
          res.render('profile.ejs', {
                  user : req.user, // get the user out of session and pass to template,
                  mm: data,
                  layout: 'header'
              });
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

     // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/auth/google', passport.authenticate('google', { scope:
    [ 'https://www.googleapis.com/auth/plus.login',
     'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/plus.profile.emails.read' ] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/profile',
                    failureRedirect : '/'
            }));

     // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

     // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
};
// redirect dashboard if authenticated user
function isAuthUser(req, res, next) {
    if( req.isAuthenticated())
        return res.redirect('/profile');
    return next();
}
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
// mail message to html
function getHtml(res) {
  var parts = [res.payload];
  while (parts.length) {
    var part = parts.shift();
    if (part.parts) {
      parts = parts.concat(part.parts);
    }

    if(part.mimeType === 'text/html') {
      return Buffer.from(part.body.data, 'base64').toString();
    }
  }
  return '';
}
