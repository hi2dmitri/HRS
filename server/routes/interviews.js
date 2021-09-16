const express = require('express');
const db = require('../db');
const router = express.Router();
const interviewController = require('../controllers/interviewController');



//sends an array of objects with all data about each candidate, as well as interview info on each;
//sends true if failed
router.get('/',interviewController.getInterviews, (req, res) => {
  if(res.locals.data === true) {
    res.status(400).json(true);
  }
  else {
    res.status(200).json(res.locals.data);
  }
}
);





module.exports = router;