const express = require('express');

const authController = require('../controllers/authController');

const router = express.Router();

router.use('*', authController.isAuth, (req, res, next) => {
  if(req.originalUrl === '/auth/verify' && res.locals.tokenVerif) {
    return res.status(200).json({auth: true});
  }
  else if (res.locals.tokenVerif) {
    return next();
  }
  else {
    return res.status(401).json({auth: false});
  }
});


module.exports = router;