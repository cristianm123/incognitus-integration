# mhealth-incognitus-backend
Backend services for the Incognitus App

## Create network
```bash
docker network create --driver bridge incognitus-net
```

## DB

```bash
docker run -p 3306:3306 --name mysql \
 --network incognitus-net \
 -v /$(pwd)/mysql_scripts/:/docker-entrypoint-initdb.d \
 -e MYSQL_ROOT_PASSWORD=pass \
 -e MYSQL_DATABASE=incognitus \
 -e MYSQL_USER=admin \
 -e MYSQL_PASSWORD=admin \
 -d mysql:5.7
```
para agregar persistencia a la bd: -v C:/mysql:/var/lib/mysql \
## Backend
```bash
docker build -t incognitus_server .
docker run \
 -e MINIO_ACCESS_KEY="Ek3aIA2MpWOqW0Z56Yee" \
 -e MINIO_SECRET_KEY="D9NdhLcC8VwFnQiOU0zTF4oYHRolf8no8sszhDP3" \
 -e MYSQL_PASSWORD="pass" \
 --name incognitus \
 --network incognitus-net \
 --rm incognitus_server
```

## Minio
```bash
docker run -d \
--network incognitus-net \
-p 9000:9000 \
-p 9090:9090 \
--name minio \
-v /c/minio/data:/data \
-e "MINIO_ROOT_USER=admin" \
-e "MINIO_ROOT_PASSWORD=password" \
quay.io/minio/minio server /data --console-address ":9090"
```