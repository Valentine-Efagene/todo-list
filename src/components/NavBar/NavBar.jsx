import React, { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
//import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Web3 from 'web3'
import Error from '../Error/Error'
import TruffleContract from '@truffle/contract'

export default function NavBar() {
  const [data, setData] = useState({
    provider: null,
    accounts: [],
    contracts: { todoList: null },
  })

  const [error, setError] = useState()

  const onClose = () => {
    setError(null)
  }

  const init = async () => {
    let _data = {}
    const web3 = new Web3(Web3.givenProvider || 'ws://localhost:7545')
    const { eth } = web3

    const response = await fetch('./contracts/TodoList.json')
    const todoList = await response.json()

    try {
      _data.accounts = await eth.getAccounts()
    } catch (e) {
      setError(e.message)
      console.log(e.message)
    }

    var provider = new Web3.providers.HttpProvider('http://localhost:7545')
    _data.provider = provider

    //https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html
    /*const todoListContract = new web3.eth.Contract(todoList.abi)
    const s = todoListContract.deploy({ data: todoList.bytecode })
    console.log(s)*/

    const todoListContract = TruffleContract({
      todoList: abi,
      unlinked_binary: todoList.bytecode,
    })
    //todoListContract.setProvider(provider)
    //return
    //_data.todoList = await App.contracts.TodoList.deployed()
    //_data.contracts.TodoList = TruffleContract(abi)
    //_data.contracts.TodoList = TruffleContract(abi)

    //_data.contracts.todoList = setData(_data)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Error error={error} onClose={onClose} />

      {/* <Button
        onClick={() => {
          setError('Error')
        }}
      >
        Open simple snackbar
      </Button> */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dapp University | Todo List
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              display: { xs: 'none', md: 'block', xl: 'block' },
              flexGrow: 1,
            }}
          >
            {data.accounts?.[0]}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
