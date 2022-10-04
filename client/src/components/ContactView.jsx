const ContactView = ({contactView, setContactView}) => {
  return (
    <div>
      <p>contact view name: {contactView.name}</p>
      {contactView.numbers.length && contactView.numbers.length >= 2 ? (
        contactView.numbers.map((item, ind) => {
          return (
            <p key={ind}>
              Phone Number {ind + 1}: {item}
            </p>
          );
        })
      ) : (
        <p>Phone Number: {contactView.number}</p>
      )}
      <p>contact view email: {contactView.email}</p>
      <p>contact view notes: {contactView.notes}</p>
      <p>
        contact view photo: <img src={contactView.photo} alt="profile" />
      </p>
      <div>
        <button
          onClick={() => {
            setContactView({});
          }}>
          Back
        </button>
      </div>
    </div>
  );
};

export default ContactView;
