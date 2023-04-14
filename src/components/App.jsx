import { useState, useEffect } from 'react'; // пакети для роботи зі станом
import { nanoid } from 'nanoid'; // пакет для генерації ідентифікаторів
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './App.module.css'; // стилізація

const CONTACTS = 'contacts'; // ключ для localStorage

// початковий масив контактів
const initialContacts = [
  { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
  { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
  { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
  { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  // стан для контактів
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem(CONTACTS)) ?? initialContacts // якщо в localStorage є контакти, то використовуємо їх, якщо ні, то використовуємо початковий масив
  );

  // стан для фільтра
  const [filter, setFilter] = useState('');

  // зберігаємо контакти в localStorage
  useEffect(() => {
    window.localStorage.setItem(CONTACTS, JSON.stringify(contacts));
  }, [contacts]); // зберігаємо контакти в localStorage тільки коли змінюється масив контактів

  // функція для зміни стану фільтра
  const onChangeInput = evt => {
    setFilter(evt.currentTarget.value); // змінюємо стан фільтра
  };

  // функція для додавання контакту
  const addContact = ({ name, number }) => {
    if (
      contacts.some(
        value => value.name.toLocaleLowerCase() === name.toLocaleLowerCase() // перевіряємо чи є такий контакт в масиві
      )
    ) {
      alert(`${name} is alredy in contacts`); // якщо є, то виводимо повідомлення
    } else {
      // якщо немає, то додаємо новий контакт
      setContacts(old => {
        const list = [...old]; // копіюємо масив контактів

        // додаємо новий контакт
        list.push({
          id: nanoid(), // генеруємо ідентифікатор
          name: name,
          number: number,
        });
        return list; // повертаємо новий масив контактів
      });
    }
  };

  // функція для фільтрації контактів
  const filterFu = () => {
    // фільтруємо масив контактів по значенню фільтра
    const filteredContacts = contacts.filter(
      contact => contact.name.toLowerCase().includes(filter.toLowerCase()) // перевіряємо чи є в імені контакту введене значення фільтра
    );
    return filteredContacts;
  };

  // функція для видалення контакту
  const delContact = id => {
    const filtred = contacts.filter(item => item.id !== id); // фільтруємо масив контактів по ідентифікатору
    setContacts(filtred); // змінюємо стан масиву контактів
  };

  return (
    <div className={css.conteiner}>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />{' '}
      {/* компонент форми додавання контакту */}
      <h2>Contacts</h2>{' '}

      {/* Рендер за умовою */}
      {contacts.length > 0 ? (
        <>
          <Filter filter={filter} onChangeInput={onChangeInput} />
          <ContactList delContact={delContact} contacts={filterFu()} />
        </>
      ) : (
        <p>No contacts yet.</p>
      )}

    </div>
  );
};
