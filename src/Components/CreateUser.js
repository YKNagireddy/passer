import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addUser } from '../store/actions/actions';
import { useNavigate } from 'react-router-dom';

const FormContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
`;

const FormGroup = styled.div`
  margin-bottom: 25px;

  label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 20px;
  }

  input,
  select {
    width: 100%;
    padding: 12px;
    font-size: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }

  .error-message {
    color: red;
    font-size: 18px;
    margin-top: 5px;
  }
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;

  &:hover {
    background-color: #0056b3;
  }
`;

// Media query for smaller screens
const mediaQuery = '@media (max-width: 768px)';

const FormContainerResponsive = styled(FormContainer)`
  padding: 20px; /* Adjusted padding for smaller screens */
  font-size: 18px; /* Adjusted font size for smaller screens */

  ${mediaQuery} {
    padding: 15px; /* Further adjust padding for even smaller screens */
    font-size: 16px; /* Further adjust font size for even smaller screens */
  }
`;

const FormGroupResponsive = styled(FormGroup)`
  label {
    font-size: 18px; /* Adjusted font size for smaller screens */

    ${mediaQuery} {
      font-size: 16px; /* Further adjust font size for even smaller screens */
    }
  }

  input,
  select {
    padding: 10px; /* Adjusted padding for smaller screens */
    font-size: 18px; /* Adjusted font size for smaller screens */

    ${mediaQuery} {
      padding: 8px; /* Further adjust padding for even smaller screens */
      font-size: 16px; /* Further adjust font size for even smaller screens */
    }
  }

  .error-message {
    font-size: 16px; /* Adjusted font size for smaller screens */

    ${mediaQuery} {
      font-size: 14px; /* Further adjust font size for even smaller screens */
    }
  }
`;

const ButtonResponsive = styled(Button)`
  padding: 12px; /* Adjusted padding for smaller screens */
  font-size: 18px; /* Adjusted font size for smaller screens */

  ${mediaQuery} {
    padding: 10px; /* Further adjust padding for even smaller screens */
    font-size: 16px; /* Further adjust font size for even smaller screens */
  }
`;

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [emailError, setEmailError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateEmail = (inputEmail) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(inputEmail);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
      return;
    }
    setEmailError('');
    dispatch(addUser({ username, email, role }));
    navigate('/');
  };

  return (
    <FormContainerResponsive>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <FormGroupResponsive>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </FormGroupResponsive>
        <FormGroupResponsive>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {emailError && <div className="error-message">{emailError}</div>}
        </FormGroupResponsive>
        <FormGroupResponsive>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </FormGroupResponsive>
        <ButtonResponsive type="submit">Create</ButtonResponsive>
      </form>
    </FormContainerResponsive>
  );
};

export default CreateUser;
