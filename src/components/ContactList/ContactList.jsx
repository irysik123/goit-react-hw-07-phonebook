import PropTypes from 'prop-types';
import { List, ListItem, Button, ContactDetail } from './ContactList.styled';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/operations';

const ContactList = ({ list }) => {
  let dispatch = useDispatch();

  const onDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <List>
      {list.map(({ id, name, phone }) => (
        <ListItem key={id}>
          <ContactDetail>{name}</ContactDetail>
          <ContactDetail>{phone}</ContactDetail>
          <Button type="button" onClick={() => onDeleteContact(id)}>Delete contact</Button>
        </ListItem>
      ))}
    </List>
  );
};

export default ContactList;

ContactList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired
    })
  ),
};

