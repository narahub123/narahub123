import * as T from './types'

// todo
export const setListidOrders = (payload: T.State): T.SetListidOrders => {
  return {
    type: '@listidOrders/set',
    payload
  }
}

export const addListidToOrders = (payload: T.UUID): T.AddListidToOrders => {
  console.log(payload)

  return {
    type: '@listidOrders/add',
    payload
  }
}

export const removeListidFromOrders = (payload: T.UUID): T.RemoveListidFromOrders => {
  return {
    type: '@listidOrders/remove',
    payload
  }
}
