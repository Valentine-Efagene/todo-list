import React from 'react'
import { mount } from '@cypress/react'
import App from './App'

it('is visible', () => {
  mount(<App />)
})
