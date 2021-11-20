import React from 'react'
import NavBar from './components/NavBar/NavBar'
import './App.css'
import { Content } from './components/Content/Content'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Content />
      </div>
    </BrowserRouter>
  )
}

export default App
