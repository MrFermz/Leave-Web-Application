# ระบบลางานออนไลน์ภายในองค์กรประเภทดิจิตอลมีเดียโพรดักชัน

ระบบลางานออนไลน์ภายในองค์กรประเภทดิจิตอลมีเดียโพรดักชัน พร้อมทดสอบเซิร์ฟเวอร์จริง โดย Front-end จะพัฒนาด้วย HTML, CSS, และ JavaScript และ Back-end  ทำงานบน Docker ที่ติดตั้งใน CentOS 7
(Linux) และได้พัฒนาด้วย MariaDB, phpMyAdmin, NGINX และ Node.js

## System Flow Diagram แผนภาพการทำงานของระบบ
- coming soon

## Development Tools โปรแกรมที่ใช้ในการพัฒนา

* Visual Studio Code version 1.44.0
* Google Chrome version 80.0.3987.163

## System Requirements ความต้องการของระบบ

* Node.js version 12.14.0
* Docker version 19.03.5
* Git version 2.24.0

## Installation วิธีการติดตั้งระบบ

### 1. Download source code or use git
```sh
git clone https://github.com/MrFermz/leaveApp.git
```
```sh
git clone https://github.com/MrFermz/leaveAppAPI.git
```

### 2. Setup
### Back-end
ที่ folder **/home** จะมีอยู่ 4 folder ย่อย
ทำตามข้อที่ 1 ก่อนแล้วจึงสร้าง file และ folder ดังนี้
* /home/uploads
* /home/nginx/default.conf
* /home/restart.sh
ต่อมาจะใส่ code ลงไปในส่วนของไฟล์ต่าง ๆ 

#### default.conf
```
server {
  listen      80;
  server_name localhost;
  
  location / {
    root  /usr/share/nginx/html;
    index index.html index.htm;
  }
  
  location /1 {
    root  /usr/share/nginx/html/uploads;
    autoindex off;
  }
  
  error_page  500 502 503 504 /50x.html;
  location = /50x.html {
    root  /usr/share/nginx/html;
  }
}
```

#### restart.sh
```sh
#!/bin/sh

docker stop mariadb
docker rm mariadb
docker stop myadmin
docker rm myadmin

docker run --name mariadb --network=leaveApp -e MYSQL_ROOT_PASSWORD=1234 -p 3306:3306 --restart always -d mariadb:10.4.11-bionic
docker run --name myadmin --network=leaveApp -e MYSQL_ROOT_PASSWORD=1234 -p 8000:80 --link mariadb:db --restart always -d phpmyadmin/phpmyadmin:4.9
```

อย่าลืม set permission
```sh
chmod a+x restart.sh
```

### Front-end
ตั้งค่าเพื่อให้รองรับกับ back-end ที่ทำไว้โดยการตั้งค่า IP และ port ต่าง ๆ ดังนี้
* leaveApp/assets/functions/common.js
```
PRODUCTION: {
  HOST     : "VM IP",
  ...
},
DEVELOPMENT: {
  HOST     : "local IP",
  ...
}
```

* leaveApp/assets/functions/sql_query.js
```
CONFIG_ENV.DEVELOPMENT หรือ CONFIG_ENV.PRODUCTION
```

* leaveAppAPI/api/config.json
```
"PRODUCTION":{
  "PORT": "9000",
  "SQL": {
    "HOST"  : "mariadb",
    ...
  }
},
"DEVELOPMENT": {
  "PORT": "9000",
  "SQL": {
    "HOST"  : "local IP",
    ...
  }
}
```
> หากอยู่ในเครื่องขั้นตอนการพัฒนาให้ใช้ .DEVELOPMENT หากใช้งานจริง .PRODUCTION


## Run System วิธีการเปิดใช้งานระบบ

### Back-end
ถ้าสามารถใช้งาน Docker ได้ให้เข้าไปที่  folder **/home** แล้วใช้คำสั่ง
```
./restart.sh
```
> เพื่อเปิด Mariadb กับ phpmyadmin ขึ้นมา

รัน API ใน folder **/home/leaveAppAPI**
```
./restart.sh
```
รัน NGINX ใน folder **/home/leaveApp**
```
./restart.sh
```
> สามารถแก้ไขไฟล์ .sh ได้หากต้องการ

### Front-end
clone leaveApp และ leaveAppAPI มาให้ครบ
ต่อมาให้จำลอง Web server กับ Database ซักตัว
> แนะนำ xampp v3.2.4

* เข้า folder **leaveAppAPI/** รันคำสั่ง
```
npm install
npm start
```

## Tools & Services เครื่องมือและบริการที่ใช้
* coming soon

## System Architecture สถาปัตยกรรมของระบบ
* coming soon
