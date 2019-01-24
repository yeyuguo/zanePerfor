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
docker run -it -d --name test_kafka -p 9090:9092 wurstmeister/kafka:2.12-2.0.1 -e 
```








