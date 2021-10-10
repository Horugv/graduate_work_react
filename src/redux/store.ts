import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunkMiddleware from 'redux-thunk'

import { globalReducer, GlobalState } from './global/globalReducer'
import { modalsReducer, ModalsState } from './modals/modalsReducer'

export interface IRootState {
  global: GlobalState
  modals: ModalsState
}

const middlewares = [thunkMiddleware]

export const store = createStore<IRootState, any, any, any>(
  combineReducers({
    global: globalReducer,
    modals: modalsReducer,
  }),
  composeWithDevTools(applyMiddleware(...middlewares))
)
