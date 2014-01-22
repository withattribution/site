'use strict';

var express = require('express'),
    path = require('path'),
    expressValidator = require('express-validator'),
    config = require('./config');

/**
 * Express configuration
 */
module.exports = function(app) {
  app.configure('development', function(){
    app.use(require('connect-livereload')());

    // Disable caching of scripts for easier testing
    app.use(function noCache(req, res, next) {
      if (req.url.indexOf('/scripts/') === 0) {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.header('Pragma', 'no-cache');
        res.header('Expires', 0);
      }
      next();
    });

    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'app')));
    app.use(express.errorHandler());
    app.set('views', config.root + '/app/views');
  });

  app.configure('production', function(){
    app.use(express.favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('views', config.root + '/views');
  });

  app.configure(function(){
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(express.logger('dev'));

    // pass a secret to cookieParser() for signed cookies
    // all these secret keys are jokes for now [TODO:replace secret keys with stuff]
    app.use(express.cookieParser('manny is cool'));
    app.use(express.session({ key:"sid", secret: 'mysecretcode', cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }})); 
    // app.use(express.bodyParser());
+   app.use(express.json());
 +  app.use(express.urlencoded());
    app.use(expressValidator());
    app.use(express.methodOverride());
    // Router needs to be last
    app.use(app.router);
  });
};