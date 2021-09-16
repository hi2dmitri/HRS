const express = require('express');
const db = require('../db');
const router = express.Router();
const recruitmentController = require('../controllers/recruitmentController');

//sends array of all jobs or false if error occured
router.get('/jobs', recruitmentController.getAllJobs,(req, res) => {
  if(res.locals.result === true) {
    res.status(400).json(res.locals.result);
  }
  else {
    res.status(200).json(res.locals.result);
  }

});

//deletes job from db and sends back deleted job object
router.delete('/deletejob', recruitmentController.deleteJob, (req, res) => {
  res.status(200).json(res.locals.result);
});

//sends array of objects with properties: title and num of applications;
//if error - sends true
router.get ('/positionlist', recruitmentController.getPositions, (req, res) => {
  if(res.locals.result === true) {
    res.status(400).json(res.locals.result);
  }
  else {
    res.status(200).json(res.locals.result);
  }});

//sends true if job was added or false if error occured
router.post('/addjob', recruitmentController.addJob, (req, res) =>{
  if(res.locals.result === true) {
    res.status(200).json(res.locals.result);
  }
  else {
    res.status(400).json(res.locals.result);
  }
});

//adds applicant to candidates table and increases num of applicants in jobs table
//sends true if success, false if error occured anywhere
router.post('/addapplicant', recruitmentController.addApplicant, recruitmentController.increaseApplicCount, (req, res) =>{
  if(res.locals.result === true) {
    res.status(200).json(res.locals.result);
  }
  else {
    res.status(400).json(res.locals.result);
  }
});

//selects position from candidates, inserts all data into interviews table and updates status in candidates to 'Scheduled'
router.post('/addinterview', recruitmentController.addInterview, (req, res, ) => {
  if(res.locals.result === true) {
    res.status(200).json(res.locals.result);
  }
  else {
    res.status(400).json(res.locals.result);
  }
});

//gets all applicants from candidates table; 
//sends array of appliacants objects if success, false if error
router.get('/applicants', recruitmentController.getApplicants, (req, res, ) => {
  if(res.locals.result === true) {
    res.status(200).json(res.locals.applicants);
  }
  else {
    res.status(400).json(false);
  }
});

//gets all applicants from candidates table with status 'Awaiting';
//returns array of applicants objects or false if error occured
router.get('/awaitingscheduling', recruitmentController.getAwaiting, (req, res) => {
  if(res.locals.result === true) {
    res.status(200).json(res.locals.applicants);
  }
  else {
    res.status(400).json(false);
  }
});

//deletes all interviews for given position, deletes applicant with id from req.body
//changes status of all applicants for given position to 'Cancelled' and deletes job
router.post('/acceptcandidate', recruitmentController.deleteInterviews, recruitmentController.deleteApplicant, recruitmentController.changeApplicants, recruitmentController.removeJob, (req, res) => {
  if(res.locals.result === true) {
    res.status(200).json(true);
  }
  else {
    res.status(400).json(false);
  }});

//deletes only one interview with candidate id from req.body, decreases num of applicants in jobs and deletes applicant from candidates table
router.post('/declinecandidate', recruitmentController.deleteOneInterview, recruitmentController.decreaseApplicCount, recruitmentController.deleteApplicant, (req, res) => {
  if(res.locals.result === true) {
    res.status(200).json(true);
  }
  else {
    res.status(400).json(false);
  }});

module.exports = router;