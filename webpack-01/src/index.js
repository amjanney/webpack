const json = require('./index.json') //commonJS
import { add } from './other.js' //es module
import './index.less'
console.log(json, add(2, 3))
