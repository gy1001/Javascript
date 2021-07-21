import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './components/demo/hello';
import reportWebVitals from './reportWebVitals';
import HelloClass from "./components/demo/HelloClass"
ReactDOM.render(
  <React.StrictMode>
    <Hello name="TypeScript" firstName="1" lastName="2" ></Hello>
    <HelloClass name="helloClass"></HelloClass>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
