import React, { createContext, useReducer, useContext } from 'react';

// Define the initial state
const initialState = {
  user: null,
};

// Define actions
const SET_USER = 'SET_USER';
const CLEAR_USER = 'CLEAR_USER';

// Reducer function to update state based on actions
const userReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case CLEAR_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

// Create context and provider
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const setUser = (userData) => {
    dispatch({ type: SET_USER, payload: userData });
  };

  const clearUser = () => {
    dispatch({ type: CLEAR_USER });
  };

  return (
    <UserContext.Provider value={{ user: state.user, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
