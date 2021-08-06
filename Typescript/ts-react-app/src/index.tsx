import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
//import Hello from './components/demo/hello';
//import HelloClass from "./components/demo/HelloClass"
//import HelloHoc from "./components/demo/HelloHoc"
//import HelloHooks from "./components/demo/HelloHooks"
//import App from "./components/App"
import Root from "./routers"
import {Provider} from "react-redux"
import store from "./redux/store"
ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <Root />
      </Provider>
      {/*<Hello name="TypeScript" firstName="1" lastName="2" ></Hello>
      <HelloClass name="helloClass"></HelloClass>
      <HelloHoc loading={true}></HelloHoc>
      <HelloHooks name="REACT HOOKS"></HelloHooks>*/}
    </React.StrictMode>,
  document.getElementById('root'));
  reportWebVitals();
  