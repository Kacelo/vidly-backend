function auth (req, res, next) {
    console.log("Authenicating...");
    // after the middleware runs, the request should be passed on to the next middleware
    next();
  };

  module.exports = auth;