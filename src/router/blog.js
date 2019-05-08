const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");

// 统一的登录验证函数
const loginCheck = (req) => {
    if (!req.session.username){
        return Promise.resolve(
            new SuccessModel({
                session: req.session
            })
        )
    }
}

const handleBlogRouter = (req, res) => {
    const method = req.method // GET POST
    const url = req.url
    const path = url.split('?')[0]
    const id = req.query.id;
    //获取博客列表
    if(method === 'GET' && path === '/api/blog/list'){
        // 管理员界面
        
        let author = req.query.author || ''
        const keyword = req.query.keyword || ''
        if (req.query.isadmin){
            // 管理员界面
            const loginCheckReslt = loginCheck(req)
            if (loginCheckResult){
                // 未登录
                return loginCheckReslt
            }    
            // 强制查询自己的博客
            author = req.session.username
        }
        
        const result = getList(author, keyword);
        return result.then(listData => {
            return new SuccessModel(listData);
        })
    }

    //博客详情
    if( method === 'GET' && path === '/api/blog/detail'){
        const result = getDetail(id)
        return result.then(data => {
            return new SuccessModel(data);
        });
    }

    // 新建一篇博客
    if(method === 'POST' && path === '/api/blog/new'){

        //const blogData = newBlog(req.body)
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult){
            return loginCheckResult
        }
        req.body.author = req.session.username;
        const result = newBlog(req.body)
        return result.then( data => {
            return new SuccessModel(data);
        })
    }

    // 更新一篇博客
    if (method === "POST" && path === "/api/blog/update") {
        //const result = updateBlog(id,req.body)
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            return loginCheckResult
        }
        const result = updateBlog(id, req.body)
        return result.then(val => {
          if (val) {
            return new SuccessModel();
          }else{
              return new ErrorModel("更新博客失败");
          }
        });
    }

    // 删除一片博客
    if (method === "POST" && path === "/api/blog/del") {
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            return loginCheckResult
        }
        req.body.author = req.session.username;
        const result = delBlog(id, req.body.author);
        return result.then(val => {
            if (val) {
              return new SuccessModel();
            } else {
              return new ErrorModel("删除博客失败");
            }
        })

    }
}


module.exports = handleBlogRouter
