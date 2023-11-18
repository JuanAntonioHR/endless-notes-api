const express = require('express');
const mysql = require('mysql');
const nota = express.Router();
const db = require('../config/database');

// Notas de un usuario en especifico
nota.get("/:id([0-9]{1,3})", async (req, res, next) => {
    const id = req.params.id;

    console.log(id);

    let searchQuery = "SELECT * FROM nota WHERE id_usuario = ?";
    let query = mysql.format(searchQuery, [id]);
    const notas = await db.query(query);

    if (notas.length > 0) {
        return res.status(200).json({code: 200, message: notas})
    } else {
        // No se encontraron notas
        return res.status(404).send({code: 404, message: "No se encontraron notas"});
    }

});

/** Borrar al final esta función */
nota.get("/", async (req, res, next) => {
    const notas = await db.query("SELECT * FROM nota");
    return res.status(200).json({code: 1, message: notas});
});

module.exports = nota;