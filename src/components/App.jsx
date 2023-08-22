import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { Title } from './App.styled';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/operations';
import {
  selectContacts,
  selectError,
  selectFilter,
  selectIsLoading,
} from 'redux/selectors';

export default function App() {
  const dispatch = useDispatch();

  const items = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const filter = useSelector(selectFilter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <Title>Phonebook</Title>
      <ContactForm />
      <Title>Contacts</Title>
      <Filter />
      {isLoading && <div>Loading....</div>}{' '}
      {error ? (
        <div>{error}</div>
      ) : (
        <ContactList
          list={items.filter(user =>
            user.name.toLowerCase().includes(filter.toLowerCase())
          )}
        />
      )}
    </div>
  );
}
