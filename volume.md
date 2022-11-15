# Volúmenes

### Crear un volúmen nombrado

```
docker volume create <nombre del volumen>
```

### Vincular un contenedor con un volúmen nombrado

```
docker run -d -p 3310:3306 --name mysqlserver -e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_USER=user -e MYSQL_PASSWORD=123456 -e MYSQL_DATABASE=curso10 -v mysql-vol:/var/lib/mysql mysql:8
```

### Vincular un contenedor con un volúmen anónimo

```
docker run -d -p 3310:3306 --name mysqlserver -e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_USER=user -e MYSQL_PASSWORD=123456 -e MYSQL_DATABASE=curso10 -v /var/lib/mysql mysql:8
```

### Eliminar el contenedor y el volúmen anónimo

```
docker rm -fv <nombre del contenedor | identificador>
```
