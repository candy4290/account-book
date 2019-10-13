#编译
FROM nginx:latest
LABEL maintainer="陈小祥 <xiaoxiang930601@163.com>"
RUN mkdir /account-book
WORKDIR /account-book
COPY package.json package.json
RUN npm i
COPY . .
RUN npm run build