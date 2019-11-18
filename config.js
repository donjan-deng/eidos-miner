const config = {
    interval_second: 1,//挖一次间隔(秒)
    refresh_account_second: 5,//刷新用户信息间隔（秒）
    cpu_wait_min: 5,//CPU耗尽等待时间（分钟）
    log_max: 50,//保留多少行日志
    nodes: [ //可用节点
        {
            protocol: 'https',
            host: 'nodes.get-scatter.com',
            port: 443
        },
        {
            protocol: 'https',
            host: 'eos.newdex.one',
            port: 443
        }, {
            protocol: 'https',
            host: 'api.eosdetroit.io',
            port: 443
        }, {
            protocol: 'https',
            host: 'api.main.alohaeos.com',
            port: 443
        }
    ]
}
module.exports = config;