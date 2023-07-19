import React from 'react'
import { render, screen } from '@testing-library/react'
import Button from './index'

test('renders learn react link', () => {
  render(<Button>i am button</Button>)
  const linkElement = screen.getByText(/i am button/i)
  expect(linkElement).toBeInTheDocument()
})
