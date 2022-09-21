const { application } = require('express');
const express = require('express');
const path = require('path');
const { sequelize } = require('../database/models')
const app = express();
const userRoute = require('../src/routes/userRoute')

app.use('/users', userRoute);

app.listen(3000, async () => {
    sequelize.sync({alter: true}) //danger
    console.log("Server corriendo en puerto 3000")
})
