// 连接数据库
var mysqlConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database:'class_interaction',
    port: 3306
}

var userConfig = {
  manager: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database:'class_interaction',
    port: 3306
  },
  student: {
    host: 'localhost',
    user: 'studentUser',
    password: 'studentUser',
    database:'class_interaction',
    port: 3306
  },
  teacher: {
    host: 'localhost',
    user: 'studentUser',
    password: 'studentUser',
    database:'class_interaction',
    port: 3306
  }
}

module.exports = mysqlConfig