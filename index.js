/**
 * 入口文件
 */
const koa = require('koa')     // node框架
const path = require('path')     // 路径模块
const bodyParser = require('koa-bodyparser')     // 表单解析中间件
const ejs = require('ejs')      // 模板引擎
const session = require('koa-session-minimal')      // session中间件
const MysqlStore = require('koa-mysql-session')      // 处理数据库的中间件
const config = require('./config/default.js')
const router = require('koa-router')
const views = require('koa-views')
const staticCache = require('koa-static-cache')

// 创建koa实例对象
const app = new koa()

// session(数据库)存储配置
const sessionMysqlConfig = {
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  host: config.database.HOST
}

// session中间件配置
app.use(session({
  key: 'USER_SID',
  store: new MysqlStore(sessionMysqlConfig)
}))

// 缓存配置
app.use(staticCache(
  path.join(__dirname, './public'), 
  { dynamic: true }, 
  { maxAge: 365 * 24 * 60 * 60 }
))
app.use(staticCache(
  path.join(__dirname, './public/images'), 
  { dynamic: true }, 
  { maxAge: 365 * 24 * 60 * 60 }
))

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))
app.use(bodyParser({
  formLimit: '1mb'
}))

// 路由文件
app.use(require('./routers/signup.js').routes())

// 监听端口
app.listen(7777)
console.log(`Listening on port ${config.prot}`)
