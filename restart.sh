#!/bin/sh

docker stop nginx
docker rm nginx

docker run --name nginx --network=leaveApp -v /home/docker/leaveApp:/usr/share/nginx/html -p 80:80 --restart always -d nginx:1.17.8