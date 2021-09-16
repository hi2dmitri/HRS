const numberOfEmplInMonth = (array) => {
  const year =  new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const currYear = {};
  
  for (let i = 1; i <= month; i++) {
    currYear[i] = 0;
  }
  
  const keysOfCurr = Object.keys(currYear);
  keysOfCurr.forEach((elem, i)=> keysOfCurr[i] = parseInt(elem));
  
  for (let i = 0; i < array.length; i++) {
    array[i].dateofhire = array[i].dateofhire.split('-');
    if (array[i].termindate === null) {
      array[i].termindate = [null];
    } 
    else {
      array[i].termindate = array[i].termindate.split('-');
    }
  }
  const stack = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i].termindate[0] === null || array[i].termindate[2] == year)
      stack.push(array[i]);
  }
  for (let i = 0; i < stack.length; i++) {
    if (stack[i].dateofhire[2] < year && stack[i].termindate[0] === null) {
      keysOfCurr.forEach(month => currYear[month]++);
    } 
    else if (stack[i].dateofhire[2] < year ) {
      for (let j = 0; j < keysOfCurr.length; j++) {
        if (keysOfCurr[j] <= stack[i].termindate[0]) {
          currYear[keysOfCurr[j]]++;
        }
      }
    }
    else if(stack[i].dateofhire[2] == year && stack[i].termindate[0] === null) {
      for(let k = 0; k < keysOfCurr.length; k++) {
        if(keysOfCurr[k] >= stack[i].dateofhire[0]) {
          currYear[keysOfCurr[k]]++;
        }
      }
    }
    else if(stack[i].dateofhire[2] == year && stack[i].termindate[2] == year) {
      for(let t = 0; t < keysOfCurr.length; t++) {
        if(keysOfCurr[t] >= stack[i].dateofhire[0] && keysOfCurr[t] <= stack[i].termindate[0]) {
          currYear[keysOfCurr[t]]++;
        }
      }
    }
  }
  const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
  const newArr = [];
  for (const prop in currYear) {
    newArr.push({month: months[prop - 1], employees: currYear[prop]});
  }
  return newArr;
};

module.exports = {numberOfEmplInMonth};