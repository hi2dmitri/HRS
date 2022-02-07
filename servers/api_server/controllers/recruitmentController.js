const recruitmentController = {};
const db = require('../db');

recruitmentController.getAllJobs = async (req, res, next) => {
  try {
    const queryStr =  'SELECT * FROM jobs;';
    const result = await db.query(queryStr);
    const data = result.rows;
    res.locals.result = data;
    return next();
  }
  catch (err) {
    res.locals.result = true;
    return next();
  }
};

recruitmentController.deleteJob = async (req, res, next) => {
  try {
    const {id} = req.body;
    const queryStr = 'DELETE FROM jobs WHERE id = $1 RETURNING *';
    const value = [id];
    const resp = await db.query(queryStr, value);
    const data = resp.rows[0];
    res.locals.result = data;
    return next();
  }
  catch (err) {console.log(err);
  }
};

recruitmentController.getPositions = async (req, res, next) => {
  try {
    const queryStr = 'SELECT title, num_of_app FROM jobs;';
    const resp = await db.query(queryStr);
    const data = resp.rows;
    res.locals.result = data;
    return next();
  }
  catch (err) {
    console.log(err);
    res.locals.result = true;
    return next();
  }
};


recruitmentController.addJob  = async (req, res, next) => {
  try {
    const {title, department, open_since, notes} = req.body;
    const numOfApps = '0';
    const values = [title, department,open_since, numOfApps, notes];
    const addJobQuery = `INSERT INTO jobs (title, department, open_since, num_of_app, notes)
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING id;`;
    const resp = await db.query(addJobQuery, values);
    const data = resp.rows;
    res.locals.result = true;
    return next();
  }
  catch (err) {
    console.log(err);
    res.locals.result = false;
    return next();
  }
};

recruitmentController.addApplicant = async(req, res, next) => {
  try{
    const {first_name, last_name, email, phone, experience, education, notes, position} = req.body;
    const status = 'Applied';
    const values = [first_name, last_name, email, phone, experience, notes, education, position, status];
    const addApplicantQuery = `INSERT INTO candidates (first_name, last_name, email, phone, experience, notes, education, position, status)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
    RETURNING id;`;
    const resp = await db.query(addApplicantQuery, values);
    const data = resp.rows;
    res.locals.result = true;
    return next();
  } 
  catch (err) {
    console.log(err);
    res.locals.result = false;
    return next();
  }
};

recruitmentController.increaseApplicCount = async(req, res, next) => {
  try{
    const position = req.body.position;
    const value = [position];
    const updateJobCountQuery = `UPDATE jobs SET num_of_app = num_of_app + 1 
    WHERE title=$1;`;
    const resp = await db.query(updateJobCountQuery, value);
    return next();
  }
  catch(err) {
    console.log(err);
  }
};

recruitmentController.addInterview = async(req, res, next) => {
  try{
    const {candidate_id, date, time} = req.body;
    const reqQuery = `SELECT position 
    FROM candidates 
    WHERE id = $1;`;
    const value = [candidate_id];
    const result = await db.query(reqQuery, value);
    const position = result.rows[0].position;
    const addInterviewQuery = `INSERT INTO interviews (candidate_id, date, time, position) 
    VALUES ($1, $2, $3, $4)
    RETURNING * ;`;
    const values = [candidate_id, date, time, position];
    const finalRes = await db.query(addInterviewQuery, values);
    const statusQuery = `UPDATE candidates SET status = $1
    WHERE id = $2;`;
    const status = 'Scheduled';
    const newVals = [status, candidate_id];
    const statusResult = await db.query(statusQuery, newVals);
    res.locals.result = true;
    return next();
  }
  catch (err) {
    res.locals.result = false;
    return next();
  }
};

recruitmentController.getApplicants = async (req, res, next) => {
  try{
    res.locals.result = true;
    const queryStr = 'SELECT * FROM candidates;';
    const resultData = await db.query(queryStr);
    const data = resultData.rows;
    res.locals.applicants = data;
    return next();
  }
  catch(err) {
    res.locals.result = false;
    return next();
  }
};

recruitmentController.getAwaiting = async (req, res, next) => {
  try{
    res.locals.result = true;
    const queryStr = 'SELECT first_name, last_name, id, position FROM candidates WHERE status=\'Applied\';';
    const data = await db.query(queryStr);
    res.locals.applicants = data.rows;
    return next();
  }
  catch(err) {res.locals.result = false;
    return next();}
};

recruitmentController.deleteInterviews = async (req, res, next) => {
  try {
    const {id, position} = req.body;
    res.locals.result = true;
    const queryStr = `DELETE from interviews 
    WHERE position = $1;`;
    const value = [position];
    const result = await db.query(queryStr, value);
    return next();
  }
  catch (err) {
    res.locals.result = false;
    return next();
  }
};

recruitmentController.deleteApplicant = async (req, res, next) => {
  try {
    const {id} = req.body;
    res.locals.result = true;
    const queryStr = `DELETE from candidates 
    WHERE id = $1;`;
    const value = [id];
    const result = await db.query(queryStr, value);
    return next();
  }
  catch (err) {
    res.locals.result = false;
    return next();
  }
};

recruitmentController.changeApplicants = async (req, res, next) => {
  try {
    const {position} = req.body;
    res.locals.result = true;
    const queryStr = `UPDATE candidates SET status = $1
    WHERE position = $2;`;
    const status = 'Cancelled';
    const values = [status, position];
    const result = await db.query(queryStr, values);
    return next();
  }
  catch (err) {
    res.locals.result = false;
    return next();
  }
};

recruitmentController.removeJob = async (req, res, next) => {
  try {
    const {position} = req.body;
    res.locals.result = true;
    const queryStr = `DELETE FROM jobs 
    WHERE title = $1;`;
    const value = [position];
    const result = await db.query(queryStr, value);
    return next();
  }
  catch (err) {
    res.locals.result = false;
    return next();
  }
};

recruitmentController.deleteOneInterview = async (req, res, next) => {
  try {
    const {id, status} = req.body;
    res.locals.result = true;
    if (status === 'Scheduled') {
      const queryStr = `DELETE from interviews 
      WHERE candidate_id = $1;`;
      const value = [id];
      const result = await db.query(queryStr, value);
      return next();
    }
    else {
      return next();
    }
  }
  catch (err) {
    res.locals.result = false;
    return next();
  }
};

recruitmentController.decreaseApplicCount = async (req, res, next) => {
  try{
    const {position, status} = req.body;
    res.locals.result = true;
    if (status === 'Applied' || status === 'Scheduled') {
      const value = [position];
      const updateJobCountQuery = `UPDATE jobs SET num_of_app = num_of_app - 1 
      WHERE title=$1;`;
      const resp = await db.query(updateJobCountQuery, value);
      return next(); }
    else {return next();}
  }
  catch(err) {
    res.locals.result = false;
    return next();
  }
};

module.exports = recruitmentController;
