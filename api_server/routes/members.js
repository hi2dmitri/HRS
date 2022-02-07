const express = require('express');
const db = require('../db');
const router = express.Router();

//gets all members from tokens and sends to frontend;

router.get('/', async (req, res) => {
  try {
    const queryMembers = 'SELECT * from tokens;';
    const result = await db.query(queryMembers);
    res.status(200).json(result.rows);
  }
  catch(err)  {
    console.log(err);
    return err;
  }
});


module.exports = router;