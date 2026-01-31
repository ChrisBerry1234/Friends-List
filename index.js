const express = require("express");
const routes = require('./routes/app.js');
let PORT = 5000;

//INSTANTIATE EXPRESS APP
const app = express();

//MIDDLEWARE
app.use(express.json());

//FOR USERS, USE THE IMPORTED ROUTES
app.use('/users', routes);

app.listen(PORT, ()=> {
    console.log("Server listening on Port:",  PORT);
});
