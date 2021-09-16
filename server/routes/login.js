const express = require('express');

const cookieController = require('../controllers/cookieController');
const authController = require('../controllers/authController');

const router = express.Router();
  
//gets a user by email, verifies password with bcrypt library and adds his name to resp object;
//creates jwt and sends it in cookie;     
router.post('/', authController.verifyUser, cookieController.createSession, (req, res) => {
  const respObj = {
    status: res.locals.registration,
    name: res.locals.name,
  };
  if (res.locals.registration === false) {
    return res.status(401).json(respObj);
  }
  return res.status(200).json(respObj);
});
  

router.post('/verify', cookieController.verifyToken, (req, res) => {
  res.status(200).json(res.locals.tokenVerif);
});


module.exports = router;