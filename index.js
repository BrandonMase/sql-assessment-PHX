const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const axios = require('axios');

const userController = require('./controller/userController');
const vehicleController = require('./controller/vehicleController');

require('dotenv').config();

massive(process.env.CONNECTION_STRING).then(db =>{
    app.set('db', db)
      // Initialize user table and vehicle table.
  db.init_tables.user_create_seed().then( response => {
    console.log('User table init');
    db.init_tables.vehicle_create_seed().then( response => {
      console.log('Vehicle table init');
    })
  })
}).catch(e => console.log("massive error", e));
const app = express();

app.use(bodyParser.json());

app.get('/api/users',userController.getAllUsers)
app.get('/api/vehicles',vehicleController.getAllVehicles)

app.post('/api/users',userController.addUser)
app.post('/api/vehicles',vehicleController.addVehicle);

app.get('/api/user/:userId/vehiclecount',userController.getVehicleCount)

app.get('/api/user/:userId/vehicle',userController.getUserVehicle)

app.get('/api/vehicle',vehicleController.getVehicles)

app.get('/api/newervehiclesbyyear',vehicleController.getVehicleByYear);

app.put('/api/vehicle/:vehicleId/user/:userId',vehicleController.changeVehicleOwnership);

app.delete('/api/user/:userId/vehicle/:vehicleId',vehicleController.removeOwnership);

app.delete('/api/vehicle/:vehicleId',vehicleController.deleteVehicle);

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));