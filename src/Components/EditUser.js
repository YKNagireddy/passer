import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';

const FormContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  border: 2px solid #ccc;
  border-radius: 10px;
  font-size: 24px; /* Increased font size */
  box-sizing: border-box;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
    width: 150px; /* Fixed width for labels */
  }

  input,
  select {
    width: calc(100% - 150px); /* Adjust input/select width */
    padding: 8px;
    font-size: 20px; /* Increased font size */
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 20px; /* Increased font size */
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

// Media query for smaller screens
const mediaQuery = '@media (max-width: 768px)';

const FormContainerResponsive = styled(FormContainer)`
  ${mediaQuery} {
    padding: 20px;
    font-size: 16px;
  }
`;

const FormGroupResponsive = styled(FormGroup)`
  ${mediaQuery} {
    margin-bottom: 15px;
  }

  label {
    ${mediaQuery} {
      width: 120px;
    }
  }

  input,
  select {
    ${mediaQuery} {
      width: calc(100% - 120px);
      font-size: 14px; /* Adjusted font size for smaller screens */
    }
  }
`;

const EditUser = ({ users, onUpdateUser }) => {
  const { userId } = useParams();
  const user = users.find(user => user.id === parseInt(userId));
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate()

  const validateEmail = (email) => {
    // Regular expression for validating email format
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email format
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    } else {
      setEmailError('');
    }

    // Update user data
    onUpdateUser({
      id: user.id,
      username,
      email,
      role
    });
    navigate('/')
  };

  return (
    <FormContainerResponsive>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <FormGroupResponsive>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </FormGroupResponsive>
        <FormGroupResponsive>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
        </FormGroupResponsive>
        <FormGroupResponsive>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </FormGroupResponsive>
        <Button type="submit">Save</Button>
      </form>
    </FormContainerResponsive>
  );
};

export default EditUser;
