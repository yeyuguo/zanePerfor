# 基础镜像
FROM node:8.11.3-alpine

RUN mkdir /web-ui
WORKDIR /web-ui
COPY . /web-ui

RUN \
    # 使用 淘宝镜像源
    npm config set registry http://registry.npm.taobao.org/ \
    # 使用 cnpm
    && npm install -g cnpm --registry=https://registry.npm.taobao.org \
    && cnpm install 


EXPOSE 7001
# CMD ["node","./server/server.js"]
# CMD ["npm","run","start"]
CMD ["npm","run","dev"]v w