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
    const contacts = await db.any('SELECT contacts.id, contacts.name, numbers.id AS number_id, numbers.number, emails.email, emails.id AS email_id, contacts.photo, contacts.notes FROM numbers LEFT JOIN contacts ON contacts.id=numbers.contact_id LEFT JOIN emails ON contacts.id=emails.contact_id ORDER BY contacts.id');
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

// PATCH - Edit Contact ---------------------------------------------------
app.patch('/contacts/:id', async (req, res) => {
  // Update contact info
  const contactReq = {
    id: req.body.id,
    email: req.body.email,
    name: req.body.name, 
    notes: req.body.notes, 
    photo: req.body.photo, 
  };

  try {
    // Update numbers
    for (let item of req.body.numbers) {
      const numbersUpdate = await db.one(`UPDATE numbers SET number = $1 WHERE id = $2 RETURNING *`, [item.number, item.numberId]);
      console.log('Updated number: ', numbersUpdate);
    }

    // Update email
    const emailUpdate = await db.one(`UPDATE emails SET email = $1 WHERE contact_id = $2 RETURNING *`, [contactReq.email, contactReq.id]);
    console.log('Updated email: ', emailUpdate);

    const contactUpdate = await db.one(
      `UPDATE contacts SET name = $1, notes = $2, photo = $3 WHERE id=$4 RETURNING *`,
      [contactReq.name, contactReq.notes, contactReq.photo, contactReq.id]
    );

    console.log('Updated contact: ', contactUpdate);
    res.send(204)
  } catch (e) {
    console.log('e: ', e)
    return res.status(400).json({ e });
  }
});

// DELETE - Delete Contact ------------------------------

app.delete('/contacts/:id', async (req, res) => {
  // : acts as a placeholder
  const contactId = req.params.id;
  try {
    await db.none('DELETE FROM numbers WHERE contact_id=$1', [contactId]);
    await db.none('DELETE FROM emails WHERE contact_id=$1', [contactId]);
    await db.none('DELETE FROM contacts WHERE id=$1', [contactId]);
    res.send(204);
  } catch (e) {
    return res.status(400).json({ e });
  }
});