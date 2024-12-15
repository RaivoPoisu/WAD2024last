// Importime vajalikud moodulid
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const cors = require('cors');

// Loome Express serveri
const app = express();
const port = 3000;

// PostgreSQL andmebaasi ühendus
const pool = new Pool({
  user: 'postgres',       // Sinu PostgreSQL kasutajanimi
  host: 'localhost',      // PostgreSQL serveri aadress
  database: 'wad2024db',  // Sinu andmebaasi nimi
  password: 'test123456789',   // PostgreSQL parool
  port: 5433,             // PostgreSQL port
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Secret key JWT jaoks
const secretKey = 'your_jwt_secret';

// Automaatne tabelite loomine
const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        body TEXT NOT NULL,
        image_url TEXT,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Andmebaasi tabelid loodud või olemas.');
  } catch (error) {
    console.error('Viga tabelite loomisel:', error);
  }
};

// Käivitame tabelite loomise funktsiooni
initDB();

// Testime serverit
app.get('/', (req, res) => {
  res.send('Server töötab!');
});

// Postituste lisamine (koos pildi URL-iga)
app.post('/posts', async (req, res) => {
  const { body, image_url } = req.body;
  try {
    await pool.query('INSERT INTO posts (body, image_url) VALUES ($1, $2)', [body, image_url]);
    res.status(201).send('Post lisatud!');
  } catch (error) {
    res.status(500).send('Postituse lisamine ebaõnnestus!');
  }
});

// GET /posts - tagastab kõik postitused
app.get('/posts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts ORDER BY date DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).send('Postituste laadimine ebaõnnestus!');
  }
});

app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email ja parool on kohustuslikud!');
  }

  try {
    // Krüpteerime parooli
    const hashedPassword = await bcrypt.hash(password, 10);

    // Salvestame krüpteeritud parooli andmebaasi
    await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [
      email,
      hashedPassword,
    ]);

    res.status(201).send('Kasutaja registreerimine edukas!');
  } catch (error) {
    console.error('Registreerimise viga:', error);
    res.status(500).send('Registreerumine ebaõnnestus!');
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email ja parool on kohustuslikud!');
  }

  try {
    // Kontrollime, kas kasutaja eksisteerib
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).send('Vale email või parool!');
    }

    // Võrdleme sisestatud parooli krüpteeritud parooliga
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send('Vale email või parool!');
    }

    // Edukas sisselogimine
    res.status(200).send('Sisselogimine edukas!');
  } catch (error) {
    console.error('Sisselogimise viga:', error);
    res.status(500).send('Sisselogimine ebaõnnestus!');
  }
});

// Käivitame serveri
app.listen(port, () => {
  console.log(`Server töötab: http://localhost:${port}`);
});


