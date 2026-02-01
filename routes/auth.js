const express = require('express');
const session = require('express-session')
const routes = require('./app.js');
const jwt = require('jsonwebtoken')
const path = require('path')
require('dotenv').config({path: path.resolve(__dirname, '../.env')})


const app = express();
const PORT = 3000;

const SECRET_KEY = process.env.INTERNAL_SECRET_KEY;

//MIDDLEWARE
app.use(express.json())

app.use(session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure to true in production with HTTPS
}))

//MIDDLEWARE TO AUTHENTICATE USER FOR ACCESS 
app.use('/users', (req, res, next) => {
    if (!req.session.authorization) {
        return res.status(403).json({message: "User not logged in"})
    }
    let token = req.session.authorization.accesstoken;
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err){
            return res.status(403).json({message: "Invalid or expired token"})
        }
        //SET THE REQUEST BODY TO THE USER FOR ACCESS
        req.user = user;
        next();
    })
});

//USER ROUTES
app.use('/users', routes)

//POST LOGIN TO AUTHORIZE USER LOGIN AND GENERATE JWT UPON SUCCESSFUL REQUEST
app.post('/login', (req, res) => {
    const username = req.body.username;
    if(!username) {
        return res.status(400).send("Username is required");
    }
    // In a real app, you would verify credentials against a database
    const accesstoken = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    //assign newly made token to JSON payload 
    res.session.authorization = { accesstoken }
})

app.listen(PORT, (req, res) => {
    console.log("Auth Server is listening on port " + PORT);
})