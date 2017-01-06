var express = require('express')
var app = express()
var path = require('path')
var bodyParser = require('body-parser')
var router = require('./server/route')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'))

// 页面路由请求处理
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/login.html'))
})

app.get('/login.html', function(req, res) {
  res.sendFile(path.join(__dirname + '/login.html'))
})

app.get('/index.html', function(req, res) {
  console.log('index')
  res.sendFile(path.join(__dirname + '/index.html'))
})

// 其他业务的路由处理
app.use(router)

app.listen(8008, '127.0.0.1', function () {
  console.log('在浏览器上访问127.0.0.1:8008')
})