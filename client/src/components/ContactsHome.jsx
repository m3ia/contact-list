import {useEffect, useState} from "react";
const ContactsHome = () => {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    const getContacts = async () => {
      await fetch("http://localhost:8080/contacts")
        .then((res) => res.json())
        .then((res) => setContacts(res));
    };
    getContacts();
  }, []);
  return (
    <div className="container">
      <div className="title-bar">
        <h2>Contacts</h2>
      </div>
      <div className="contacts-list">
        {contacts.map((contact, ind) => {
          return <p key={ind}>{contact.name}</p>;
        })}
      </div>
    </div>
  );
};

export default ContactsHome;
