const jwt = require('jsonwebtoken');
const authController = {};

authController.isAuth = async (req, res, next) => {
  try{
    if(!req.cookies.ssid) {
      res.locals.tokenVerif = false;
      return next();
    }
    const token = req.cookies.ssid;
    const id = await jwt.verify(token, process.env.ID_SALT);
    if (id) {
      res.locals.tokenVerif = true;
    }
    else {res.locals.tokenVerif = false;}
    return next();
  }
  catch (err) {return next(err);}
};



module.exports = authController;
