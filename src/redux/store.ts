import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunkMiddleware from 'redux-thunk'

import { globalReducer, GlobalState } from './global/globalReducer'

export interface IRootState {
  global: GlobalState
}

const middlewares = [thunkMiddleware]

export const store = createStore<IRootState, any, any, any>(
  combineReducers({
    global: globalReducer,
  }),
  composeWithDevTools(applyMiddleware(...middlewares))
)
