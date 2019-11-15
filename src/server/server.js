const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const fetch = require("node-fetch");

import config from "./config.js";

const connection = mysql.createConnection({
    host     : config.db.host,
    user     : config.db.user,
    password : config.db.password,
    database : config.db.dbName
});

const server = express();

server.use(cors());
server.use(express.json()); // for parsing application/json

server.put('/transactions', async (req, res) => {

    console.log(`PUT /transactions ${JSON.stringify(req.body)}`);
    const transaction_id = req.body.transaction_id;
    const memo = req.body.memo;

    const sql = `UPDATE transaction SET memo = '${memo}' WHERE id = ${transaction_id}`;

    console.log(sql);

    try {
        connection.query(sql);
        console.log("OK");
        res.sendStatus(200);

    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

server.post('/transactions', async (req, res) => {

    console.log(`POST /transactions ${JSON.stringify(req.body)}`);

    const category_name = req.body.category_name;
    const category_id = req.body.category_id;
    const value = req.body.value;
    const memo = req.body.memo;

    const sql = `INSERT INTO transaction (budget_name, budget_id, category_name, category_id, memo, value) VALUES ( \
        '${config.ynab.budgetName}', 
        '${config.ynab.budgetId}', 
        '${category_name}', 
        '${category_id}', 
        '${memo}', 
        '${value}')`;

    console.log(sql);

    try {
        connection.query(sql);
        console.log("OK");
        res.sendStatus(200);

    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }

    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    const url = `https://api.youneedabudget.com/v1/budgets/
        ${config.ynab.budgetId}/months/${date}/categories/${category_id}`;

    const body = {
        category:
        {
            budgeted: Number(value)
        }
    };

    console.log(`PATCH ${url} ${JSON.stringify(body)}`);

    const promise = await fetch(url, {
        headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${config.ynab.token}`
        },
        method: "patch",
        body: JSON.stringify(body)
    });

    const json = await promise.json();

    console.log(`Response: ${promise.statusText}`);
    console.log(`Response body: ${JSON.stringify(json)}`);
});

server.get('/transactions', (req, res) => {

    connection.query('SELECT * FROM transaction', function(error, results) {
        if (error)
            console.log(error);

        res.send(results);
    });
});

server.get('/categories', async (req, res) => {

    const url = `https://api.youneedabudget.com/v1/budgets/${config.ynab.budgetId}/categories`;

    console.log(`GET ${url}`);

    const promise = await fetch(url, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${config.ynab.token}`
        }
    });

    const json = await promise.json();

    console.log(`Response: ${JSON.stringify(json)}`);

    res.send(json);
});

server.listen(config.port, () => console.log(`YNOT service running with config = ${JSON.stringify(config)}`));