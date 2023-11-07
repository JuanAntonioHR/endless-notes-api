const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const user = express.Router()
const db = require('../config/database')

user.post("/signin", async(req, res, next) => {
    const { nombre, correo, contrasena, respuesta, pregunta } = req.body

    if(nombre && correo && contrasena && respuesta && pregunta) {
        const hash = bcrypt.hashSync(contrasena, 13)

        const query = `INSERT INTO usuario (nombre, correo, contrasena, respuesta, pregunta) VALUES ('${nombre}', '${correo}', '${hash}', '${respuesta}', '${pregunta}');`
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
                return res.status(200).json({ code: 200, message: token })
            } else {
                return res.status(200).json({ code: 401, message: "Contraseña incorrecta" })
            }
        } else {
            return res.status(200).json({ code: 401, message: "Usuario incorrecto" })
        }
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" })
})

user.get("/", async(req, res, next) => {
    const query = "SELECT * FROM usuario"
    const rows = await db.query(query)

    return res.status(200).json({ code: 200, message: rows })
})

module.exports = user