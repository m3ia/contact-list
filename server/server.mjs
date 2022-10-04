import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import pgPromise from 'pg-promise';

const app = express();
const PORT = 8080;
const pgp = pgPromise({});
const db = pgp('postgres://localhost:5432/contactlist')

app.use(cors());
app.use(bodyParser.json());
app.listen(PORT, () => {
  console.log(`Hola this server is running on port ${PORT}`);
});
app.get('/', (req, res) => {
  res.json('Hello from Techtonica');
});

// GET - All Contacts --------------------------------------------------------
app.get('/contacts', async function (req, res) {
  try {
    const contacts = await db.any('SELECT * FROM contacts ORDER BY id');
    res.send(contacts);
  } catch (e) {
    return res.status(400).json({ e });
  }
});