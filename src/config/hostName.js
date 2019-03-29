
// 配置开发环境与生产环境
let hostName

if (process.env.NODE_ENV == 'development') {
    hostName = '/api'
}else{
    hostName = window.location.origin + ':8080'
}

export default hostName


