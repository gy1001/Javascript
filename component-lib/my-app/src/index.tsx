import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Button from './button'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Button className='my-btn'>Click Me</Button>
  </React.StrictMode>,
)
