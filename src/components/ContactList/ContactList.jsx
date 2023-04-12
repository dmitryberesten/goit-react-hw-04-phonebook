import PropTypes from 'prop-types'; // типи пропсів
import css from './ContactList.module.css'; // стилізація

// компонент списку контактів
export const ContactList = ({ contacts, delContact }) => {
  return (
    <ul className={css.list}>

      {/* рендеримо список контактів */}
      {contacts.map(contact => {
        return (
          <li className={css.item} key={contact.id}> {/* використовуємо ідентифікатор контакту як ключ */}
            <span>{contact.name}:</span>
            <span className={css.number}> {contact.number}</span>
            <button
              className={css.button}
              type="button"
              onClick={() => {
                delContact(contact.id); // викликаємо функцію видалення контакту
              }}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

// типи пропсів
ContactList.propTypes = {
  delContact: PropTypes.func.isRequired, // функція
  contacts:PropTypes.array.isRequired // масив
};

