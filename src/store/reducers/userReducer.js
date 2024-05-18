// userReducer.js

import { ADD_USER } from '../actions/actions';

const initialState = {
  users: [], // Initial state with an empty array of users
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload], // Add the new user to the existing array of users
      };
    default:
      return state;
  }
};

export default userReducer;
