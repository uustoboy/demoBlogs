const xss = require('xss')
const { exec, escape } = require('../db/mysql')

const getList = (author, keyword) => {
    //先返回假数据（格式正确）
    let sql = 'select * from blogs where 1=1 '
    if(author) {
      sql += `and author='${author}' `
    }

    if(keyword) {
      sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    // 返回 promise
    return exec(sql)
}

const getDetail = (id) => {
    // 先返回假数据
  const sql = `select * from blogs where id='${id}'`
    return exec(sql).then(rows => {
      return rows[0]
    })

}

const newBlog = (blogData = {}) => {
    // blogData 是一个博客对象,包含 title content 属性
    const title = xss(blogData.title)
    const content = blogData.content
    const author = blogData.author
    const createTime = Date.now()
    const sql = `
        insert into blogs (title,content,createtime,author) values ('${title}','${content}',${createTime},'${author}');
    `;
    return exec(sql).then(inserData => {
      return {
        id: inserData.insertId
      }
    })
}
const updateBlog = (id, blogData) => {
    // id就是要更新的 id
    console.log('update blog', id, blogData)

    const title = blogData.title
    const content = blogData.content
    const createTime = Date.now()
    const sql = `
        update blogs set title='${title}', content='${content}', createTime=${createTime} where id=${id} ;
    `;
    return exec(sql).then(updateData => {
      if ( updateData.affectedRows > 0 ){
        return true
      }

      return false
    })
}

const delBlog = (id, author) => {
  const sql = `delete from blogs where id='${id}' and author='${author}'`;
  return exec(sql).then(delData => {
    if (delData.affectedRows >0 ){
      return true
    }
    return false
  })
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
