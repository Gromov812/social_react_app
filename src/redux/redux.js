import { messageReducer } from './message-reducer';
import { wallReducer } from './wall-reducer';
import { usersReducer } from './users-reducer'
import { authReducer } from './auth-reducer';
import { applyMiddleware, createStore, configureStore, combineReducers } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
    wallReducer,
    messageReducer,
    usersReducer,
    authReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

