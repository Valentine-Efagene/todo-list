import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import Web3 from 'web3'
import Error from '../../Error/Error'
import { DataGrid } from '@mui/x-data-grid'
import { useDispatch } from 'react-redux'
import { setAccounts } from '../../../redux/slice/todoListSlice'
import TruffleContract from '@truffle/contract'

const TodoList = () => {
  const [error, setError] = useState()
  const dispatch = useDispatch()
  const [dapp, setDapp] = useState({
    web3Provider: null,
    accounts: [],
    contracts: { TodoList: null },
    instances: { TodoList: null },
  })

  const [taskCount, setTaskCount] = useState()
  const [taskContent, setTaskContent] = useState()
  const [tasks, setTasks] = useState([])

  const onClose = () => {
    setError(null)
  }

  useEffect(() => {
    // This is because the the getTask function depends on the number of tasks,
    // and for some currently unknown reason, task count isn't set sometimes
    // before getTasks is called, even when they come after each other in
    // awaits, or then structure
    getTasks()
  }, [taskCount])

  const init = async () => {
    await setUp()
    await getTaskCount()
  }

  useEffect(() => {
    init()
  }, [])

  async function setUp() {
    let _dapp = Object.assign({}, dapp)
    // Modern dapp browsers...
    if (window.ethereum) {
      //console.log('has ethereum')
      _dapp.web3Provider = window.ethereum
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' })
      } catch (error) {
        // User denied account access...
        console.error('User denied account access')
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      //console.log('has web3')
      _dapp.web3Provider = window.web3.currentProvider
    }

    // If no injected web3 instance is detected, fall back to Ganache
    else {
      _dapp.web3Provider = new Web3.providers.HttpProvider(
        'http://localhost:7545'
      )
      //console.log('Fell back')
    }

    const web3 = new Web3(_dapp.web3Provider)

    const response = await fetch('./contracts/TodoList.json')
    const todoList = await response.json()

    try {
      _dapp.accounts = await web3.eth.getAccounts()
      dispatch(setAccounts(_dapp.accounts))
    } catch (e) {
      setError(e.message)
      console.log(e.message)
    }

    _dapp.contracts.TodoList = TruffleContract(todoList)
    _dapp.contracts?.TodoList.setProvider(_dapp.web3Provider)

    _dapp.instances.TodoList = await _dapp.contracts.TodoList.deployed()
    setDapp(_dapp)
  }

  async function handleCreateTask() {
    await dapp.instances.TodoList.createTask(taskContent, {
      from: dapp.accounts[0],
    })
    setTaskContent(null)
    await getTaskCount()
  }

  const getTaskCount = async () => {
    const _taskCount = await dapp.instances.TodoList.taskCount.call()
    setTaskCount(_taskCount?.words?.[0])
  }

  const getTasks = async () => {
    let _tasks = []

    for (let i = 1; i <= taskCount; i++) {
      try {
        const _task = await dapp.instances.TodoList.tasks.call(i)
        _tasks.push({ id: _task?.id?.words?.[0], content: _task.content })
      } catch (e) {
        console.log(err)
      }
    }

    setTasks(_tasks)
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'content', headerName: 'Content', width: 130 },
  ]

  return (
    <>
      <Error error={error} onClose={onClose} />
      <Box
        component="form"
        alignItems="center"
        justifyContent="center"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        {taskCount}
        <TextField
          onChange={(e) => {
            setTaskContent(e.target.value)
          }}
          id="task"
          label="Task"
          value={taskContent ? taskContent : ''}
        />
        <Button variant="contained" onClick={handleCreateTask}>
          Add
        </Button>
      </Box>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          sortModel={[{ field: 'id', sort: 'desc' }]}
          rows={tasks}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          //checkboxSelection
        />
      </div>
    </>
  )
}

export default TodoList

TodoList.propTypes = {}
