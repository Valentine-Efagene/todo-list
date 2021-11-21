import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MetaCoin from '../page/MetaCoin/MetaCoin'
import TodoList from '../page/TodoList/TodoList'
import Transfer from '../page/Transfer/Transfer'

// https://reactrouter.com/docs/en/v6/getting-started/overview

export const Content = () => {
  return (
    <Routes>
      <Route path="/" element={<TodoList />} exact />
      <Route path="/metacoin" element={<MetaCoin />} />
      <Route path="/transfer" element={<Transfer />} />
    </Routes>
  )
}
