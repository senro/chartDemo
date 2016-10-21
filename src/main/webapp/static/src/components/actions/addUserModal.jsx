import * as types from 'components/constants/ActionTypes'

export function addUser(json) {
  return { type: types.ADD_TODO, json }
}

