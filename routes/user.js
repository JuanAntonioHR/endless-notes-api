const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const user = express.Router()
const db = require('../config/database')

user.post("/signup", async(req, res, next) => {
    const { nombre, correo, contrasena } = req.body

    if(nombre && correo && contrasena) {
        const hash = bcrypt.hashSync(contrasena, 13)

        const query = `INSERT INTO usuario (nombre, correo, contrasena) VALUES ('${nombre}', '${correo}', '${hash}');`
        const rows = await db.query(query)

        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "Usuario registrado correctamente" })
        }
        return res.status(500).json({ code: 500, message: "Ocurrió un error" })
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" })
})

user.post("/login", async(req, res, next) => {
    const { correo, contrasena } = req.body

    const query = `SELECT * FROM usuario WHERE correo = '${correo}'; `;
    const rows = await db.query(query)

    if(correo) {
        if(rows.length == 1) {
            const comparar = bcrypt.compareSync(contrasena, rows[0].contrasena)
            if(comparar) {
                const token = jwt.sign({
                    id_usuario: rows[0].id_usuario,
                    correo: rows[0].correo
                }, "debugkey")
                return res.status(200).json({ code: 200, message: token, user: rows[0]})
            } else {
                return res.status(200).json({ code: 401, message: "Contraseña incorrecta" })
            }
        } else {
            return res.status(200).json({ code: 401, message: "Usuario incorrecto" })
        }
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" })
})

//Modificar usuario (solo email, nombre y contraseña)
user.put("/:id([0-9]{1,9})", async(req, res, next) => {
    const { nombre, correo, contrasena } = req.body

    if(nombre && correo && contrasena) {
        let query = `SELECT * FROM usuario WHERE id_usuario = ${req.params.id};`
        const rows = await db.query(query)

        if(rows.length == 1) {
            let hash;
            if (contrasena.startsWith('$2a$') || contrasena.startsWith('$2b$') || contrasena.startsWith('$2x$') || contrasena.startsWith('$2y$')) {
                hash = contrasena; // password is already hashed
            } else {
                hash = bcrypt.hashSync(contrasena, 13); // password is not hashed
            }

            const user = rows[0];
            const updates = [];
            if (nombre !== user.nombre) updates.push(`nombre = '${nombre}'`);
            if (correo !== user.correo) updates.push(`correo = '${correo}'`);
            if (hash !== user.contrasena) updates.push(`contrasena = '${hash}'`);

            if (updates.length > 0) {
                query = `UPDATE usuario SET ${updates.join(', ')} WHERE id_usuario = ${req.params.id};`
                const updateRows = await db.query(query)

                if(updateRows.affectedRows == 1) {
                    return res.status(200).json({ code: 200, message: "Usuario actualizado correctamente" })
                }
                return res.status(500).json({ code: 500, message: "Ocurrió un error" })
            } else {
                return res.status(200).json({ code: 200, message: "No changes were made" })
            }
        }
        return res.status(404).json({ code: 404, message: "Usuario no encontrado" })
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" })
})

//Modificar pregunta y respuesta de seguridad
user.put("/security/:id([0-9]{1,9})", async(req, res, next) => {
    const { respuesta, pregunta } = req.body

    if(respuesta && pregunta) {
        const query = `UPDATE usuario SET respuesta = '${respuesta}', pregunta = '${pregunta}' WHERE id_usuario = ${req.params.id};`
        const rows = await db.query(query)

        if(rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "Pregunta y respuesta actualizadas correctamente" })
        }
        return res.status(500).json({ code: 500, message: "Ocurrió un error" })
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" })
})

user.delete("/:id([0-9]{1,9})", async(req, res, next) => {
    const query = `DELETE FROM usuario WHERE id_usuario = ${req.params.id};`
    const rows = await db.query(query)

    if(rows.affectedRows == 1) {
        return res.status(200).json({ code: 200, message: "Usuario borrado correctamente" })
    }
    return res.status(404).json({ code: 404, message: "Usuario no encontrado" })
})

module.exports = user