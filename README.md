# endless-notes-api
![Badge en Desarollo](https://img.shields.io/badge/STATUS-EN%20DESAROLLO-green)

## Run

Run this comand execute the api:
```
npm start
```

These commands are to modify the data in the database:
```
-- Aumentar un día en todos los registros de "fecha"
update nota
set fecha = fecha + interval 1 day;

-- Reducir un día en todos los registros de "fecha"
update nota
set fecha = fecha - interval 1 day;
```
