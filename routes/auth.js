const express = require('express');
const session = require('express-session')
const routes = require('./app.js');
const jwt = require('jsonwebtoken');
const path = require('path');
const authenticateUser = require('../utils/password_authenticate.js')
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
    else{   
        let token = req.session.authorization.accesstoken;
        jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err){
            return res.status(403).json({message: "Invalid or expired token"})
        }
        else{  
             //SET THE REQUEST BODY TO THE USER FOR ACCESS
            req.user = user;
            next();
        }
    })
    }
});

//USER ROUTES ONCE USER IS AUTHENTICATED 
app.use('/users', routes)

//POST LOGIN TO AUTHORIZE USER LOGIN AND GENERATE JWT UPON SUCCESSFUL REQUEST
app.post('/login', (req, res) => {
    const user = {email: req.body.email, password: req.body.password};
    if(!user.email || !user.password) {
        return res.status(400).send("Email and password are required");
    }
    //ELSE
    authenticateUser(user).then(response => {
        if(response.Success === True){
            //GIVE ACCESS TOKEN TO USER
            const accesstoken = jwt.sign({username}, SECRET_KEY, {expiresIn: '1hr'})
            //ADD TO SESSION FOR FUTURE DECONSTRUCTION
            req.session.authorization = accesstoken;
            return res.status(200).json({message: `${response.message}`})
        }
        else{
            return res.status(401).json({message: `${response.message}`})   
        }
})
})

app.listen(PORT, (req, res) => {
    console.log("Auth Server is listening on port " + PORT);
})