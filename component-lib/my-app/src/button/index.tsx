import React from 'react'
import type { ReactNode } from 'react'
import classNames from 'classnames'
import './index.css'

interface ButtonProps {
  className?: string
  type?: 'primary' | 'dangerous' | 'dashed' | 'text' | 'link'
  children?: ReactNode
  style?: React.CSSProperties
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  onBlur?: React.FocusEventHandler<HTMLButtonElement>
}

const Button = (props: ButtonProps) => {
  const { className, type, children, style, onClick, onBlur } = props
  const classObj = {
    'ant-btn': true,
    [`ant-btn-${type}`]: type,
  }
  if (className) {
    classObj[className] = true
  }
  const cls = classNames(classObj)
  return (
    <button className={cls} style={style} onClick={onClick} onBlur={onBlur}>
      {children}
    </button>
  )
}

export default Button
