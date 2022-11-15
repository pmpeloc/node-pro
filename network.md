# Redes

### Crear una red tipo bridge (permite ver los contenedor por su IP)

```
docker network create net-nodejs -d bridge
```

### Para crear un contenedor con una red específica

```
docker run -d --name server03 --network net-nodejs nginx:alpine
```

### Para vincular contenedores existentes a una red

```
docker network connect net-nodejs server01
docker network connect net-nodejs server02
```

### Inspeccionar la red

```
docker network inspect net-nodejs
```

### Para desvincular contenedores de una red específica

```
docker network disconnect net-nodejs server01
```
