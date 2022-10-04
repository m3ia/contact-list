const ContactView = ({contactView, setContactView}) => {
  return (
    <div>
      contact view name: {contactView.name}
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
