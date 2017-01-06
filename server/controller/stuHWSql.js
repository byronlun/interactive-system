var stuHWSql = {
  queryAll: 'select * from hwUpload',
  queryById: 'select title, deadline, uploadTime from homework, hwUpload where homework.hwId=hwUpload.hwId and stuId=?',
  queryUploadedById: 'select title, deadline, uploadTime from homework, hwUpload where homework.hwId=hwUpload.hwId and stuId=? and isUpload=1',
  queryNoUploadById: 'select title, deadline, uploadTime from homework, hwUpload where homework.hwId=hwUpload.hwId and stuId=? and isUpload=0',
  updatePath: 'update hwUpload h1, homework h2 set h1.path=?, h1.uploadTime=?, h1.isUpload=1 where h1.hwId=h2.hwId and h1.stuId=? and h2.title=?',
}

module.exports = stuHWSql