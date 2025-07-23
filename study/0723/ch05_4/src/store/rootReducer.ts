import {combineReducers} from 'redux'
import * as L from './listEntities'
import * as L0 from './listidOrders'
import * as LC from './listidCardidOrders'
import * as C from './cardEntities'

// todo
export const rootReducer = combineReducers({
  listEntities: L.reducer,
  listidOrders: L0.reducer,
  listidCardidOriders: LC.reducer,
  cardEntities: C.reducer
})
