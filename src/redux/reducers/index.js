import { combineReducers } from 'redux'

import todoListReducer from '../slice/todoListSlice'

export default combineReducers({
  todoList: todoListReducer,
})
