#! /usr/bin/env node
require('dotenv').config() 
const { Client } = require("pg");
// const { postgres } = require("postgres")
// import postgres from 'postgres'

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  userid INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  firstname VARCHAR ( 255 ), lastname VARCHAR ( 255 ), username VARCHAR ( 255 ), password VARCHAR ( 255 ), member BOOLEAN, admin BOOLEAN
);
CREATE TABLE IF NOT EXISTS messages (
  messageid INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR ( 255 ), timestamp VARCHAR ( 255 ), message VARCHAR ( 255 ), userID INTEGER, FOREIGN KEY (userID) REFERENCES users(userid)
);`



// const sql = new Client({
//   host: process.env.DATABASE_HOST,
//   database: process.env.DATABASE_NAME,
//   username: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   ssl: 'require',
// })

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DBCONNECTION,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
