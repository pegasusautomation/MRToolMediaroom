
import React from 'react';

const UserProfile = ({ userData }) => {
  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
      <p>Role:{userData.role}</p>
      {/* Display other user-specific content */}
      <footer style={{marginLeft:"500px",marginTop:"5px",textaaAlign:"center",position:"fixed",bottom:"0px",height:"27px"}}>
    <small>&copy; Copyright 2024, MediaKind</small>
  </footer>
    </div>
  );
};

export default UserProfile;
