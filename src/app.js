const Koa = require('koa');
const fs = require('fs')
const axios = require('axios');
const shelljs = require('shelljs')
const serve = require('koa-static')
const Router = require('koa-router')


const app = new Koa();
const router = new Router();

axios.defaults.withCredentials = true; //配置为true

const headers = {
  "Connection": "keep-alive",
  "Accept": "application/json, text/plain, */*",
  "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x6304051b)",
  "Content-Type": "application/x-www-form-urlencoded",
  "Origin": "http://websecond.lngqt.shechem.cn",
  "X-Requested-With": "com.tencent.mm",
  "Referer": "http://websecond.lngqt.shechem.cn/",
  "Accept-Encoding": "gzip, deflate",
  "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
  "Cookie": "BDed_HeaderKey=X2xQAy1bWnsNayB9Yn5VR3xJCF5%2FW3N%2FNBR5CWhvXRNXUFw%3D"
}

const url = 'http://api.lngqt.shechem.cn'

// 设置请求路由
router.post("/webapi/learn/learnlog", async (ctx) => {
  // ctx.type = 'json';

  let res = await axios.post(url + '/webapi/learn/learnlog', {
    'page[page]': 1
  }, { headers })
  // console.log(res)
  ctx.body = res.data
})

router.post("/user/user/find", async (ctx) => {
  // ctx.type = 'json';

  let res = await axios.post(url + '/user/user/find', {
    "token": ""
  }, { headers })
  // console.log(res)
  ctx.body = res.data
})


router.get("/webapi/learn/addlearnlog", async (ctx) => {
  let { data } = await axios.post(url + '/webapi/learn/getnowlearn', {
    "token": ""
  }, { headers })
  let now = data.data.id
  let res2 = await axios.post(url + '/webapi/learn/addlearnlog', {
    "token": "",
    "lid": now
  }, { headers })
  // console.log(res2)
  ctx.body = {
    result: 0,
    data: {
      id: now
    }
  }
})

router.get("/webapi/learn/show", async (ctx) => {

  shelljs.exec(`termux-notification -i 7 -t '青年大学习' -c '最新一期' --button1 '按钮'`)
  shelljs.exec(`mv /sdcard/Pictures/pic.png /data/data/com.termux/files/home/big-study/static/img/pic.png`)


  let data = fs.readFileSync(__dirname + '/../static/img/pic.png');
  data = Buffer.from(data).toString('base64');
  ctx.body = {
    img: data,
    log: "通知已显示"
  }
})



// 装载所有路由
app.use(router.routes()).use(router.allowedMethods());

app.use(serve(__dirname + '/../static'));

app.listen(3000, () => { console.log("Koa is running") });