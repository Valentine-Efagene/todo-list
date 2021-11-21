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

const Transfer = () => {
  const [error, setError] = useState()
  const dispatch = useDispatch()
  const [dapp, setDapp] = useState({
    web3: null,
    web3Provider: null,
    accounts: [],
    contracts: { MetaCoin: null },
    instances: { MetaCoin: null },
  })

  const [balance, setBalance] = useState()
  const [ether, setEther] = useState()
  const [target, setTarget] = useState()

  const onClose = () => {
    setError(null)
  }

  useEffect(() => {
    if (dapp.accounts?.[0]) {
      getBalance(dapp.accounts?.[0])
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
    _dapp.web3 = web3

    try {
      _dapp.accounts = await web3.eth.getAccounts()
      dispatch(setAccounts(_dapp.accounts))
    } catch (e) {
      setError(e.message)
      console.log(e.message)
    }

    //console.log(_dapp.instances.MetaCoin !== null ? 'Ok' : "Didn't get it!")
    setDapp(_dapp)
  }

  async function send(_target, _ether) {
    await dapp.web3.eth.sendTransaction({
      from: dapp.accounts?.[0],
      to: _target,
      value: dapp.web3?.utils.toWei(ether, 'ether'),
    })
    setEther(null)
    await getBalance()
  }

  const getBalance = async () => {
    const _balance = await dapp.web3?.eth?.getBalance(dapp.accounts?.[0])
    setBalance(dapp.web3.utils.fromWei(_balance), 'ether')
  }

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
            setEther(e.target.value)
          }}
          id="ether"
          label="ether"
          value={ether ? ether : ''}
        />
        <Button
          variant="contained"
          onClick={() => {
            send(target, ether)
          }}
        >
          Transfer
        </Button>
      </Box>
    </>
  )
}

export default Transfer

Transfer.propTypes = {}
