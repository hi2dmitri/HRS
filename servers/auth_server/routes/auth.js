const express = require('express');

const cookieController = require('../controllers/cookieController');
const authController = require('../controllers/authController');

const router = express.Router();
  
//gets a user by email, verifies password with bcrypt library and adds his name to resp object;
//creates jwt and sends it in cookie;     
router.post('/login', authController.verifyUser, cookieController.createSession, (req, res) => {
  const respObj = {
    status: res.locals.registration,
    name: res.locals.name,
  };
  if (res.locals.registration === false) {
    return res.status(401).json(respObj);
  }
  return res.status(200).json(respObj);
});
  
router.post('/signup', authController.createUser, cookieController.createSession, (req, res) => {
  if (res.locals.registration === false) {
    return res.status(401).json({status: false, name: {firstName:undefined, lastName: undefined}});
  }
  if (res.locals.notvalidemail === true) {
    return res.status(401).json({
      status: 'emailfailed',
      name: {firstName:undefined, lastName: undefined}
    });
  }
  return res.status(200).json({status: true, name:res.locals.name});
});

router.get('/logout', (req, res) => {
  res.clearCookie('ssid');
  return res.sendStatus(200);
});


module.exports = router;