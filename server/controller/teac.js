// 连接数据库，并操作
var mysql = require('mysql')
var mysqlConfig = require('../config.js')
var teacSql = require('./teacSql.js')

var conn = mysql.createConnection(mysqlConfig)

module.exports = {
  // 添加用户
  add: function(req, res, next) {
    var body = req.body
    var teacId = body.id
    var username = body.username
    var password = body.password
    var email = body.email
    conn.query(teacSql.insert, [teacId, username, email, password], function (err, result) {
      console.log(result)
      if (result) {
        conn.query(teacSql.queryById, teacId, function (err, result_1) {
          result = {
            code: 200,
            msg: '用户存在',
            info: result_1[0]
          }
          res.json(result)
        })
      } else {
        result = {
          code: 500,
          msg: '注册失败'
        }
        res.json(result)
      }
    })
  },
  delete: function (req, res, next) {
    
  },
  updateInfo: function (req, res, next) {
    var body = req.body
    var teacId = body.id
    var username = body.username
    var password = body.password
    var email = body.email
    var age = body.age
    var sex = body.sex
    conn.query(teacSql.updateInfo, [username, email, age, sex, password, teacId], function (err, result) {
      console.log(result)
      if (result) {
        conn.query(teacSql.queryById, teacId, function (err, result_1) {
          result = {
            code: 200,
            msg: '更新信息成功',
            info: result_1[0]
          }
          res.json(result)
        })
      } else {
        result = {
          code: 500,
          msg: '更新信息失败'
        }
        res.json(result)
      }
    })
  },
  queryPasswordById: function (req, res, next) {
    var teacId = req.body.id
    var password = req.body.password
    conn.query(teacSql.queryPasswordById, teacId, function (err, result) {
      if (result && result[0].password == password) {
        conn.query(teacSql.queryById, teacId, function (err, result_1) {
          result = {
            code: 200,
            msg: '用户存在',
            info: result_1[0]
          }
          res.json(result)
        })
      } else {
        result = {
          code: 500,
          msg: '用户不存在'
        }
        res.json(result)
      }
    })
  }
}