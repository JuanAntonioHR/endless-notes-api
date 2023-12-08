const express = require('express');
const mysql = require('mysql');
const nota = express.Router();
const db = require('../config/database');

// Notas de un usuario en especifico
nota.get("/:id([0-9]{1,9})", async (req, res, next) => {
    const id = req.params.id;

    console.log(id);

    let searchQuery = "SELECT *, CONVERT_TZ(fecha, '-00:00', @@global.time_zone) as fecha FROM nota WHERE id_usuario = ? ORDER BY fecha";
    let query = mysql.format(searchQuery, [id]);
    const notas = await db.query(query);

    if (notas.length > 0) {
        return res.status(200).json({code: 200, message: notas})
    } else {
        // No se encontraron notas
        return res.status(404).send({code: 404, message: "No se encontraron notas"});
    }
});

// Insertar nota
nota.post("/", async (req, res, next) => {
    const { titulo, texto, fecha, id_usuario } = req.body;

    let insertQuery = "INSERT INTO nota (titulo, texto, fecha, id_usuario) VALUES (?, ?, ?, ?)";
    let query = mysql.format(insertQuery, [titulo, texto, fecha, id_usuario]);
    const result = await db.query(query);

    if (result.affectedRows > 0) {
        // Fetch the new note
        const newNoteQuery = "SELECT *, CONVERT_TZ(fecha, '-00:00', @@global.time_zone) as fecha FROM nota WHERE id_nota = ?";
        const newNote = await db.query(mysql.format(newNoteQuery, [result.insertId]));

        return res.status(201).json({ code: 201, message: "Nota insertada correctamente", newNote: newNote[0] });
    } else {
        return res.status(500).json({ code: 500, message: "Hubo un error al insertar la nota" });
    }
});

// Delete a note by its specific id
nota.delete("/:id([0-9]{1,9})", async (req, res, next) => {
    const id = req.params.id;

    let deleteQuery = "DELETE FROM nota WHERE id_nota = ?";
    let query = mysql.format(deleteQuery, [id]);
    const result = await db.query(query);

    if (result.affectedRows > 0) {
        return res.status(200).json({code: 200, message: "Nota eliminada correctamente"})
    } else {
        // No note found with the given id
        return res.status(404).send({code: 404, message: "No se encontró la nota"});
    }
});

/** Borrar al final esta función */
nota.get("/", async (req, res, next) => {
    const notas = await db.query("SELECT * FROM nota");
    return res.status(200).json({code: 1, message: notas});
});

module.exports = nota;