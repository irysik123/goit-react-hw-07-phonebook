import { nanoid } from 'nanoid';
import { Formik } from 'formik';
import { Container, Button } from './ContactForm.styled';
import { useDispatch } from 'react-redux';
import { addContact } from 'redux/operations';

export default function ContactForm() {
  let dispatch = useDispatch();

  const addNewContact = ({ name, phone }) => {
    const newContact = {
      id: nanoid(),
      name,
      phone,
    };
    dispatch(addContact(newContact));
  };

  return (
    <Formik
      initialValues={{ name: '', phone: '' }}
      validate={values => {
        const errors = {};
        if (!values.name) {
          errors.name = 'Required';
        } else if (
          !/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/i.test(
            values.name
          )
        ) {
          errors.name = 'Invalid Name';
        }
        if (!values.phone) {
          errors.phone = 'Required';
        } else if (
          !/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/i.test(
            values.phone
          )
        ) {
          errors.phone = 'Invalid Phonenumber';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        addNewContact(values);
        setSubmitting(true);
        resetForm();
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <Container>
            <p>Name</p>
            <input
              type="text"
              name="name"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={handleChange}
              value={values.name}
              onBlur={handleBlur}
            />
            {errors.name && touched.name && errors.name}
          </Container>

          <Container>
            <p>Number</p>
            <input
              type="tel"
              name="phone"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={handleChange}
              value={values.phone}
              onBlur={handleBlur}
            />
            {errors.phone && touched.phone && errors.phone}
          </Container>

          <Button type="submit" disabled={isSubmitting}>
            Add contact
          </Button>
        </form>
      )}
    </Formik>
  );
}
