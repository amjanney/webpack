import '@babel/polyfill';
import './style/index.less';
// import pic from './images/logo.png';
// import axios from 'axios';

// mock
// axios.get('/api/info').then((res) => {
//   console.log(res);
// });

// css HMR
// var btn = document.createElement('button');
// btn.innerHTML = '新增';
// document.body.appendChild(btn);
// btn.onclick = function () {
//   var div = document.createElement('div');
//   div.innerHTML = 'item';
//   document.body.appendChild(div);
// };

// js HMR
// import counter from './counter';
// import number from './number';

// counter();
// number();

// if (module.hot) {
//   module.hot.accept('./number', function () {
//     document.body.removeChild(document.getElementById('number'));
//     number();
//   });
// }

// es6+

// const arr = [new Promise(() => {}), new Promise(() => {})];
// arr.map((item) => {
//   console.log(item);
// });

import React, { Component } from 'react';
import ReactDom from 'react-dom';

class App extends Component {
  render() {
    return <div className='logo'></div>;
  }
}
ReactDom.render(<App />, document.getElementById('app'));
