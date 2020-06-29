import css from './style/index.less';
// import pic from './images/logo.png';
// import axios from 'axios';

// axios.get('/api/info').then((res) => {
//   console.log(res);
// });

var btn = document.createElement('button');
btn.innerHTML = '新增';
document.body.appendChild(btn);
btn.onclick = function () {
  var div = document.createElement('div');
  div.innerHTML = 'item';
  document.body.appendChild(div);
};
