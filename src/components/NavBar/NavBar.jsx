import React, { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
//import Button from '@mui/material/Button'
import './NavBar.css'
import Link from '@mui/material/Link'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { string } from 'prop-types'
import { useSelector } from 'react-redux'
import { BrowserRouter, Link as RouterLink } from 'react-router-dom'
import styles from './NavBar.style'

// https://stackoverflow.com/a/54519524/6132438

export default function NavBar() {
  const { todoList } = useSelector((state) => state.todoList)
  const accounts = todoList?.accounts

  const { link } = styles

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
            <Link sx={link} component={RouterLink} to="/">
              TodoList
            </Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link sx={link} component={RouterLink} to="/metacoin">
              Meta Coin
            </Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link sx={link} component={RouterLink} to="/transfer">
              Transfer
            </Link>
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
            {accounts?.[0]}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

NavBar.propTypes = {
  address: string,
}
