const express = require('express');
const { users } = require('../data/data.json');
const addNewUser = require('../utils/adduser.js');
const editUser = require('../utils/edituser.js')

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

router.post('/', async (req, res) => {
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

    const result = await addNewUser(newUser);
    if (result.success) {
        res.status(200).json(`Successful in Adding ${firstName} ${lastName} with Email: ${email}`);
    } else {
        res.status(404).json({message: result.message});
    }
})

router.put('/:email', async (req, res) => {
    const user_email = req.params.email; 
    //FIND ENTERED EMAIL 
    const found_user = users.filter(user => user.email === user_email);
    if (found_user.length === 0) {
        return res.status(404).json({message: "User not found"});
    }

    //DECONSTRUCTURE
    const {firstName, lastName, email, DOB} = req.body;
    //ERROR HANDLING
    if (!firstName) return res.status(404).json({message: "Please enter a first name"});
    if (!lastName) return res.status(404).json({message: "Please enter a last name"});
    if (!email) return res.status(404).json({message: "Please enter an email"});
    if (!DOB) return res.status(404).json({message: "Please enter a date of birth"});

    //USE SPREAD OPERATOR TO CREATE NEW OBJECT
    const user = {
       ...found_user[0], ...req.body
    };

    const result = await editUser(user);
    if (result.success) {
        res.status(200).json({message: result.message});
    } else {
        res.status(404).json({message: result.message});
    }
})

module.exports = router;
