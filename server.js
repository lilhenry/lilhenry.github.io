// These are our required libraries to make the server work.
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import countries from './public/lab_6/countries.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const dbSettings = {
  filename: './tmp/database.db',
  driver: sqlite3.Database
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// functions

async function query(db) {
  const result = await db.all('SELECT category, COUNT(restaurant_name) FROM restaurants GROUP BY category');
  return result;
}

async function dataFetch() {
  const url = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const response = await fetch(url);
  return response.json();
}

async function databaseInitialize(dbSettings) {
  try {
    const db = await open(dbSettings);
    await db.exec(`CREATE TABLE IF NOT EXISTS restaurants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      restaurant_name TEXT,
      category TEXT)
      `);
    const data = await dataFetch();
    data.forEach((entry) => {
      const restaurant_name = entry.name;
      const category = entry.category;
      db.exec(`INSERT INTO restaurants (restaurant_name, category) VALUES ("${restaurant_name}", "${category}")`); // need await
    })
    const test = await db.get('SELECT * FROM restaurants');
    console.log('Success');
  }
  catch (e) {
    console.log('Error loading Database');
  }
}

databaseInitialize(dbSettings);

// endpoints

app.route('/api')
  .get((req, res) => {
    console.log('GET request detected');
    res.send(`Lab 5 for ${process.env.NAME}`);
  })
  .post(async (req, res) => {
    console.log('POST request detected');
    console.log('Form data in res.body', req.body);
    const data = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
    const json = await data.json();
    console.log(json);
    res.json(json);
  });

app.route('/sql')
  .get((req, res) => {
    console.log('GET detected');
  })
  .post(async (req, res) => {
    console.log('POST request detected');
    console.log('Form data in res.body', req.body);
    const db = await open(dbSettings);
    const output = await query(db);
    res.json(output);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});