#!/bin/sh

docker stop nginx
docker rm nginx

docker run --name nginx --network=leaveApp -v /home/docker/nginx:/etc/nginx/conf.d -v /home/docker/leaveApp:/usr/share/nginx/html -v /home/docker/uploads:/usr/share/nginx/html/api/uploads -p 80:80 --restart always -d nginx:1.17.8