import css from './style/index.less';
import pic from './images/logo.png';
import axios from 'axios';

axios.get('/api/info').then((res) => {
  console.log(res);
});
