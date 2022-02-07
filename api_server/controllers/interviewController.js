const db = require('../db');
const interviewController = {};


interviewController.getInterviews = async (req, res, next) => {
  try{
    const queryStr = `SELECT can.*,i.date,i.time,i.position FROM candidates can 
    INNER JOIN interviews i ON i.candidate_id =can.id;`;
    const result = await db.query(queryStr);
    const data = result.rows;
    res.locals.data = data;
    return next();
  }
  catch (err) {
    console.log(err);
    res.locals.data = true;
    return next();
  }
};




module.exports = interviewController;
