const express = require('express');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const app = express();
const PORT = 80;

app.get('/*.gz', (req, res) => {
    const requestedFile = path.join(__dirname, req.path);
    fs.access(requestedFile, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send('File not found');
        }
        res.sendFile(requestedFile);
    });
});

app.get('/epg', (req, res) => {
    res.send('Success: started');

    setImmediate(() => {
        exec('node main.js', (error) => {
            if (error) {
                console.error(`Ошибка: ${error.message}`);
            } else {
                console.log('Скрипт main.js запущен');
            }
        });
    });
});

app.get('/ipcheck', (req, res) => {
    exec('curl -s https://2ip.ru', (error, stdout) => {
        if (error) {
            console.error(`Ошибка: ${error.message}`);
            return res.status(500).send('Ошибка при получении IP адреса');
        }
        const ipAddress = stdout.match(/(\d{1,3}\.){3}\d{1,3}/);
        if (ipAddress) {
            res.send(`IP: ${ipAddress[0]}`);
        } else {
            res.send('Не удалось извлечь IP адрес');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту:${PORT}`);
});
