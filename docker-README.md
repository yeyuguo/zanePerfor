## web
[文档](https://blog.seosiwei.com/performance/github.html)
端口 7001
```sh

```

## docker build 生成镜像

```sh
docker build -t 镜像名 -f /绝对路径/Dockerfile ./
```


## 启动 mongodb
端口 27019
真实 27017
```sh
docker run -it -d -p 27019:27017 --name test_mongo mongo:3.4
```



## 启动 redis
端口 6377
真实 6379
```sh
docker run -it -d --name test_redis -p 6377:6379 redis:3.2
```


#### redis web界面
端口8888
```sh
docker rm -f redis_web \
&& docker run --rm -it -d \
    -e REDIS_1_HOST=redis \
    -e REDIS_1_NAME=MyRedis \
    -p 8888:80 \
    --name redis_web \
    --link test_redis:redis  \
    erikdubbelboer/phpredisadmin
```

访问浏览器 `http://localhost:8888` 


## 启动 kafka zookeeper
[安装 kafka 和 zookeeper 的详细链接](https://hub.docker.com/r/wurstmeister/kafka)
[docker-compose kafka 和 zookeeper 的配置](https://raw.githubusercontent.com/wurstmeister/kafka-docker/master/docker-compose.yml)
[kafka启动的环境变量设置（KAFKA_ZOOKEEPER_CONNECT）](https://www.jianshu.com/p/93f33dfefdb2)
### zookeeper
端口 2180
真实 2180
```sh
docker run -it -d --name test_zookeeper -p 2180:2180 wurstmeister/zookeeper 
```


### kafka
端口 9090
真实 9092
```sh
docker rm -f test_kafka \
&& docker run -it -d \
-p 9090:9092 \
--name test_kafka \
-e KAFKA_ADVERTISED_HOST_NAME=10.9.163.153 \
-e KAFKA_ZOOKEEPER_CONNECT=10.9.163.153:2180 \
wurstmeister/kafka:2.12-2.0.1  
```





## 测试编排 web-monitor界面

docker rm -f test_monitor \
&& docker run \
    -it \
    --name test_monitor \
    -p 7003:7001 \
    -e kafka_NAME=127.0.0.1:9090 --link test_kafka:kafka \
    --link test_mongo:mongo
    -e redis_NAME=127.0.0.1:6377 --link test_redis:redis \
    self/monitor



docker rm -f test_monitor \
&& docker run \
    -it \
    -d \
    --name test_monitor \
    -p 7003:7001 \
    -v  /Users/yeyuguo/Code/zanePerfor:/web-ui\
    node:latest

