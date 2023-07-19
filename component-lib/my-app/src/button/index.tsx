import React from 'react'
import type { ReactNode } from 'react'
import classNames from 'classnames'
import './index.css'

interface ButtonProps {
  className?: string
  type?: 'primary' | 'dangerous'
  children?: ReactNode
}

const Button = (props: ButtonProps) => {
  const { className, type, children } = props
  const classObj = {
    'ant-btn': true,
    [`ant-btn-${type}`]: type,
  }
  if (className) {
    classObj[className] = true
  }
  const cls = classNames(classObj)
  return <button className={cls}>{children}</button>
}

export default Button
