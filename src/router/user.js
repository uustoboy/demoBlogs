const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require("../model/resModel");
const { set } = require('../db/redis.js')

// 获取 cookie 的过期时间;
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24*60*60*1000))
    return d.toGMTString()
}

const handlesUserRouter = (req, res) => {
    const method = req.method; // GET POST
    const url = req.url;
    const path = url.split("?")[0];

    // 登录
    if(method === 'POST' && path === '/api/user/login' ){
        const {username, password} = req.body
        //const { username, password } = req.query
        const result = login(username, password);

        return result.then(data => {
          if (data.username) {
              // 这是session
              
              req.session.username = data.username
              req.session.realname = data.realname
              // 同步 redis
              set(req.sessionId, req.session)
              console.log(req.session)
              return new SuccessModel();
          }

            return new ErrorModel("登录失败");
        });
    }

    // 登录验证测试
    if( method === 'GET' && req.path === '/api/user/login-test' ){
        if (req.session && req.session.username) {
            return Promise.resolve(
              new SuccessModel({
                    session: req.session
              })
            );
        }
        return Promise.resolve(new ErrorModel("尚未登录"));
    }
}

module.exports = handlesUserRouter
