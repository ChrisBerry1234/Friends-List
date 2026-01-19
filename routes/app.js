const express = require('express');
const { users } = require('../data/data.json');

let router = express.Router();

//GET ROUTE
router.get('/', (req, res) => {
    res.status(200).json(users);
})
module.exports = router;
