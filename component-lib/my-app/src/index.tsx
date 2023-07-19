import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Button from './button'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Button className='my-btn' type='primary'>
      Click Me
    </Button>
    <Button className='my-btn' type='dangerous'>
      Click Me
    </Button>
  </React.StrictMode>,
)
