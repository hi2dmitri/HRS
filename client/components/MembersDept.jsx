import React, { useState, useEffect } from 'react';
import MemberCard from './MemberCard';

/*
  Gets all members from http Request and renders Member Cards
 */

const MembersDept = () => {
  const [allMembers, setAllMembers] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async() => {
    try {
      const result = await fetch('/members', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const jsonres = await result.json();
      setAllMembers(jsonres);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className='membersNav'> 
        <div>NAME</div>
        <div>POSITION</div>
        <div>STATUS</div>
        <div>CONTACT</div>
      </div>
      {allMembers.map(member => 
        <MemberCard 
          key={member._id} 
          first_name={member.first_name} 
          last_name={member.last_name}
          position={member.position}
          email={member.email}
          reg_status={member.reg_status}
        /> )}
    </div>
  );
};

export default MembersDept;


