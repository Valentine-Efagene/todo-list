import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { SUCCEEDED, FAILED, IDLE, LOADING } from '../../model/loadingState'

const todoListSlice = createSlice({
  name: 'todoList',
  initialState: {
    todoList: {
      web3Provider: null,
      accounts: [],
      contracts: { TodoList: null },
      instances: { TodoList: null },
    },
    status: IDLE,
    error: null,
  },
  reducers: {
    setAccounts(state, action) {
      state.todoList.accounts = action.payload
    },
  },
})

export const { setAccounts } = todoListSlice.actions
export default todoListSlice.reducer
