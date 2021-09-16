import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


/*
  Gets the list of positions in repsonse from http request and renders component that will help choose only available positions
 */

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '20.2vw',
    border: '1px solid rgb(26, 99, 189)',
    borderRadius: '3px',
    backgroundColor: 'rgba(175, 225, 250, 0.105)'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function SimpleSelect(props) {
  const classes = useStyles();
  const [data, setData] = useState([{value: null}]);

  const handleChange = (e) => {
    props.setNewInfo(oldInfo => ({...oldInfo, position:e.target.value}));
  };

  const fetchData = async () => {
    try {
      const response = await fetch('/recruitment/positionlist');
      const data =  await response.json();
      const arr = [];
      data.forEach(elem => arr.push({value:elem.title}));
      setData(arr);
    }
    catch (err) {
      console.log(err);
    }
  };
  
  useEffect (() => {
    fetchData();
  }, []);

  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.newInfo.position}
          onChange={handleChange}
        >
          { data.map((choice, i) => {
            return    <MenuItem key = {i} value={choice.value}>{choice.value}</MenuItem>;
          }
          )}
        </Select>
      </FormControl>
    </div>
  );
}

export default SimpleSelect;