const db = require('../db');
const bcrypt = require('bcryptjs');
const authController = {};




authController.createUser = async (req, res, next) => {
  try {
    const SALT_WORK_FACTOR = 10;
    const {token, password, email} = req.body;
    if(token === null || password === null || email === null) {
      res.locals.registration = false;
      return next();
    }

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const _password = await bcrypt.hash(password, salt);

    // eslint-disable-next-line quotes
    const queryStr = 'SELECT * FROM tokens t WHERE t.token=$1';
    const value = [token];
    const respObj = await db.query(queryStr, value);
    const person = respObj.rows[0];
    if (!person) {
      res.locals.person = undefined;
      res.locals.registration = false;
      return next();
    }
    if (person.reg_status === 'Y') {
      res.locals.registration = false;
      return next();
    }
    if (person.reg_status === 'N') {
      res.locals.registration = true;

      const updateQuery  = `UPDATE tokens 
      SET reg_status='Y', email = $1
      WHERE token = $2 ;`;
      const newVal = [email, token];
      await db.query(updateQuery, newVal);

      const addAccountQuery = `INSERT INTO auth_table (email, password, first_name, last_name)
      VALUES ($1, $2, $3, $4) 
      RETURNING _id;`;
      const vals = [email, _password, person.first_name, person.last_name];
      const addedId = await db.query(addAccountQuery, vals);
      res.locals.name = {firstName: person.first_name, lastName: person.last_name};
      res.locals.id = addedId.rows[0]._id;
    }
    return next();
  } 
  catch (err) {
    console.log(err);
  }
};


authController.verifyUser = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    const findUserDb = `SELECT password, _id, first_name, last_name
    FROM auth_table WHERE email = $1;`;
    const value = [email];
    const returnVal = await db.query(findUserDb, value);
    if(returnVal.rows[0] === undefined) {
      res.locals.registration = false;
      res.locals.name = {
        firstName: undefined,
        lastName: undefined,
      };
      return next();
    }
    const hash = returnVal.rows[0].password;
    const id = returnVal.rows[0]._id;
    const check = await bcrypt.compare(password, hash);
    if (check === false) {
      res.locals.name = {
        firstName: undefined,
        lastName: undefined,
      };
      res.locals.registration = false;
      return next();
    }
    else {
      res.locals.registration = true;
      res.locals.id = id;
      res.locals.name = {
        firstName: returnVal.rows[0]['first_name'],
        lastName: returnVal.rows[0]['last_name'],
      };
      return next();
    }
  }
  catch (err) {
    console.log(err);
    res.locals.registration = false;
    return next (err);
  }
};




module.exports = authController;
