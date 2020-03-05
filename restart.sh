#!/bin/sh

docker stop nginx
docker rm nginx

docker run --name nginx --network=leaveApp -v /home/docker/leaveApp:/usr/share/nginx/html -v /home/docker/uploads:/api/uploads -p 80:80 --restart always -d nginx:1.17.8