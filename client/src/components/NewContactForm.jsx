import {useState, useEffect} from "react";
import {Button, Modal, Form} from "react-bootstrap";

function FormModal(props) {
  return (
    <Modal
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton onClick={props.onHide}>
        <Modal.Title id="contained-modal-title-vcenter">
          Add a New Contact
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>New Contact Form</h4>
        <form id="add-contact" action="#">
          <fieldset>
            <p>
              <label>Name</label>
              <br />
              <input
                type="text"
                id="add-name"
                value={props.contact.name}
                onChange={(e) => {
                  props.setContact((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }));
                }}
              />
            </p>
            <p>
              <label>Phone Number</label>
              <br />
              <input
                type="text"
                id="add-number"
                value={props.contact.number}
                onChange={(e) => {
                  props.setContact((prev) => ({
                    ...prev,
                    number: e.target.value,
                  }));
                }}
              />
            </p>
            <p>
              <label>Email</label>
              <br />
              <input
                type="text"
                id="add-email"
                value={props.contact.email}
                onChange={(e) =>
                  props.setContact((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
            </p>
            <p>
              <label>Photo</label>
              <br />
              <input
                type="text"
                id="add-photo"
                value={props.contact.photo}
                placeholder="Add photo link"
                onChange={(e) =>
                  props.setContact((prev) => ({
                    ...prev,
                    photo: e.target.value,
                  }))
                }
              />
            </p>
            <p>
              <label>Notes</label>
              <br />
              <input
                type="text"
                id="add-notes"
                value={props.contact.notes}
                onChange={(e) =>
                  props.setContact((prev) => ({
                    ...prev,
                    notes: e.target.value,
                  }))
                }
              />
            </p>
          </fieldset>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" onClick={props.onHide}>
          Close
        </Button>
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => {
            props.addNewContact(e);
            props.onHide();
          }}>
          {" "}
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function AddSightingForm({
  contacts,
  setContacts,
  contact,
  setContact,
  addNewContact,
}) {
  const [modalShow, setModalShow] = useState(false);
  // const [individuals, setIndividuals] = useState([]);
  return (
    <>
      <Button
        variant="primary"
        onClick={() => setModalShow(true)}
        className="launch-modal-btn">
        <span className="material-symbols-outlined">add</span>
      </Button>

      <FormModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        contacts={contacts}
        setContacts={setContacts}
        contact={contact}
        setContact={setContact}
        addNewContact={addNewContact}
      />
    </>
  );
}

export default AddSightingForm;
