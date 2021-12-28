const Koa = require('koa');
const axios = require('axios');
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
  console.log(res)
  ctx.body = res.data
})

router.post("/user/user/find", async (ctx) => {
  // ctx.type = 'json';

  let res = await axios.post(url + '/user/user/find', {
    "token": ""
  }, { headers })
  console.log(res)
  ctx.body = res.data
})


router.post("/webapi/learn/addlearnlog", async (ctx) => {
  let res1 = await axios.post(url + '/webapi/learn/getnowlearn', {
    "token": ""
  }, { headers })
  let now = res1.data.id

  let res2 = await axios.post(url + '/webapi/learn/addlearnlog', {
    "token": "",
    "lid": now
  }, { headers })
  console.log(res2)
  ctx.body = res2.data
})

// 装载所有路由
app.use(router.routes()).use(router.allowedMethods());

app.use(serve('../static'));

app.listen(3000, () => { console.log("Koa is running") });