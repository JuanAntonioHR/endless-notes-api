const express = require('express');
const api = express.Router();
const textToSpeech = require('@google-cloud/text-to-speech');
require('dotenv').config();

api.post("/text-to-speech", async (req, res, next) => {
    try {
        const { text, voice, audioConfig } = req.body;

        const client = new textToSpeech.TextToSpeechClient();

        const request = {
            input: { text: text },
            voice: voice,
            audioConfig: audioConfig,
        };

        const [response] = await client.synthesizeSpeech(request);

        res.status(200).json({ code: 200, message: "Audio generado correctamente", audioContent: response.audioContent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: 500, message: "Hubo un error al generar el audio" });
    }
});

module.exports = api;