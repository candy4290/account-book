#编译
FROM nginx:latest
LABEL maintainer="陈小祥 <xiaoxiang930601@163.com>"
## Copy our default nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*
COPY ./build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]