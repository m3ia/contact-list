import {useState, useRef} from "react";
const ContactView = ({contactView, setContactView}) => {
  const [editMode, setEditMode] = useState(false);
  const [phoneUpdate, setPhoneUpdate] = useState("");
  const [contactUpdate, setContactUpdate] = useState({
    name: "",
    numbers: [],
    email: "",
    photo: "",
    notes: "",
  });

  return (
    <div className="contact-view-container">
      <div className="contact-view-menu">
        <div className="contact-view-back-btn-div">
          <span
            className="material-symbols-outlined menu-icons"
            onClick={() => {
              setContactView({});
            }}>
            arrow_back_ios
          </span>
        </div>

        <div className="contact-view-delete-btn">
          <span className="material-symbols-outlined menu-icons delete-icon">
            delete
          </span>
        </div>
      </div>
      <div className="contact-view-card">
        <div className="contact-view-photo">
          <p>
            <img
              src={contactView.photo}
              alt="profile"
              style={{
                borderRadius: "50%",
                height: 150,
                width: 150,
              }}
            />
          </p>
        </div>
        <div className="contact-view-body">
          <h3>
            {editMode ? (
              <p>
                <label>Name:</label>{" "}
                <input
                  type="text"
                  defaultValue={contactView.name}
                  onChange={(e) => {
                    setContactUpdate((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }));
                  }}
                />
              </p>
            ) : (
              contactView.name
            )}
          </h3>
          {contactView.numbers.length && contactView.numbers.length >= 2 ? (
            contactView.numbers.map((item, ind) => {
              return editMode ? (
                <p key={item.numberId}>
                  <label>Number {ind + 1}:</label>{" "}
                  <input
                    type="text"
                    defaultValue={item.number}
                    onChange={(e) => {
                      setContactUpdate((prev) => ({
                        ...prev,
                        numbers: [
                          {
                            numberId: item.numberId,
                            number: e.target.value,
                          },
                        ],
                      }));
                    }}
                  />
                </p>
              ) : (
                <p key={item.numberId}>
                  <strong>Phone Number {ind + 1}:</strong> {item.number}
                </p>
              );
            })
          ) : editMode ? (
            <p>
              <label>Name:</label>{" "}
              <input
                type="text"
                defaultValue={contactView.numbers[0].number}
                onChange={(e) => {
                  setContactUpdate((prev) => ({
                    ...prev,
                    numbers: [
                      {
                        numberId: contactView.numbers[0].numberId,
                        number: e.target.value,
                      },
                    ],
                  }));
                }}
              />
            </p>
          ) : (
            <p>
              <strong>Phone Number:</strong> {contactView.numbers[0].number}
            </p>
          )}

          {editMode ? (
            <p>
              <label>Email:</label>{" "}
              <input
                type="text"
                defaultValue={contactView.email}
                onChange={(e) => {
                  setContactUpdate((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }));
                }}
              />
            </p>
          ) : (
            <p>
              <strong>Email:</strong> {contactView.email}
            </p>
          )}

          {editMode ? (
            <p>
              <label>Notes:</label>{" "}
              <input
                type="text"
                defaultValue={contactView.notes}
                onChange={(e) => {
                  setContactUpdate((prev) => ({
                    ...prev,
                    notes: e.target.value,
                  }));
                }}
              />
            </p>
          ) : (
            <p>
              <strong>Notes:</strong>{" "}
              {contactView.notes ? contactView.notes : "none"}
            </p>
          )}
        </div>
        <div className="contact-view-footer">
          {editMode ? (
            <p>
              <span
                className="material-symbols-outlined menu-icons"
                onClick={() => setEditMode(false)}>
                cancel
              </span>
              <span className="material-symbols-outlined menu-icons">save</span>
            </p>
          ) : (
            <p>
              <span
                className="material-symbols-outlined menu-icons"
                onClick={() => setEditMode(true)}>
                edit_square
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactView;
