import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserList from './Components/UserList';
import EditUser from './Components/EditUser';
import CreateUser from './Components/CreateUser';
import UserDetails from './Components/UserDetails';

import './styles.css';

function App() {
  // Initialize existingUsers as an array of objects directly
  const existingUsers = [
    { id: 1, username: 'user1', email: 'user1@example.com', role: 'user' },
    { id: 2, username: 'user2', email: 'user2@example.com', role: 'user' },
    { id: 3, username: 'user1', email: 'user1@example.com', role: 'user' },
    { id: 4, username: 'user2', email: 'user2@example.com', role: 'user' },
    { id: 5, username: 'user1', email: 'user1@example.com', role: 'user' },
    { id: 6, username: 'user2', email: 'user2@example.com', role: 'user' },
    { id: 7, username: 'user1', email: 'user1@example.com', role: 'user' },
    { id: 8, username: 'user2', email: 'user2@example.com', role: 'user' },
    { id: 9, username: 'user1', email: 'user1@example.com', role: 'user' },
    { id: 10, username: 'user2', email: 'user2@example.com', role: 'user' },
    { id: 11, username: 'user1', email: 'user1@example.com', role: 'user' },
    { id: 12, username: 'user2', email: 'user2@example.com', role: 'user' },
    { id: 13, username: 'user1', email: 'user1@example.com', role: 'user' },
    { id: 14, username: 'user2', email: 'user2@example.com', role: 'user' },
  ];

  // Initialize users state with existing users
  const [users, setUsers] = useState(existingUsers);
  const newUser = useSelector(state => state.userReducer.users);

  // Function to generate a unique id for a new user
  const generateId = () => {
    // Find the maximum id currently in the users array
    const maxId = Math.max(...users.map(user => user.id));
    // Increment the maximum id by 1 to get a new unique id
    return maxId + 1;
  };

  // Update the users state when a new user is received
  useEffect(() => {
    if (newUser.length >= 1) {
      newUser.forEach(user => {
        // Generate a unique id for the new user
        const id = generateId();
        // Add the id to the user object
        const userWithId = { ...user, id };
        // Add the new user to the users array
        setUsers(prevUsers => [...prevUsers, userWithId]);
      });
    }
    // eslint-disable-next-line
  }, [newUser]);

  // Function to delete a user from the user list
  const deleteUser = (id) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
  };

  // Function to update user data
  const updateUser = (updatedUser) => {
    setUsers(prevUsers => prevUsers.map(user => {
      if (user.id === updatedUser.id) {
        return {
          ...user,
          username: updatedUser.username,
          email: updatedUser.email,
          role: updatedUser.role
        };
      }
      return user;
    }));
  };

  const UserDetailsWrapper = ({ users }) => {
    const { userId } = useParams();
    const user = users.find(user => user.id === parseInt(userId));
    return <UserDetails user={user} userRole={userRole} />;
  };

  const userRole = 'admin'; // or 'user'

  return (
    <Router>
      <div className="container">
        {/* Conditionally render left side panel */}
        <nav className="left-panel">
          <ul>
            <li><Link to="/">User List</Link></li>
            <li><Link to="/create-user">Create User</Link></li>
          </ul>
        </nav>

        {/* Conditionally render routes based on user role */}
        <Routes>
          {userRole === 'admin' && (
            <>
              <Route exact path="/" element={<UserList users={users} userRole={userRole} onDeleteUser={deleteUser} />} />
              <Route path="/user/:userId/edit" element={<EditUser users={users} userRole={userRole} onUpdateUser={updateUser} />} />
            </>
          )}
          {userRole !== 'admin' && <Route path="/" element={<UserList users={users} userRole={userRole} />} />}
          <Route path="/user/:userId" element={<UserDetailsWrapper users={users} />} />
          {userRole === 'admin' && <Route path="/create-user" element={<CreateUser />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
