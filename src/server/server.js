const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const fetch = require("node-fetch");

const token = 'b0ca60b27ee50a7b83b981a4790b0a0e8a4561e55a551934b82c79bafc6efbac';
const budget_id = 'e3cd993c-d8ed-41ac-9eec-6741ab2fb599';
const budget_name = 'dev';

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'ynot',
    password : 'ynot',
    database : 'ynot'
});

const server = express();
const port = 3000;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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
        '${budget_name}', '${budget_id}', '${category_name}','${category_id}', '${memo}', '${value}')`;

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

    const url = `https://api.youneedabudget.com/v1/budgets/${budget_id}/months/${date}/categories/${category_id}`;

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
            Authorization: `Bearer ${token}`
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

    const url = `https://api.youneedabudget.com/v1/budgets/${budget_id}/categories`;

    console.log(`GET ${url}`);

    const promise = await fetch(url, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    });

    const json = await promise.json();

    console.log(`Response: ${JSON.stringify(json)}`);

    //await sleep(2000);
    res.send(json);
});

server.listen(port, () => console.log(`YNOT service listening on port ${port}!`));

const fake_data = {"data":{"category_groups":[{"id":"983cedac-215c-4edc-9756-ae637ca3b861","name":"Internal Master Category","hidden":false,"deleted":false,"categories":[{"id":"ef751c58-ba9e-44c1-a610-ac7d9acc1acf","category_group_id":"983cedac-215c-4edc-9756-ae637ca3b861","name":"Inflows","hidden":false,"original_category_group_id":null,"note":null,"budgeted":0,"activity":0,"balance":0,"goal_type":null,"goal_creation_month":null,"goal_target":0,"goal_target_month":null,"goal_percentage_complete":null,"deleted":false},{"id":"edca0313-a3e6-431a-8a08-bdd8abc83dec","category_group_id":"983cedac-215c-4edc-9756-ae637ca3b861","name":"Deferred Income SubCategory","hidden":false,"original_category_group_id":null,"note":null,"budgeted":0,"activity":0,"balance":0,"goal_type":null,"goal_creation_month":null,"goal_target":0,"goal_target_month":null,"goal_percentage_complete":null,"deleted":false},{"id":"de640927-b20c-4335-9c77-3d46d9280270","category_group_id":"983cedac-215c-4edc-9756-ae637ca3b861","name":"Uncategorized","hidden":false,"original_category_group_id":null,"note":null,"budgeted":0,"activity":0,"balance":0,"goal_type":null,"goal_creation_month":null,"goal_target":0,"goal_target_month":null,"goal_percentage_complete":null,"deleted":false}]},{"id":"5958f385-81b0-45f8-bcdd-b9ce7d9503d5","name":"Credit Card Payments","hidden":false,"deleted":false,"categories":[]},{"id":"8a0a8524-503f-4084-8552-ac2f3937e83b","name":"Immediate Obligations","hidden":false,"deleted":false,"categories":[{"id":"a3c81d6f-4d53-4886-bfec-00ed7ffcb573","category_group_id":"8a0a8524-503f-4084-8552-ac2f3937e83b","name":"Rent/Mortgage","hidden":false,"original_category_group_id":null,"note":null,"budgeted":0,"activity":0,"balance":0,"goal_type":null,"goal_creation_month":null,"goal_target":0,"goal_target_month":null,"goal_percentage_complete":null,"deleted":false},{"id":"eaafb21b-4b5b-4f03-82a5-5b96969d3720","category_group_id":"8a0a8524-503f-4084-8552-ac2f3937e83b","name":"Electric","hidden":false,"original_category_group_id":null,"note":null,"budgeted":0,"activity":0,"balance":0,"goal_type":null,"goal_creation_month":null,"goal_target":0,"goal_target_month":null,"goal_percentage_complete":null,"deleted":false},{"id":"99f88e38-01ec-44d2-97a7-d0eaa68fcd3e","category_group_id":"8a0a8524-503f-4084-8552-ac2f3937e83b","name":"Water","hidden":false,"original_category_group_id":null,"note":null,"budgeted":0,"activity":0,"balance":0,"goal_type":null,"goal_creation_month":null,"goal_target":0,"goal_target_month":null,"goal_percentage_complete":null,"deleted":false},{"id":"fbd844a1-6e99-4669-9494-adc2d494d71f","category_group_id":"8a0a8524-503f-4084-8552-ac2f3937e83b","name":"Internet","hidden":false,"original_category_group_id":null,"note":null,"budgeted":0,"activity":0,"balance":0,"goal_type":null,"goal_creation_month":null,"goal_target":0,"goal_target_month":null,"goal_percentage_complete":null,"deleted":false},{"id":"db6f78f1-5095-4a5c-a647-daec4097a67d","category_group_id":"8a0a8524-503f-4084-8552-ac2f3937e83b","name":"Groceries","hidden":false,"original_category_group_id":null,"note":null,"budgeted":0,"activity":0,"balance":0,"goal_type":null,"goal_creation_month":null,"goal_target":0,"goal_target_month":null,"goal_percentage_complete":null,"deleted":false},{"id":"0fb0fc83-9dc2-43ac-91f4-94e9035bce12","category_group_id":"8a0a8524-503f-4084-8552-ac2f3937e83b","name":"Transportation","hidden":false,"original_category_group_id":null,"note":null,"budgeted":0,"activity":0,"balance":0,"goal_type":null,"goal_creation_month":null,"goal_target":0,"goal_target_month":null,"goal_percentage_complete":null,"deleted":false},{"id":"4aef7dad-002d-4a8a-bac7-def11f077ae6","category_group_id":"8a0a8524-503f-4084-8552-ac2f3937e83b","name":"Interest & Fees","hidden":false,"original_category_group_id":null,"note":null,"budgeted":0,"activity":0,"balance":0,"goal_type":null,"goal_creation_month":null,"goal_target":0,"goal_target_month":null,"goal_percentage_complete":null,"deleted":false}]},{"id":"99831861-3da6-43b9-aeef-fcd3e15b44ba","name":"True Expenses","hidden":false,"deleted":false,"categories":[{"id":"df0b9e27-1dc8-4fb2-8071-bf53778eda7d","category_group_id":"99831861-3da6-43b9-aeef-fcd3e15b44ba","name":"Auto Maintenance","hidden":false,"original_category_group_id":null,"note":null,"budgeted":0,"activity":0,"balance":0,"goal_type":null,"goal_creation_month":null,"goal_target":0,"goal_target_month":null,"goal_percentage_complete":null,"deleted":false},{"id":"8a736ab7-f8ff-4220-aacf-36b4abace33b","category_group_id":"99831861-3da6-43b9-aeef-fcd3e15b44ba","name":"Home Maintenance","hidden":false,"original_category_group_id":null,"note":null,"budgeted":0,"activity":0,"balance":0,"goal_type":null,"goal_creation_month":null,"goal_target":0,"goal_target_month":null,"goal_percentage_complete":null,"deleted":false},{"id":"d7e40bc7-0b1f-4eb1-9b01-11cf4223a277","category_group_id":"99831861-3da6-43b9-aeef-fcd3e15b44ba","name":"Renter's/Home Insurance","hidden":false,"original_category_group_id":null,"note":null,"budgeted":0,"activity":0,"balance":0,"goal_type":null,"goal_creation_month":null,"goal_target":0,"goal_target_month":null,"goal_percentage_complete":null,"deleted":false},{"id":"ea3be61b-14e3-4959-a164-a6122af08985","category_group_id":"99831861-3da6-43b9-aeef-fcd3e15b44ba","name":"Medical","hidden":false,"original_category_group_id":null,"note":null,"budgeted":0,"activity":0,"balance":0,"goal_type":null,"goal_creation_month":null,"goal_target":0,"goal_target_month":null,"goal_percentage_complete":null,"deleted":false},{"id":"070bd9e2-acc2-438b-b257-6053be7c7fdf","category_group_id":"99831861-3da6-43b9-aeef-fcd3e15b44ba","name":"Clothing","hidden":false,"original_category_group_id":null,"note":null,"budgeted":0,"activity":0,"balance":0,"goal_type":null,"goal_creation_month":null,"goal_target":0,"goal_target_month":null,"goal_percentage_complete":null,"deleted":false},{"id":"d9c56ec9-ed89-4eac-90d2-7e6fe4686e68","category_group_id":"99831861-3da6-43b9-aeef-fcd3e15b44ba","name":"Gifts","hidden":false,"original_category_group_id":null,"note":null,"budgeted":0,"activity":0,"balance":0,"goal_type":null,"goal_creation_month":null,"goal_target":0,"goal_target_month":null,"goal_percentage_complete":null,"deleted":false},{"id":"3247231d-ba26-4709-8228-86a33f03208a","category_group_id":"99831861-3da6-43b9-aeef-fcd3e15b44ba","name":"Giving","hidden":false,"original_category_group_id":null,"note":null,"budgeted":0,"activity":0,"balance":0,"goal_type":null,"goal_creation_month":null,"goal_target":0,"goal_target_month":null,"goal_percentage_complete":null,"deleted":false},{"id":"2832c4d6-acd1-49df-babf-3be771faf720","category_group_id":"99831861-3da6-43b9-aeef-fcd3e15b44ba","name":"Computer Replacement","hidden":false,"original_category_group_id":null,"note":null,"budgeted":0,"activity":0,"balance":0,"goal_type":null,"goal_creation_month":null,"goal_target":0,"goal_target_month":null,"goal_percentage_complete":null,"deleted":false},{"id":"1dfb1836-4c2f-48f5-a877-7c77669b3ef1","category_group_id":"99831861-3da6-43b9-aeef-fcd3e15b44ba","name":"Software Subscriptions","hidden":false,"original_category_group_id":null,"note":null,"budgeted":0,"activity":0,"balance":0,"goal_type":null,"goal_creation_month":null,"goal_target":0,"goal_target_month":null,"goal_percentage_complete":null,"deleted":false},{"id":"7c9c8788-a51b-43c1-89ab-409455494a0e","category_group_id":"99831861-3da6-43b9-aeef-fcd3e15b44ba","name":"Stuff I Forgot to Budget For","hidden":false,"original_category_group_id":null,"note":null,"budgeted":0,"activity":0,"balance":0,"goal_type":null,"goal_creation_month":null,"goal_target":0,"goal_target_month":null,"goal_percentage_complete":null,"deleted":false}]},{"id":"ca4e8814-0d43-43e1-989d-afe13f14c762","name":"Debt Payments","hidden":false,"deleted":false,"categories":[{"id":"e7552cb7-f620-41e0-8b4e-2f3700cb9ead","category_group_id":"ca4e8814-0d43-43e1-989d-afe13f14c762","name":"Student Loan","hidden":false,"original_category_group_id":null,"note":null,"budgeted":0,"activity":0,"balance":0,"goal_type":null,"goal_creation_month":null,"goal_target":0,"goal_target_month":null,"goal_percentage_complete":null,"deleted":false},{"id":"c1a26943-c978-499f-8f63-a6f215dc49a3","category_group_id":"ca4e8814-0d43-43e1-989d-afe13f14c762","name":"Auto Loan","hidden":false,"original_category_group_id":null,"note":null,"budgeted":0,"activity":0,"balance":0,"goal_type":null,"goal_creation_month":null,"goal_target":0,"goal_target_month":null,"goal_percentage_complete":null,"deleted":false}]},{"id":"4e5046e2-333b-4f01-ba0e-9611da6a99cd","name":"Quality of Life Goals","hidden":false,"deleted":false,"categories":[{"id":"eac60dbb-58f1-4b5a-a8ff-0801e5588762","category_group_id":"4e5046e2-333b-4f01-ba0e-9611da6a99cd","name":"Vacation","hidden":false,"original_category_group_id":null,"note":null,"budgeted":0,"activity":0,"balance":0,"goal_type":null,"goal_creation_month":null,"goal_target":0,"goal_target_month":null,"goal_percentage_complete":null,"deleted":false},{"id":"db02276d-ccd2-474e-8fac-3c874692eb40","category_group_id":"4e5046e2-333b-4f01-ba0e-9611da6a99cd","name":"Fitness","hidden":false,"original_category_group_id":null,"note":null,"budgeted":0,"activity":0,"balance":0,"goal_type":null,"goal_creation_month":null,"goal_target":0,"goal_target_month":null,"goal_percentage_complete":null,"deleted":false},{"id":"3860623e-fae6-4500-a47b-e380a4d155c3","category_group_id":"4e5046e2-333b-4f01-ba0e-9611da6a99cd","name":"Education","hidden":false,"original_category_group_id":null,"note":null,"budgeted":0,"activity":0,"balance":0,"goal_type":null,"goal_creation_month":null,"goal_target":0,"goal_target_month":null,"goal_percentage_complete":null,"deleted":false}]},{"id":"397775fe-b4f5-4793-a35e-ef45fac196a5","name":"Just for Fun","hidden":false,"deleted":false,"categories":[{"id":"a79a11c7-1bab-49d2-9f47-5e336f973b85","category_group_id":"397775fe-b4f5-4793-a35e-ef45fac196a5","name":"Dining Out","hidden":false,"original_category_group_id":null,"note":null,"budgeted":0,"activity":0,"balance":0,"goal_type":null,"goal_creation_month":null,"goal_target":0,"goal_target_month":null,"goal_percentage_complete":null,"deleted":false},{"id":"2e944617-a1c0-49cc-8c75-052f9f4342a5","category_group_id":"397775fe-b4f5-4793-a35e-ef45fac196a5","name":"Gaming","hidden":false,"original_category_group_id":null,"note":null,"budgeted":0,"activity":0,"balance":0,"goal_type":null,"goal_creation_month":null,"goal_target":0,"goal_target_month":null,"goal_percentage_complete":null,"deleted":false},{"id":"9e1d5934-5016-4878-a170-e622cff9269d","category_group_id":"397775fe-b4f5-4793-a35e-ef45fac196a5","name":"Music","hidden":false,"original_category_group_id":null,"note":null,"budgeted":0,"activity":0,"balance":0,"goal_type":null,"goal_creation_month":null,"goal_target":0,"goal_target_month":null,"goal_percentage_complete":null,"deleted":false},{"id":"7dc3b505-ad94-493e-8294-945f63c52182","category_group_id":"397775fe-b4f5-4793-a35e-ef45fac196a5","name":"Fun Money","hidden":false,"original_category_group_id":null,"note":null,"budgeted":100000,"activity":0,"balance":100000,"goal_type":null,"goal_creation_month":null,"goal_target":0,"goal_target_month":null,"goal_percentage_complete":null,"deleted":false}]},{"id":"06f3aab5-807c-486e-bee3-5f2248d53dc4","name":"Hidden Categories","hidden":false,"deleted":false,"categories":[]}],"server_knowledge":57}};