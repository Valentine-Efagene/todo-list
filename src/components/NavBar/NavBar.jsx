import React, { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
//import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Error from '../Error/Error'
import { string } from 'prop-types'
import TruffleContract from '@truffle/contract'

export default function NavBar({ address }) {
  const [error, setError] = useState()

  const onClose = () => {
    setError(null)
  }

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
            {address}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

NavBar.propTypes = {
  address: string,
}
