import {useEffect, useState} from "react";
import NewContactForm from "./NewContactForm";
import ContactView from "./ContactView";

const ContactsHome = () => {
  // contacts holds all contacts in an array of objects
  const [contacts, setContacts] = useState([]);
  // contact holds information for a new potential contact
  const [contact, setContact] = useState({
    name: "",
    number: "",
    email: "",
    notes: "",
    photo: "",
  });
  // contactView contains info for ONE contact that the user wants to view
  const [contactView, setContactView] = useState({});

  const getContacts = async () => {
    await fetch("http://localhost:8080/contacts")
      .then((res) => res.json())
      .then((res) => {
        // Store data in new list with objects that hold 2+ numbers
        let contactsArr = [];
        let ids = [];
        for (let item of res) {
          if (!ids.includes(item.id)) {
            ids.push(item.id);
            let contactObj = {
              id: item.id,
              name: item.name,
              numbers: [
                {
                  numberId: item.number_id,
                  number: item.number,
                },
              ],
              email: item.email,
              photo: item.photo,
              notes: item.notes,
            };
            contactsArr.push(contactObj);
          } else {
            let itemIndex = ids.indexOf(item.id);
            contactsArr[itemIndex].numbers.push({
              numberId: item.number_id,
              number: item.number,
            });
          }
        }
        setContacts(contactsArr);
      });
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
          getContacts={getContacts}
        />
      )}
    </div>
  );
};

export default ContactsHome;
