import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Button from './index'

describe('Button', () => {
  test('renders learn react link', () => {
    render(<Button>i am button</Button>)
    const linkElement = screen.getByText(/i am button/i)
    expect(linkElement).toBeInTheDocument()
  })

  test('renders primary button', () => {
    const { container } = render(<Button type='primary'>click me</Button>)
    const linkElement = screen.getByText(/click me/i)
    expect(linkElement).toBeInTheDocument()
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('.ant-btn-primary')).toBeInTheDocument()
    // expect(container.firstChild).toHaveClass('')
  })

  test('normal  button', () => {
    const { container } = render(<Button>click me</Button>)
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('.ant-btn')).toBeInTheDocument()
  })

  test('support click', () => {
    const onClick = jest.fn()
    const { container } = render(<Button onClick={onClick}>click me</Button>)
    const linkElement = screen.getByText(/click me/i)
    fireEvent.click(linkElement)
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(onClick).toBeCalled()
  })

  test('support blur', () => {
    const onBlur = jest.fn()
    const onClick = jest.fn()
    render(
      <Button onBlur={onBlur} onClick={onClick}>
        click me
      </Button>,
    )
    const linkElement = screen.getByText(/click me/i)
    fireEvent.click(linkElement)
    fireEvent.blur(linkElement)
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(onBlur).toBeCalled()
  })
})
