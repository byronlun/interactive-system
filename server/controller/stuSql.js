var stuSql = {
  insert: 'insert into student(stuId, username, email, password) values (?, ?, ?, ?)',
  queryById: 'select * from student where stuId=?',
  queryPasswordById: 'select password from student where stuId=?',
  updateInfo: 'update student set username=?, email=?, age=?, sex=?, password=? where stuId=?'
}

module.exports = stuSql