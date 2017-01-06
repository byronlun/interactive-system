// 连接数据库，并操作
var mysql = require('mysql')
var mysqlConfig = require('../config.js')
var stuHWSql = require('./stuHWSql.js')

var conn = mysql.createConnection(mysqlConfig)

module.exports = {
  getAllHW: function (req, res, next) {
    var id = req.body.id
    conn.query(stuHWSql.queryById, id, function(err, result) {
      console.log(result)
      if (result) {
        result = {
          code: 200,
          msg: '获取作业成功',
          info: result
        }
        res.json(result)
      } else {
        result = {
          code: 500,
          msg: '获取作业失败'
        }
        res.json(result)
      }
      
    })
  },
  getUploadedHW: function (req, res, next) {
    var id = req.body.id
    conn.query(stuHWSql.queryUploadedById, id, function(err, result) {
      console.log(result)
      if (result) {
        result = {
          code: 200,
          msg: '获取作业成功',
          info: result
        }
        res.json(result)
      } else {
        result = {
          code: 500,
          msg: '获取作业失败'
        }
        res.json(result)
      }
      
    })
  },
  getNoUploadHW: function (req, res, next) {
    var id = req.body.id
    conn.query(stuHWSql.queryNoUploadById, id, function(err, result) {
      console.log(result)
      if (result) {
        result = {
          code: 200,
          msg: '获取作业成功',
          info: result
        }
      } else {
        result = {
          code: 500,
          msg: '获取作业失败'
        }
      }
      res.json(result)
    })
  },
  submitHW: function(req, res, next) {
    // 处理上传作业，路径到数据库
    var path = req.body.hwPath
    var id = req.body.id
    var title = req.body.title
    var uploadTime = req.body.uploadTime
    conn.query(stuHWSql.updatePath, [path, uploadTime, id, title], function(err, result) {
      console.log(result)
      if (result) {
        result = {
          code: 200,
          msg: '提交作业成功'
        }
      } else {
        result = {
          code: 500,
          msg: '提交作业失败'
        }
      }
      res.json(result)
    })
  }
}