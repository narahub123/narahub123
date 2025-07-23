import {Action} from 'redux'
import type {UUID} from '../commonTypes'
export * from '../commonTypes'

// state 작성
export type State = UUID[]

// 액션 타입 설정
export type SetListidOrders = Action<'@listidOrders/set'> & {
  payload: State
}

export type AddListidToOrders = Action<'@listidOrders/add'> & {
  payload: UUID
}

export type RemoveListidFromOrders = Action<'@listidOrders/remove'> & {
  payload: UUID
}

export type Actions = SetListidOrders | AddListidToOrders | RemoveListidFromOrders
