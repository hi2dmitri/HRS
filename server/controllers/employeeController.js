const employeeController = {};
const db = require('../db');
employeeController.getPresent = async (req, res, next) => {
  try {
    const queryMembers = `SELECT e.*, a.street, a.city, a.state, a.zip 
      FROM addresses a 
      INNER JOIN employees e 
      ON e.id=a.person_id
      WHERE e.current = 'Y';`;
    const result = await db.query(queryMembers);
    res.locals.result = result.rows;
    return next();
  }
  catch(err)  {
    console.log (err);
    res.locals.result = false;
    return next();
  }
};

employeeController.getFormer = async (req, res, next) => {
  try {
    const queryMembers = `SELECT e.*, a.street, a.city, a.state, a.zip 
      FROM addresses a 
      INNER JOIN employees e 
      ON e.id=a.person_id
      WHERE e.current = 'N';`;
    const result = await db.query(queryMembers);
    res.locals.result = result.rows;
    return next();
  }
  catch(err)  {
    console.log (err);
    res.locals.result = false;
    return next();}
};


employeeController.addEmployee = async (req, res, next) => {
  try {
    const {first_name, last_name, email, dob, gender, marstatus, dependants, department, position, dateofhire, type, street, city, state, zip} = req.body;
    const addEmployeeQuery = `INSERT INTO employees (first_name, last_name, email, dob, gender, marstatus, dependants, department, position, dateofhire, type, current)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
      RETURNING id;`;
    const current = 'Y';
    const values = [first_name, last_name, email, dob, gender, marstatus, dependants, department, position, dateofhire, type, current];
    const addedPerson = await db.query(addEmployeeQuery, values);
    const addedPersonId = addedPerson.rows[0].id;
    const id = addedPersonId;
    const addAddressQuery = `INSERT INTO addresses (id, person_id, street, city, state, zip)
      VALUES($1, $2, $3, $4, $5, $6)
      RETURNING id;`;
    const vals = [id, addedPersonId, street, city, state, zip];
    const addedAddress = await db.query(addAddressQuery, vals);
    const addedAddressId = addedAddress.rows[0].id;
    if (addedAddressId) {res.locals.added = true;}
    else {res.locals.added = false;}
    return next();
  }
  catch (err) {
    console.log(err);
    res.locals.added = false;
    return next();
  }
};

employeeController.terminateEmployee = async (req, res, next) => {
  try {
    const{id, termindate, terminreason} = req.body;
    const terminateQuery = `UPDATE employees
    SET termindate = $1, terminreason = $2, current = $3
    WHERE id = $4 RETURNING *;`;
    const current = 'N';
    const values = [termindate, terminreason, current, id];
    const terminatedEmployee = await db.query(terminateQuery, values);
    const returnedterm = terminatedEmployee.rows[0].terminreason;
    if (returnedterm) {res.locals.reply = true;}
    else if (!returnedterm) {res.locals.reply = false;}
    return next();
  }
  catch (err) {
    console.log(err);
    res.locals.reply = false;
    return next ();
  }
};

employeeController.updateEmployee = async (req, res, next) => {
  try{
    const id = req.body.id;
    if(req.body.email !== null) {
      const updQuery = `UPDATE employees 
      SET email = $1 WHERE id = $2;`;
      const values = [req.body.email, id];
      await db.query(updQuery, values);
    }
    if (req.body.department !== null) {
      const updQuery = `UPDATE employees 
      SET department = $1 WHERE id = $2;`;
      const values = [req.body.department, id];
      await db.query(updQuery, values);
    }
    if (req.body.position !== null) {
      const updQuery = `UPDATE employees 
      SET position = $1 WHERE id = $2;`;
      const values = [req.body.position, id];
      await db.query(updQuery, values);
    }
    if (req.body.type !== null) {
      const updQuery = `UPDATE employees 
      SET type = $1 WHERE id = $2;`;
      const values = [req.body.type, id];
      await db.query(updQuery, values);
    }
    if (req.body.street !== null) {
      const updQuery = `UPDATE addresses 
      SET street = $1 WHERE person_id = $2;`;
      const values = [req.body.street, id];
      await db.query(updQuery, values);
    }
    if (req.body.city !== null) {
      const updQuery = `UPDATE addresses 
      SET city = $1 WHERE person_id = $2;`;
      const values = [req.body.city, id];
      await db.query(updQuery, values);
    }
    if (req.body.state !== null) {
      const updQuery = `UPDATE addresses 
      SET state = $1 WHERE person_id = $2;`;
      const values = [req.body.state, id];
      await db.query(updQuery, values);
    }
    if (req.body.zip !== null) {
      const updQuery = `UPDATE addresses 
      SET zip = $1 WHERE person_id = $2;`;
      const values = [req.body.zip, id];
      await db.query(updQuery, values);
    }
    if (req.body.marstatus !== null) {
      const updQuery = `UPDATE employees 
      SET marstatus = $1 WHERE id = $2;`;
      const values = [req.body.marstatus, id];
      await db.query(updQuery, values);
    }
    if (req.body.dependants !== null) {
      const updQuery = `UPDATE employees 
      SET dependants = $1 WHERE id = $2;`;
      const values = [req.body.dependants, id];
      await db.query(updQuery, values);
    }
    res.locals.error = false;
    return next();
  }
  catch (err) {
    console.log(err);
    res.locals.error = true;
    return next();
  }
};

employeeController.getGraphData = async (req, res, next) => {
  try{
    const graphQuery = `SELECT dateofhire, termindate 
    FROM employees;`;
    const result = await db.query(graphQuery);
    res.locals.result = result.rows;
    return next();
  }
  catch (err) {
    console.log(err);
    res.locals.result = true;
    return next();
  }
};

 
employeeController.getLatestHired = async (req, res, next) => {
  try{
    const queryHired = `SELECT first_name, last_name
    FROM employees 
    WHERE CAST(dateofhire AS DATE) 
    between current_date - interval '30 day' and current_date;`;
    const returnedData = await db.query(queryHired);
    const data = returnedData.rows;
    const list = {
      number: data.length, 
      names: data
    };
    res.locals.list = list;
    return next();
  }
  catch (err) {
    console.log(err);
    res.locals.list = true;
    return next();
  }
};


employeeController.getLatestFired = async (req, res, next) => {
  try{
    const queryHired = `SELECT first_name, last_name
    FROM employees 
    WHERE CAST(termindate AS DATE) 
    between current_date - interval '30 day' and current_date;`;
    const returnedData = await db.query(queryHired);
    const data = returnedData.rows;
    const list = {
      number: data.length, 
      names: data
    };
    res.locals.list = list;
    return next();
  }
  catch (err) {
    console.log(err);
    res.locals.list = true;
    return next();
  }
};



module.exports = employeeController;
