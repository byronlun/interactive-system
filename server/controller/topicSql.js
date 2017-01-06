var topicSql = {
  insert: 'insert into topic(title, content, startTime, teacId) values(?, ?, ?, ?)',
  delete: 'delete from topic where topicId=?',
  queryContent: 'select content from topic where topicId=?',
  queryAll: 'select topicId, title, startTime, username from topic,teacher where topic.teacId=teacher.teacId limit ?',
  queryComment: 'select username, commentText, commentTime, content from student,comment,topic where topic.topicId=comment.topicId and comment.stuId=student.stuId and comment.topicId=? limit ?',
  insertComment: 'insert into comment(topicId, stuId, commentTime, commentText) values(?, ?, ?, ?)',
}

module.exports = topicSql