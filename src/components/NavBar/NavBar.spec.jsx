import React from 'react'
import { mount } from '@cypress/react'
import NavBar from './NavBar'

it('should display', () => {
  mount(<NavBar />)
  cy.contains('Dapp University | Todo List')
})
