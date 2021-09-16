const express = require('express');
const db = require('../db');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

//sends all info on employees with status 'Y' in array of objects, joining addresses to each candidate
//if error occured sends false
router.get('/', employeeController.getPresent, (req, res) => {
  if (res.locals.result === false) {
    return res.status(400).json(res.locals.result);
  }
  else if (res.locals.result !== false) {
    return res.status(200).json(res.locals.result);
  }
}
);

//sends all info on employees with status 'N' in array of objects, joining addresses to each candidate
//if error occured sends false
router.get('/past',employeeController.getFormer, (req, res) => {
  if (res.locals.result === false) {
    return res.status(400).json(res.locals.result);
  }
  else if (res.locals.result !== false) {
    return res.status(200).json(res.locals.result);
  }
}
);

//adds employee and address to tables employees and addresses;
//if error occured sends false
router.post('/add', employeeController.addEmployee, (req, res) => {
  if (res.locals.added === true) {
    return res.status(200).json(res.locals.added);
  }
  else if (res.locals.added === false) {
    return res.status(400).json(res.locals.added);
  }
}
);

//updates status to 'N', adds terminreason and termindate;
//if error occured sends false otherwise true;
router.post('/terminate', employeeController.terminateEmployee, (req, res) => {
  if (res.locals.reply  === true) {
    return res.status(200).json(true);
  }
  else if (res.locals.reply === false) {
    return res.status(400).json(false);
  }
});

//sends query for each property in req.body;
//if error occured sends false;
//else true;
router.post('/update', employeeController.updateEmployee, (req, res) => {
  if (res.locals.error === false) {
    return res.status(200).json(true);
  }
  else if (res.locals.error === true) {
    return res.status(400).json(false);
  }
});

//selects date of hiring and termination from employees, 
//runs function on sorting them to get an object with month and number of employees per month;
//sends true if error otherwise array of objects;
router.get('/graphdata', employeeController.getGraphData, (req, res) => {
  if(res.locals.result === true) {
    return res.status(400).json(res.locals.result);
  }
  else {
    return res.status(200).json(res.locals.result);}
}
);

//used pg function to get employees hired within 30 days from today;
//returns an array of objects or true if error occured;
router.get('/latesthired', employeeController.getLatestHired, (req, res) => {
  if(res.locals.list === true) {
    return res.status(400).json(res.locals.list);
  }
  else {
    return res.status(200).json(res.locals.list);}

});

//used pg function to get employees fired within 30 days from today;
//returns an array of objects or true if error occured;
router.get('/latestfired', employeeController.getLatestFired, (req, res) => {
  if(res.locals.list === true) {
    return res.status(400).json(res.locals.list);
  }
  else {
    return res.status(200).json(res.locals.list);}
});



module.exports = router;