import React from 'react';

const ManagerProfile = ({ userData }) => {
  return (
    <div>
      <h2>Manager Profile</h2>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
      <p>Role:{userData.role}</p>
      {/* Display other user-specific content */}
    </div>
  );
};

export default ManagerProfile;
