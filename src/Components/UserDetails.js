import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const UserDetailsContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  border: 2px solid #ccc;
  border-radius: 10px;
  font-size: 24px;
  box-sizing: border-box; /* Ensure padding and border are included in width */
`;

const UserDetailsItem = styled.p`
  margin-bottom: 15px;
  display: flex;
  align-items: center;
`;

const Label = styled.span`
  flex: 0 0 150px;
  font-weight: bold;
`;

const Value = styled.span`
  flex: 1;
`;

const EditLink = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 8px;
  margin-top: 20px;
  font-size: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

// Media query for smaller screens
const mediaQuery = '@media (max-width: 768px)';

const UserDetailsContainerResponsive = styled(UserDetailsContainer)`
  ${mediaQuery} {
    padding: 20px;
    font-size: 16px;
  }
`;

const UserDetailsItemResponsive = styled(UserDetailsItem)`
  ${mediaQuery} {
    margin-bottom: 10px;
  }
`;

const LabelResponsive = styled(Label)`
  ${mediaQuery} {
    flex: 0 0 120px;
  }
`;

const UserDetails = ({ user, userRole }) => {
  return (
    <UserDetailsContainerResponsive>
      <h2>User Details</h2>
      <UserDetailsItemResponsive>
        <LabelResponsive>ID</LabelResponsive>
        <Value>: {user?.id}</Value>
      </UserDetailsItemResponsive>
      <UserDetailsItemResponsive>
        <LabelResponsive>Username</LabelResponsive>
        <Value>: {user?.username}</Value>
      </UserDetailsItemResponsive>
      <UserDetailsItemResponsive>
        <LabelResponsive>Email</LabelResponsive>
        <Value>: {user?.email}</Value>
      </UserDetailsItemResponsive>
      <UserDetailsItemResponsive>
        <LabelResponsive>Role</LabelResponsive>
        <Value>: {user?.role}</Value>
      </UserDetailsItemResponsive>
      {userRole === 'admin' && ( // Conditionally render edit link
        <EditLink to={`/user/${user?.id}/edit`}>Edit</EditLink>
      )}
    </UserDetailsContainerResponsive>
  );
};

export default UserDetails;
