const express = require("express");

const app = express();
app.use(express.json());

const DB_NAME = "thomas_cook.db";

async function getDBConnection() {
    const db = await sqlite.open({
        filename: DB_NAME,
        driver: sqlite3.Database
    });
    return db;
}


const db = await getDBConnection();
return db;