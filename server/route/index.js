var express = require('express')
var router = express.Router()
var stu = require('../controller/stu.js')
var teac = require('../controller/teac.js')
var stuHW = require('../controller/stuHW.js')
var teacHW = require('../controller/teacHW.js')
var multerControl = require('../controller/multerCont.js')
var topic = require('../controller/topic.js')

// 路由处理
router.post('/signin', function (req, res, next) {
  console.log(req.body)
  if (req.body.userType === 'student') {
    stu.queryPasswordById(req, res, next)
  } else {
    teac.queryPasswordById(req, res, next)
  }
})

router.post('/loginIn', function (req, res, next) {
  console.log(req.body)
  if (req.body.userType === 'student') {
    stu.add(req, res, next)
  } else {
    teac.add(req, res, next)
  }
})

router.post('/updateInfo', function (req, res, next) {
  console.log(req.body)
  if (req.body.userType === 'student') {
    stu.updateInfo(req, res, next)
  } else {
    teac.updateInfo(req, res, next)
  }
})

router.post('/allHW', function (req, res, next) {
  console.log(req.body)
  if (req.body.userType === 'student') {
    stuHW.getAllHW(req, res, next)
  } else {
    teacHW.getAllHW(req, res, next)
  }
})


router.post('/uploadedHW', function (req, res, next) {
  console.log(req.body)
  if (req.body.userType === 'student') {
    stuHW.getUploadedHW(req, res, next)
  } else {
    // teacHW.getUploadedHW(req, res, next)
  }
})

router.post('/noUploadHW', function (req, res, next) {
  console.log(req.body)
  if (req.body.userType === 'student') {
    stuHW.getNoUploadHW(req, res, next)
  } else {
    // teacHW.getNoUploadHW(req, res, next)
  }
})

// 老师发布作业
router.post('/publichHW', function (req, res, next) {
  console.log(req.body)
  teacHW.add(req, res, next)
})

// 学生提交作业
router.post('/submitHW', function (req, res, next) {
  console.log(req.body)
  stuHW.submitHW(req, res, next)
})
// multer有single()中的名称必须是表单上传字段的name名称。
router.post('/hw', multerControl.hwUpload.single('homework'), function (req, res, next) {
  // console.log(req.file)
  res.status(204).end()
})

// 请求所有话题
router.post('/allTopic', function (req, res, next) {
  console.log(req.body)
  topic.getAll(req, res, next)
})

// 删除话题
router.post('/deleteTopic', function (req, res, next) {
  console.log(req.body)
  topic.delete(req, res, next)
})

// 请求某个话题的详细内容
router.post('/getTopicContent', function (req, res, next) {
  console.log(req.body)
  topic.getContent(req, res, next)
})

// 请求某个话题的详细内容包括评论
router.post('/getTopicDetail', function (req, res, next) {
  console.log(req.body)
  topic.getDetail(req, res, next)
})

// 老师发表话题
router.post('/addTopic', function (req, res, next) {
  console.log(req.body)
  topic.add(req, res, next)
})

// 学生评论话题
router.post('/comment', function (req, res, next) {
  console.log(req.body)
  topic.addComment(req, res, next)
})

module.exports = router