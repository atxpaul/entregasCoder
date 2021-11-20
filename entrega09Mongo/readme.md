# Uso de docker con mongodb:

## Crear container

```bash
docker pull mongo
docker run -d --name mongo -p 27017:27017 mongo

// instancia con acceso root
docker run --name mongo-root -d -v /mi/ruta/elegida:/data/db -p 27017:27017 mongo

// instancia con acceso seguro
docker run --name mongo-auth -d -v /mi/ruta/elegida:/data/db -p 27017:27017 mongo mongod --auth

```

## Conectarnos por línea de comandos a la shell de docker

```bash
docker exec -it mongo mongo
docker exec -it mongo mongosh
```

## Operaciones básicas

Listar dbs

```bash
show dbs
```

Cambiar/crear nueva db (newdb de nombre)

```bash
use newdb
```

Insertar registro

```bash
db.newdb.insertOne({nombre:"Pepe",edad:20})
```

Listar objetos

```bash
db.newdb.find({})
```

Mostrar colecciones de una db

```bash
show collections
```
