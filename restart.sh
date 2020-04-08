#!/bin/sh

docker stop nginx
docker rm nginx

docker run --name nginx --network=leaveApp -v /home/nginx:/etc/nginx/conf.d -v /home/leaveApp:/usr/share/nginx/html -v /home/uploads:/usr/share/nginx/html/api/uploads -p 80:80 --restart always -d nginx:1.17.8