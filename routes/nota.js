const express = require('express');
const mysql = require('mysql');
const nota = express.Router();
const db = require('../config/database');

nota.get("/", async (req, res, next) => {
    const notas = await db.query("SELECT * FROM nota");
    return res.status(200).json({code: 1, message: notas});
});

module.exports = nota;