const express = require('express');
const { users } = require('../data/data.json');
const { request } = require('http');

let router = express.Router();

//GET ROUTE
router.get('/', (req, res) => {
    res.status(200).json(users);
});

//GET BY EMAIL
router.get('/:email', (req, res) => {

    const email = req.params.email;
    //ERROR HANDLING
    if(!email) res.status(404).json("Message: \"There is no email entered\"");
    const user = users.find(user => user.email === email);
    //ERROR HANDLING
    if(!user) res.status(404).json("Message: 'This user does not exist in the database'");
    res.send(`${user.firstName} ${user.lastName} has been found in our database`);

});

router.post('/', (req, res) => {
    const {firstName, lastName, email, DOB} = req.query;
    //ALL ELEMENTS ARE REQUIRED SO WE NEED ERROR HANDLING
    if (!firstName) res.status(404).json("Message: 'Please Enter FirstName'");
    if (!lastName)  res.status(404).json("Message: 'Please Enter LastName'");
    if (!email) res.status(404).json("Message: 'Please Enter Email!'");
    if (!DOB) res.status(404).json("Message: 'Please Enter DOB'");

    //IF ALL INFORMATION IS PRESENT

    const newUser = {
        "firsName": firstName,
        "lastName": lastName,
        "email": email,
        "DOB": DOB
    };

    res.send(200).json(`Successful in Adding ${firstName} ${lastName} with Email: ${email}`);
})
module.exports = router;
