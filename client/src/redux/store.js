import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';
import AuthMiddleware from './middlewares/authMiddleware';
import thunk from 'redux-thunk';

// const middlewares = [thunk, AuthMiddleware]
const middlewares = [thunk]

if (process.env.NODE_ENV === 'development') {
	middlewares.push(logger)
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));