import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
//import logo from './logo.svg'
import './App.css'
import NavBar from './components/NavBar/NavBar'

function App() {
  const [dapp, setDapp] = useState({
    web3Provider: null,
    accounts: [],
    contracts: { TodoList: null },
  })

  const [taskCount, setTaskCount] = useState()

  const init = async () => {
    let _dapp = {
      web3Provider: null,
      accounts: [],
      contracts: { TodoList: null },
    }

    // Modern dapp browsers...
    if (window.ethereum) {
      console.log('has ethereum')
      _dapp.web3Provider = window.ethereum
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' })
      } catch (error) {
        // User denied account access...
        console.log('User denied account access')
        console.error('User denied account access')
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      console.log('has web3')
      _dapp.web3Provider = window.web3.currentProvider
    }

    // If no injected web3 instance is detected, fall back to Ganache
    else {
      _dapp.web3Provider = new Web3.providers.HttpProvider(
        'http://localhost:7545'
      )
      console.log('Fell back')
    }

    const web3 = new Web3(_dapp.web3Provider)

    const response = await fetch('./contracts/TodoList.json')
    const todoList = await response.json()
    //console.log(todoList)

    try {
      _dapp.accounts = await web3.eth.getAccounts()
      console.log(_dapp.accounts?.[0])
    } catch (e) {
      setError(e.message)
      console.log(e.message)
    }

    _dapp.contracts.TodoList = TruffleContract(todoList)
    console.log(_dapp.contracts.TodoList)
    _dapp.contracts.TodoList.setProvider(_dapp.web3Provider)

    setDapp(_dapp)
    await getTaskCount()
    //https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html
    /*const todoListContract = new web3.eth.Contract(todoList.abi)
    const s = todoListContract.deploy({ data: todoList.bytecode })
    console.log(s)*/
  }

  useEffect(() => {
    init()
  }, [])

  /**
   *
   * @param {string} task
   */
  async function handleCreateTask(task) {
    var todoListInstance = await dapp.contracts.TodoList.deployed()
    await todoListInstance.createTask(task, { from: dapp.accounts[0] })
  }

  const getTaskCount = async () => {
    console.log('got here')
    return
    var todoListInstance = await dapp.contracts.TodoList.deployed()
    const _taskCount = await todoListInstance.taskCount.call()
    setTaskCount(_taskCount)
  }

  return (
    <div className="App">
      <NavBar address={dapp.accounts?.[0]} />
      {taskCount}
    </div>
  )
}

export default App
