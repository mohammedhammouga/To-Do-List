const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const filePath = 'tasks.json';

app.get('/tasks', (req, res) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            return res.status(500).send('Error reading tasks');
        }
        res.send(JSON.parse(data));
    });
});

app.post('/tasks', (req, res) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            return res.status(500).send('Error reading tasks');
        }
        const tasks = JSON.parse(data);
        tasks.push(req.body.task);
        fs.writeFile(filePath, JSON.stringify(tasks), (err) => {
            if (err) {
                return res.status(500).send('Error saving task');
            }
            res.send('Task added');
        });
    });
});

app.delete('/tasks/:index', (req, res) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            return res.status(500).send('Error reading tasks');
        }
        const tasks = JSON.parse(data);
        tasks.splice(req.params.index, 1);
        fs.writeFile(filePath, JSON.stringify(tasks), (err) => {
            if (err) {
                return res.status(500).send('Error deleting task');
            }
            res.send('Task deleted');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
