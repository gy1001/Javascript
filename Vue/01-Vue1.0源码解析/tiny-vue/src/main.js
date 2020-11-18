// 把index.html的文字颜色改为红色
import './assets/main.css'
const { text } = require("./home");
const home_text = require("./home")
const text_p = document.getElementById('text-p');
text_p.innerHTML = home_text.text