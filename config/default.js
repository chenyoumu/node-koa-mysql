/**
 * 配置文件
 */
const config = {
  // 启动端口
  prot: 3000,

  // 数据库配置
  database: {
    DATABASE: 'nodesql',
    USERNAME: 'root',
    PASSWORD: '123456',
    PORT: '3306',
    HOST: 'localhost'
  }
}

// 对外抛出配置文件
module.exports = config
