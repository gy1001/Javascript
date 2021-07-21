import {Button} from "antd"
import React,{ useState, useEffect } from "react"
interface Greeting {
  name: string,
  firstName?: string,
  lastName?: string
}

const HelloHooks = (props:Greeting) => {
  const [count, setCount] = useState(0)
  const [text, setText] = useState<string|null>(null)
  useEffect(() => {
    if(count >= 5){
      setText("休息一下")
    }
  },[count])
  return (
    <>
      <p>你点击了{count}{text}次</p>
      <Button onClick={()=>{setCount(count+1)}}>Hello {props.name}</Button>
    </>
  )
}

export default HelloHooks