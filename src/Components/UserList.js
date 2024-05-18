import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  overflow-x: auto; /* Enable horizontal scrolling on small screens */
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 28px;

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  @media screen and (max-width: 768px) {
    font-size: 16px; /* Decrease font size for smaller screens */
  }
`;

const Pagination = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;

  button {
    font-size: 28px;
    padding: 8px 12px;
    margin: 0 5px;
  }

  @media screen and (max-width: 768px) {
    button {
      font-size: 16px; /* Decrease font size for smaller screens */
    }
  }
`;

const UserList = ({ users, onDeleteUser, userRole }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      onDeleteUser(id);
    }
  };

  return (
    <Container>
      <h2>User List</h2>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>

            <th>{userRole === 'admin' && <span>Action</span>}</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user?.id}>
              <td>{user?.id}</td>
              <td><Link to={`/user/${user?.id}`}>{user?.username}</Link></td>
              <td>{user?.email}</td>
              <td>{user?.role}</td>
              <td>
                {userRole === 'admin' && (
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)}>
            {i + 1}
          </button>
        ))}
      </Pagination>
    </Container>
  );
};

export default UserList;
