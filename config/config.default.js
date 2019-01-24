'use strict';
const path = require('path');
const address = require('address');

module.exports = () => {

    const config = exports = {};

    config.keys = '_123456789';

    config.middleware = [];

    config.name = '性能监控系统';

    config.description = '性能监控系统';

    config.host = '';

    // 务必修改config.debug = true;
    config.session_secret = 'node_performance_secret';

    // 集群配置（一般默认即可）
    config.cluster = {
        listen: {
            port: 7004,
            hostname: '127.0.0.1',
            ip: address.ip(),
        },
    };

    // 用于安全校验和回调域名根路径 开发路径域名（必填）
    config.origin = `http://127.0.0.1:${config.cluster.listen.port}`;

    // 用户登录态持续时间 1 天
    config.user_login_timeout = 86400;

    // web浏览器端定时任务是否执行
    config.is_web_task_run = true;

    // wx浏览器端定时任务是否执行
    config.is_wx_task_run = true;

    // 执行pvuvip定时任务的时间间隔 每分钟定时执行一次
    config.pvuvip_task_minute_time = '0 */1 * * * *';

    // 执行pvuvip定时任务的时间间隔 每天定时执行一次
    config.pvuvip_task_day_time = '0 0 0 */1 * *';

    // 执行ip地理位置转换的定时任务 每分钟定时执行一次
    config.ip_task_time = '0 */1 * * * *';

    // 更新用户上报IP对应的城市信息线程数
    config.ip_thread = 5;

    // 上报原始数据使用redis存储、kafka储存、还是使用mongodb存储
    config.report_data_type = 'kafka'; // redus  mongodb  kafka

    // 使用redis储存原始数据时，相关配置 （report_data_type=redus生效）
    config.redis_consumption = {
        // 定时任务执行时间
        task_time: '*/20 * * * * *',
        // 每次定时任务消费线程数(web端)
        thread_web: 100,
        // 每次定时任务消费线程数(wx端)
        thread_wx: 100,
        // 消息队列池限制数, 0：不限制 number: 限制条数 高并发时服务优雅降级方案
        total_limit_web: 10000,
        total_limit_wx: 10000,
    };

    // kafka 配置 (report_data_type=kafka生效)
    // 配置参考 https://www.npmjs.com/package/kafka-node
    config.kafka = {
        client: { // kafkaClient
            kafkaHost: 'localhost:9090',
        },
        producer: {
            web: {
                topic: 'zane_perfor_web',
                partition: 0, // default 0
                attributes: 0, // default: 0
                // timestamp: Date.now(),
            },
            wx: {
                topic: 'zane_perfor_wx',
            },
        },
        // consumer 和 consumerGroup消费任选其一即可
        // 优先选择consumer消费，两种消费配置任留一种即可
        consumer: {
            web: {
                topic: 'zane_perfor_web',
                offset: 0, // default 0
                partition: 0, // default 0
                isone: false, // 此参数默认不可更改
                total_limit: 10000, // 消息队列消费池限制数, 0：不限制 number: 限制条数 高并发时服务优雅降级方案
            },
            wx: {
                topic: 'zane_perfor_wx',
                isone: false,
                total_limit: 10000,
            },
        },
        consumerGroup: {
            web: { // ConsumerGroup(options, topics)
                topic: 'zane_perfor_web',
                groupId: 'WebPerformanceGroup',
                commitOffsetsOnFirstJoin: true,
                total_limit: 10000,
            },
            wx: {
                topic: 'zane_perfor_wx',
                groupId: 'WxPerformanceGroup',
                commitOffsetsOnFirstJoin: true,
                total_limit: 10000,
            },
        },
    };

    // report_data_type=mongodb生效
    // db1与db3数据库同步每分钟执行一次
    config.report_task_time = '0 */1 * * * *';
    // db3同步db1上报数据线程数
    config.report_thread = 10;

    // 解析用户ip地址为城市是使用redis还是使用mongodb
    config.ip_redis_or_mongodb = 'redis'; // redus  mongodb

    // 文件缓存ip对应地理位置（文件名）
    config.ip_city_cache_file = {
        isuse: false, // 是否开启本地文件缓存
        web: 'web_ip_city_cache_file.txt',
        wx: 'wx_ip_city_cache_file.txt',
    };

    // top数据分析提取前N条配置
    config.top_alalysis_size = {
        web: 10,
        wx: 10,
    };

    // shell重启
    config.shell_restart = {
        // mongodb重启shell,如果mongodb进程kill了，请求不了数据库时重启（可选填）
        mongodb: [path.resolve(__dirname, '../mongodb-restart.sh')],
        // node.js服务重启shell,mongodb重启时，数据库连接池有可能会断，这时需要重启服务
        servers: [path.resolve(__dirname, '../servers-restart.sh')],
    };

    // 百度地图api key
    config.BAIDUAK = '这里替换为你的百度KEY';

    // 分页条数
    config.pageSize = 50;

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

    // send email config
    config.email = {
        client: {
            // service: '163',
            host: 'smtp.163.com',
            port: 465,
            secure: true,
            auth: {
                user: 'xxxxxx',
                pass: 'xxxxxx',
            },
        },
    };

    // ejs模板
    config.view = {
        defaultExtension: '.html',
        mapping: {
            '.html': 'ejs',
        },
    };
    config.ejs = {
        layout: 'layout.html',
    };

    // 定义日志路径
    exports.logger = {
        dir: path.resolve(__dirname, '../buildlogs'),
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
                autoReconnect: true,
                poolSize: 20,
            },
        },
    };
    if (config.report_data_type === 'mongodb') {
        dbclients.db1 = {
            url: 'mongodb://127.0.0.1:27019/performance',
            options: {
                poolSize: 20,
            },
        };
    }

    // mongoose配置
    config.mongoose = {
        clients: dbclients,
    };

    config.bodyParser = {
        jsonLimit: '1mb',
        formLimit: '1mb',
    };

    config.security = {
        domainWhiteList: ['http://127.0.0.1:18090'],
        csrf: {
            enable: false,
            ignore: '/api/v1/report/**',
        },
    };

    config.cors = {
        origin: '*',
        allowMethods: 'GET,PUT,POST,DELETE',
    };

    config.onerror = {
        all(err, ctx) {
            // 统一错误处理
            ctx.body = JSON.stringify({
                code: 1001,
                desc: err.toString().replace('Error: ', ''),
            });
            ctx.status = 200;
            // 统一错误日志记录
            ctx.logger.info(`统一错误日志：发现了错误${err}`);
        },
    };

    return config;
};
