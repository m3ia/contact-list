const ContactView = ({contactView, setContactView}) => {
  return (
    <div>
      <p>contact view name: {contactView.name}</p>
      <p>contact view number: {contactView.number}</p>
      <p>contact view name: {contactView.name}</p>
      <p>contact view name: {contactView.name}</p>
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
