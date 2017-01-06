var teacSql = {
  insert: 'insert into teacher(teacId, username, email, password) values (?, ?, ?, ?)',
  queryById: 'select * from teacher where teacId=?',
  queryPasswordById: 'select password from teacher where teacId=?',
  updateInfo: 'update teacher set username=?, email=?, age=?, sex=?, password=? where teacId=?'
}

module.exports = teacSql