import { useState } from 'react'; // хук для роботи зі станом
import css from './ContactForm.module.css'; // стилізація
import PropTypes from 'prop-types'; // типи пропсів

// компонент форми для додавання контакту
export const ContactForm =({addContact})=> {

  const [name, setName] = useState(''); // стан для імені
  const [number, setNumber] = useState(''); // стан для номера

  // функція для зміни стану імені і номера
  const onChangeInput = evt => {
    const { name, value } = evt.currentTarget;

    // змінюємо стан в залежності від імені поля
    name === 'name' ? setName(value) : setNumber(value);
  };

    return (
      <>
        <form
          className={css.formstyle}
          onSubmit={evt => {
            evt.preventDefault(); // відміняємо стандартну поведінку браузера
            addContact({ name, number }); // додаємо контакт
            setName(""); // очищаємо поля
            setNumber(""); // очищаємо поля
          }}
        >
          <label className={css.label}>
            Name
            <br />
            <input
              className={css.input}
              onChange={onChangeInput}
              value={name}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </label>
          <br />
          <label htmlFor="">
            Number
            <br />
            <input
              className={css.input}
              onChange={onChangeInput}
              value={number}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </label>
          <br />
          <button className={css.button} type="submit">
            Add contact
          </button>
        </form>
      </>
    );
}

// типи пропсів
ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired, // функція
};
