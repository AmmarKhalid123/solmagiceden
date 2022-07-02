const express = require('express');
const cors = require('cors');
const app = express();
const config = require('../config');

const whitelist = config.whitelistedips;

var corsOptionsDelegate = (req, callback) => {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1){
        corsOptions = { origin: true };
        callback(null, corsOptions);
    }
    else {
        console.log('here');
        corsOptions = { origin: false };
        callback(new Error('Restricted Endpoint'), corsOptions);
    }
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);