// Inside actions.js or actions.js

// Action Types
export const ADD_USER = 'ADD_USER';

// Action Creators
export const addUser = (userData) => ({
  type: ADD_USER,
  payload: userData,
});
