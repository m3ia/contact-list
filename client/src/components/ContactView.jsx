const ContactView = ({contactView, setContactView}) => {
  return (
    <div className="contact-view-container">
      <div className="contact-view-menu">
        <span
          className="material-symbols-outlined"
          onClick={() => {
            setContactView({});
          }}>
          arrow_back_ios
        </span>
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
          <h3>{contactView.name}</h3>
          {contactView.numbers.length && contactView.numbers.length >= 2 ? (
            contactView.numbers.map((item, ind) => {
              return (
                <p key={ind}>
                  <strong>Phone Number {ind + 1}:</strong> {item}
                </p>
              );
            })
          ) : (
            <p>
              <strong>Phone Number:</strong> {contactView.number}
            </p>
          )}
          <p>
            <strong>Email:</strong> {contactView.email}
          </p>
          <p>
            <strong>Notes:</strong>{" "}
            {contactView.notes ? contactView.notes : "none"}
          </p>
        </div>
        <div className="contact-view-footer"></div>
      </div>
    </div>
  );
};

export default ContactView;
