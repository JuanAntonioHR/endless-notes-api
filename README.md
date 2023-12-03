# endless-notes-api
![Badge en Desarollo](https://img.shields.io/badge/STATUS-EN%20DESAROLLO-green)

## Run

"npm start" to execute the api

These commands are to modify the data in the database:

```
-- Aumentar un día en todos los registros de "fecha"
update nota
set fecha = fecha + interval 1 day;

-- Reducir un día en todos los registros de "fecha"
update nota
set fecha = fecha - interval 1 day;
