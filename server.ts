// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');

import *  as express from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import Transactions from "./helper.js";


const transactions = new Transactions();

const app = express();

app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));

const port = 4000;

// accessing methods from helper file
// const transactions = require('./helper.js')

// handle get requests 
app.get('/balance?*', (req, res) => {
  const query = req.query.account_id;
  const result = transactions.balance(query);
  if (!result) {
    return res.status(404).send(`${0}`);
  } else {
    return res.status(200).json(result);
  }
});

// handle post requests 
app.post('/event', (req, res) => {
  const transactionType = req.body.type;
  const amount = req.body.amount;


  if (transactionType === "deposit") { 
    const destination = req.body.destination;
      const newBalance = transactions.deposit(destination, amount);
      if (newBalance) {
        return res.status(201).json(newBalance);
      } else {
        return res.sendStatus(404).end();
      }
  }
  if (transactionType === "withdraw") {
    const origin = req.body.origin;
    const newBalance = transactions.withdraw(origin, amount);
    if (newBalance) {
      return res.status(201).json(newBalance);
    } else {
      return res.status(404).send(`${0}`);
    }
  }
  if (transactionType === "transfer") {
    const destination = req.body.destination;
    const origin = req.body.origin;
    const newBalance = transactions.transfer(origin, destination, amount);
    if (newBalance) {
      return res.status(201).send(newBalance);
    } else {
      return res.status(404).send(`${0}`);
    }
  }
});

app.post('/reset', (req, res) => {
  res.send('OK')
  res.sendStatus(200).end();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})