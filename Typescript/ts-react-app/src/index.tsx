import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './components/demo/hello';
import reportWebVitals from './reportWebVitals';
import HelloClass from "./components/demo/HelloClass"
import HelloHoc from "./components/demo/HelloHoc"
import HelloHooks from "./components/demo/HelloHooks"
ReactDOM.render(
  <React.StrictMode>
    <Hello name="TypeScript" firstName="1" lastName="2" ></Hello>
    <HelloClass name="helloClass"></HelloClass>
    <HelloHoc loading={true}></HelloHoc>
    <HelloHooks name="REACT HOOKS"></HelloHooks>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
