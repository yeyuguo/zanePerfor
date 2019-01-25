'use strict';

module.exports = () => {
    const config = exports = {};

    // 用于安全校验和回调域名根路径 生产线域名（必填）
    config.origin = 'https://xxx.xxx.com';

    // 百度地图api key
    config.BAIDUAK = 'xxxxxxxxxx';

    // github login
    config.github = {
        client_id: 'xxxxxx',
        client_secret: 'xxxxxx',
        scope: ['user'],
    };

    // 新浪微博 login
    config.weibo = {
        client_id: 'xxxxxx', // 微博的App Key
        client_secret: 'xxxxxx', // 微博的App Secret
        scope: ['all'],
    };

    // wechat login
    config.wechat = {
        client_id: 'xxxxxx', // 微信的AppId
        client_secret: 'xxxxxx', // 微信的App Secret
    };

    // redis配置
    config.redis = {
        client: {
            port: 6377, // Redis port
            host: '127.0.0.1', // Redis host
            password: '',
            db: 0,
        },
    };

    // mongodb 服务
    const dbclients = {
        db3: {
            // 单机部署
            url: 'mongodb://127.0.0.1:27017/performance',
            // 副本集 读写分离
            // url: 'mongodb://127.0.0.1:28100,127.0.0.1:28101,127.0.0.1:28102/performance?replicaSet=rs1',
            // 集群分片
            // url: 'mongodb://127.0.0.1:30000/performance',
            options: {
                poolSize: 100,
                keepAlive: 10000,
                connectTimeoutMS: 10000,
                autoReconnect: true,
                reconnectTries: 100,
                reconnectInterval: 1000,
            },
        },
    };
    if (config.report_data_type === 'mongodb') {
        dbclients.db1 = {
            // url: 'mongodb://127.0.0.1:27017,127.0.0.1:27018/performance?replicaSet=performance',
            url: 'mongodb://127.0.0.1:27019/performance',
            options: {
                poolSize: 100,
                keepAlive: 10000,
                connectTimeoutMS: 10000,
                autoReconnect: true,
                reconnectTries: 100,
                reconnectInterval: 1000,
            },
        };
    }

    // mongoose配置
    config.mongoose = {
        clients: dbclients,
    };

    config.security = {
        domainWhiteList: ['https://xxx.xx.com'],
        csrf: {
            enable: false,
            ignore: '/api/v1/report/**',
        },
    };

    return config;
};
