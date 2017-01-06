// 连接数据库，并操作
var mysql = require('mysql')
var mysqlConfig = require('../config.js')
var topicSql = require('./topicSql.js')

var conn = mysql.createConnection(mysqlConfig)

module.exports = {
  add: function (req, res, next) {
    var body = req.body
    var id = body.id
    var title = body.topicTitle
    var content = body.topicContent
    var startTime = body.datetime
    conn.query(topicSql.insert, [title, content, startTime, id], function(err, result) {
      console.log(result)
      if (result) {
        result = {
          code: 200,
          msg: '发表话题成功'
        }
      } else {
        result = {
          code: 500,
          msg: '发表话题失败'
        }
      }
      res.json(result)
    })
  },
  delete: function (req, res, next) {
    var id = req.body.id
    console.log(id)
    conn.query(topicSql.delete, id, function(err, result) {
      console.log(result)
      if (result) {
        result = {
          code: 200,
          msg: '删除话题成功'
        }
      } else {
        result = {
          code: 500,
          msg: '删除话题失败'
        }
      }
      res.json(result)
    })
  },
  getAll: function (req, res, next) {
    var body = req.body
    var id = body.id
    var count = body.count
    conn.query(topicSql.queryAll, count, function(err, result) {
      if (result) {
        result = {
          code: 200,
          msg: '获取话题成功',
          info: result
        }
      } else {
        result = {
          code: 500,
          msg: '获取话题失败'
        }
      }
      res.json(result)
    })
  },
  getContent: function (req, res, next) {
    var body = req.body
    var id = body.id
    conn.query(topicSql.queryContent, id, function(err, result) {
      console.log(result)
      if (result) {
        result = {
          code: 200,
          msg: '获取评论成功',
          info: result
        }
      } else {
        result = {
          code: 500,
          msg: '获取评论失败'
        }
      }
      res.json(result)
    })
  },
  getDetail: function (req, res, next) {
    var body = req.body
    var id = body.id
    var count = body.count
    conn.query(topicSql.queryComment, [id, count], function(err, result) {
      console.log(result)
      if (result) {
        result = {
          code: 200,
          msg: '获取评论成功',
          info: result
        }
      } else {
        result = {
          code: 500,
          msg: '获取评论失败'
        }
      }
      res.json(result)
    })
  },
  addComment: function (req, res, next) {
    var body = req.body
    var topicId = body.id
    var stuId = body.stuId
    var commentText = body.commentText
    var commentTime = body.commentTime
    conn.query(topicSql.insertComment, [topicId, stuId, commentTime, commentText], function(err, result) {
      console.log(result)
      if (result) {
        result = {
          code: 200,
          msg: '发表评论成功'
        }
      } else {
        result = {
          code: 500,
          msg: '发表评论失败'
        }
      }
      res.json(result)
    })
  },
}