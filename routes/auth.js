const express = require('express');
const session = require('express-session')
const routes = require('./app.js');
const jwt = require('jsonwebtoken')
const path = require('path')


const app = express();
const PORT = 3000;