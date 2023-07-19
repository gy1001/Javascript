import React from 'react'

const Button = (props: any) => {
  const { className, children } = props
  return <button className={className}>{children}</button>
}

export default Button
