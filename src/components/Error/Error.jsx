import React, { useState, useEffect } from 'react'
import { Alert, Snackbar } from '@mui/material'
import { func, string } from 'prop-types'

export default function Error({ error, onClose }) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={error && error.length !== 0}
      key={'bottom' + 'center'}
      autoHideDuration={3000}
      onClose={onClose}
    >
      <Alert
        open={error && error.length !== 0}
        autoHideDuration={3000}
        severity="error"
        onClose={onClose}
        sx={{ width: '100%', background: 'black' }}
      >
        {error}
      </Alert>
    </Snackbar>
  )
}

Error.propTypes = {
  error: string,
  onClose: func,
}
