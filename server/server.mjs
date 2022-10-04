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
    const contacts = await db.any('SELECT contacts.id, contacts.name, numbers.number, emails.email, contacts.photo, contacts.notes FROM numbers LEFT JOIN contacts ON contacts.id=numbers.contact_id LEFT JOIN emails ON contacts.id=emails.contact_id ORDER BY contacts.id DESC;');
    res.send(contacts);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// POST - Add New Contact -----------------------------------------------------
app.post('/newcontact', async (req, res) => {
  const contact = {
    name: req.body.name,
    number: req.body.number,
    email: req.body.email,
    notes: req.body.notes,
    photo: req.body.photo,
  };
  try {
    const createdContact = await db.one(
      'INSERT INTO contacts (name, photo, notes) VALUES ($1, $2, $3) RETURNING * ',
      [contact.name, contact.photo, contact.notes]
    );
    
    await db.one(`INSERT INTO numbers (number, contact_id) VALUES ($1, ${createdContact.id}) RETURNING * `, [contact.number]);
    
    await db.one(`INSERT INTO emails (email, contact_id) VALUES ($1, ${createdContact.id}) RETURNING * `, [contact.email]);
    res.send(createdContact);
    
  } catch (e) {
    return res.status(400).json({ e });
  }
});