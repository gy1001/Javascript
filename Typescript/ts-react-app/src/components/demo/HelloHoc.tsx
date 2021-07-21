import React, {Component} from "react"
import HelloClass from "./HelloClass"

interface Loading {
  loading: boolean
}

function HelloHoc<P>(WrappedComponent:React.ComponentType<P>){
  return class extends Component<P & Loading>{
    render(){
      const {loading ,...props } =this.props 
      return loading ? <div>loading</div>: <WrappedComponent {...props as P}></WrappedComponent>
    }
  }
}
export default HelloHoc(HelloClass)