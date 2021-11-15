import React, { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
//import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Web3 from 'web3'

export default function NavBar() {
  const [data, setData] = useState({
    provider: null,
    accounts: [],
  })

  const init = async () => {
    const web3 = new Web3(Web3.givenProvider || 'ws://localhost:7545')
    const { eth } = web3
    let _data = {}
    _data.provider = eth.currentProvider

    try {
      _data.accounts = await eth.getAccounts()
    } catch (e) {
      console.log(e)
    }

    setData(_data)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <Box sx={{ flexGrow: 1 }}>
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
            {data.accounts[0]}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
