import React from "react"
import { Button } from "antd"

interface Greeting{
  name: string,
  firstName: string,
  lastName: string
}
const Hello = (props:Greeting) =>(<Button type="primary">hello {props.name}</Button>)
//const Hello:React.FC<Greeting> = ({name,firstName,lastName,children}) =>(
//  <Button type="primary">hello {name}{firstName}{lastName}{children}</Button>
//)

//Hello.defaultProps = {
//  firstName:'',
//  lastName: ""
//}

export default Hello