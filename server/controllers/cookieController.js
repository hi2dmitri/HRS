const jwt = require('jsonwebtoken');

const cookieController = {};

cookieController.createSession = async (req, res, next) => {
  try{
    if (res.locals.registration === false) {
      return next();
    }
    if (res.locals.notvalidemail === true) {
      return next();
    }
    const token = await jwt.sign({id: res.locals.id}, process.env.ID_SALT);
    res.cookie('ssid', token, {maxAge: 300000});
    return next();
  } 
  catch (err) {
    return next(err);
  }
};

cookieController.verifyToken = async (req, res, next) => {
  try{
    const token = req.body.token;
    const id = await jwt.verify(token, process.env.ID_SALT);
    if (id) {
      res.locals.tokenVerif = true;
    }
    else res.locals.tokenVerif = false;
    return next();
  }
  catch (err) {return next(err);}
};

module.exports = cookieController;