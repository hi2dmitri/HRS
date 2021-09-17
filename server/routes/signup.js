const express = require('express');
const cookieController = require('../controllers/cookieController');
const authController = require('../controllers/authController');
const router = express.Router();


//checks if token is existing, if all info provided, if user registered - sends status false
//if not registered - changes status to registered, gets name, encrypts password and stores everything in auth_table
//creates jwt and sends it in cookie

router.post('/', authController.createUser, cookieController.createSession, (req, res) => {
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

module.exports = router;