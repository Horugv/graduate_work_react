import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunkMiddleware from 'redux-thunk'

import { globalReducer, GlobalState } from './global/globalReducer'
import { modalsReducer, ModalsState } from './modals/modalsReducer'
import { tokenReducer, TokenState } from './token/tokenReducer'
import {
  mapMarkersReducer,
  MapMarkersState,
} from './mapMarkers/mapMarkerReducer'

export interface IRootState {
  global: GlobalState
  modals: ModalsState
  token: TokenState
  mapMarker: MapMarkersState
}

const middlewares = [thunkMiddleware]

export const store = createStore<IRootState, any, any, any>(
  combineReducers({
    global: globalReducer,
    modals: modalsReducer,
    token: tokenReducer,
    mapMarker: mapMarkersReducer,
  }),
  composeWithDevTools(applyMiddleware(...middlewares))
)
