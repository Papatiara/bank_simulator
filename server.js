"use strict";
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
exports.__esModule = true;
var express = require("express");
var cors_1 = require("cors");
var helper_js_1 = require("./helper.js");
var transactions = new helper_js_1["default"]();
var app = express();
app.use(cors_1["default"]());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
var port = 4000;
// accessing methods from helper file
// const transactions = require('./helper.js')
// handle get requests 
app.get('/balance?*', function (req, res) {
    var query = req.query.account_id;
    var result = transactions.balance(query);
    if (!result) {
        return res.status(404).send("" + 0);
    }
    else {
        return res.status(200).json(result);
    }
});
// handle post requests 
app.post('/event', function (req, res) {
    var transactionType = req.body.type;
    var amount = req.body.amount;
    if (transactionType === "deposit") {
        var destination = req.body.destination;
        var newBalance = transactions.deposit(destination, amount);
        if (newBalance) {
            return res.status(201).json(newBalance);
        }
        else {
            return res.sendStatus(404).end();
        }
    }
    if (transactionType === "withdraw") {
        var origin_1 = req.body.origin;
        var newBalance = transactions.withdraw(origin_1, amount);
        if (newBalance) {
            return res.status(201).json(newBalance);
        }
        else {
            return res.status(404).send("" + 0);
        }
    }
    if (transactionType === "transfer") {
        var destination = req.body.destination;
        var origin_2 = req.body.origin;
        var newBalance = transactions.transfer(origin_2, destination, amount);
        if (newBalance) {
            return res.status(201).send(newBalance);
        }
        else {
            return res.status(404).send("" + 0);
        }
    }
});
app.post('/reset', function (req, res) {
    res.send('OK');
    res.sendStatus(200).end();
});
app.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});
