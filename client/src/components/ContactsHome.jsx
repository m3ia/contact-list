import {useEffect, useState} from "react";
import NewContactForm from "./NewContactForm";
import ContactView from "./ContactView";

const ContactsHome = () => {
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState({
    name: "",
    number: "",
    email: "",
    notes: "",
    photo: "",
  });
  const [contactView, setContactView] = useState({});

  const getContacts = async () => {
    await fetch("http://localhost:8080/contacts")
      .then((res) => res.json())
      .then((res) => setContacts(res));
  };

  // Add Contact
  const addNewContact = async (e) => {
    e.preventDefault();

    const newContact = {
      name: contact.name,
      number: contact.number,
      email: contact.email,
      notes: contact.notes,
      photo: contact.photo,
    };

    const res = await fetch("http://localhost:8080/newcontact", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // Sent in with the request
      body: JSON.stringify(newContact),
    });

    const content = await res.json();
    console.log("content", content);
    getContacts();

    setContact({
      name: "",
      number: "",
      email: "",
      notes: "",
      photo: "",
    });
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div className="container">
      {Object.keys(contactView).length === 0 ? (
        <div>
          <div className="title-bar">
            <h2>Contacts</h2>{" "}
            <NewContactForm
              contacts={contacts}
              setContacts={setContacts}
              contact={contact}
              setContact={setContact}
              addNewContact={addNewContact}
            />
          </div>
          <div className="contacts-list">
            {contacts.map((contact, ind) => {
              return (
                <div
                  className="contact-item"
                  key={ind}
                  onClick={() => {
                    setContactView({...contactView, ...contact});
                  }}>
                  <img
                    src={contact.photo}
                    alt="profile"
                    key={ind}
                    className="profile-photos"></img>

                  <span className="contact-names">{contact.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <ContactView
          contactView={contactView}
          setContactView={setContactView}
        />
      )}
    </div>
  );
};

export default ContactsHome;
