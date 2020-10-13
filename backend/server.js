const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const deviceRoutes = express.Router();
const PORT = 4000;

let Device = require('./device.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/devices', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

deviceRoutes.route('/').get(function(req, res) {
    Device.find(function(err, devices) {
        if (err) {
            console.log(err);
        } else {
            res.json(devices);
        }
    });
});

deviceRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Device.findById(id, function(err, device) {
        res.json(device);
    });
});

deviceRoutes.route('/update/:id').post(function(req, res) {
    Device.findById(req.params.id, function(err, device) {
        if (!device)
            res.status(404).send("data is not found");
        else
            device.device_name = req.body.device_name;
            device.device_description = req.body.device_description;
            device.device_quantity = req.body.device_quantity;
            device.device_responsible = req.body.device_responsible;
            device.device_priority = req.body.device_priority;
            device.device_completed = req.body.device_completed;

            device.save().then(device => {
                res.json('Device updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

deviceRoutes.route('/add').post(function(req, res) {
    let device = new Device(req.body);
    device.save()
        .then(device => {
            res.status(200).json({'device': 'device added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new device failed');
        });
});

app.use('/devices', deviceRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
