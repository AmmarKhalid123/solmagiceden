import { combineReducers, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { AuthedUser } from './reducers/authedUser';


export const ConfigureStore = () => {
  
    const store = configureStore({
      reducer: {
        authedUser: AuthedUser
      },
      middleware: [thunk, logger]
    });
    return store;
}
