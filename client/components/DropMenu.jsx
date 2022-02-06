import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function BasicMenu({setCurrentComponent}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    if(e.target.id === 'dashboard') {
      setCurrentComponent({type: 'DASHBOARD'});
    } 
    else if (e.target.id === 'employment') {
      setCurrentComponent({type: 'EMPLOYMENT'});
    } 
    else if (e.target.id === 'jobs') {
      setCurrentComponent({type: 'RECRUITMENT: jobs'});
    } 
    else if (e.target.id === 'interviews') {
      setCurrentComponent({type: 'RECRUITMENT: interviews'});
    } 
    else if (e.target.id === 'applicants') {
      setCurrentComponent({type: 'RECRUITMENT: applicants'});
    } 
    setAnchorEl(null);
    
  };

  return (
    <div className='drop-menu'>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Menu
      </Button>
      <Menu
        id="basic-menu"
        anchorOrigin={{horizontal: 'center', vertical:'bottom'}}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem id='dashboard'onClick={handleClose}>Dashboard</MenuItem>
        <MenuItem id='employment' onClick={handleClose}>Employment</MenuItem>
        <MenuItem id='jobs' onClick={handleClose}>Jobs</MenuItem>
        <MenuItem id='applicants' onClick={handleClose}>Applicants</MenuItem>
        <MenuItem id='interviews' onClick={handleClose}>Interviews</MenuItem>
      </Menu>
    </div>
  );
}