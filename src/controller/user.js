const { exec } = require('../db/mysql')

const login = (username, password) => {
  // 先用数据
  const sql = `
    select username, realname from users where username='${username}' and password='${password}';
  `;
  return exec(sql).then(rows => {
    return rows[0] || {};
  })
};

module.exports = {
  login
};