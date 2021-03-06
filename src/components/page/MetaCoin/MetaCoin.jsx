import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import Web3 from 'web3'
import Error from '../../Error/Error'
import { DataGrid, gridColumnsTotalWidthSelector } from '@mui/x-data-grid'
import { useDispatch } from 'react-redux'
import { setAccounts } from '../../../redux/slice/todoListSlice'
import TruffleContract from '@truffle/contract'

const MetaCoin = () => {
  const [error, setError] = useState()
  const dispatch = useDispatch()
  const [dapp, setDapp] = useState({
    web3Provider: null,
    accounts: [],
    contracts: { MetaCoin: null },
    instances: { MetaCoin: null },
  })

  const [balance, setBalance] = useState()
  const [token, setToken] = useState()
  const [target, setTarget] = useState()

  const onClose = () => {
    setError(null)
  }

  useEffect(() => {
    if (dapp.accounts?.[0]) {
      getBalance(dapp.accounts[0])
    }
  }, [dapp])

  const init = async () => {
    await setUp()
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

    const response = await fetch('./contracts/MetaCoin.json')
    const metaCoin = await response.json()

    try {
      _dapp.accounts = await web3.eth.getAccounts()
      dispatch(setAccounts(_dapp.accounts))
    } catch (e) {
      setError(e.message)
      console.log(e.message)
    }

    _dapp.contracts.MetaCoin = TruffleContract(metaCoin)
    _dapp.contracts?.MetaCoin.setProvider(_dapp.web3Provider)

    _dapp.instances.MetaCoin = await _dapp.contracts.MetaCoin.deployed()
    //console.log(_dapp.instances.MetaCoin !== null ? 'Ok' : "Didn't get it!")
    setDapp(_dapp)
  }

  async function sendCoin(_target, _token) {
    console.log(dapp.accounts?.[0], _target)
    await dapp.instances.MetaCoin.sendCoin(_target, _token, {
      from: dapp.accounts?.[0],
    })
    setToken(null)
    await getBalance()
  }

  const getBalance = async () => {
    const _balance = await dapp.instances.MetaCoin.getBalance.call(
      dapp.accounts?.[0]
    )
    //console.log(_balance)
    setBalance(_balance?.toNumber())
  }

  const getBalanceInEther = async () => {
    const _balance = await dapp.instances.MetaCoin.getBalanceInEth.call(
      dapp.accounts?.[0]
    )
    console.log(_balance)
    setBalance(_balance?.toNumber())
  }

  /*const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'content', headerName: 'Content', width: 130 },
  ]*/

  return (
    <>
      <Error error={error} onClose={onClose} />
      <Box
        component="form"
        alignItems="center"
        justifyContent="center"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          display: 'flex',
        }}
        noValidate
        autoComplete="off"
      >
        {balance}
        <TextField
          onChange={(e) => {
            setTarget(e.target.value)
            console.log(e.target.value)
          }}
          id="target"
          label="target"
          value={target ? target : ''}
        />
        <TextField
          onChange={(e) => {
            setToken(e.target.value)
          }}
          id="token"
          label="token"
          value={token ? token : ''}
        />
        <Button
          variant="contained"
          onClick={() => {
            sendCoin(target, token)
          }}
        >
          Transfer
        </Button>
      </Box>
    </>
  )
}

export default MetaCoin

MetaCoin.propTypes = {}
