const env = process.env.NOOE_ENV; //环境变量；

// 配置;
let MYSQL_CONF
let REDIS_CONF

if( env === 'dev' ){
    // mysql
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'myblog'
    }

    // redis
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

if( env === 'production' ){
    // mysql
    MYSQL_CONF = {
        host: "localhost",
        user: "root",
        password: "123456",
        port: "3306",
        database: "myblog"
    };

    // redis
    REDIS_CONF = {
        port: 6379,
        host: "127.0.0.1"
    };
}

if( env === 'winDev' ){
    // mysql
    MYSQL_CONF = {
        host: "localhost",
        user: "root",
        password: "",
        port: "3306",
        database: "myblog"
    };

    // redis
    REDIS_CONF = {
        port: 6379,
        host: "127.0.0.1"
    };
}


module.exports = {
  MYSQL_CONF,
  REDIS_CONF
};
