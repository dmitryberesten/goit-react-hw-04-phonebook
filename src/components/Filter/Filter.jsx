import css from './Filter.module.css'; // стилізація
import PropTypes from 'prop-types'; // типи пропсів

// компонент форми для фільтрації контактів
export const Filter = ({ filter, onChangeInput }) => {
  return (
    <>
      <label>
        Find contacts by name
        <br />
        <input className={css.input}
          onChange={onChangeInput} // викликаємо функцію зміни стану
          value={filter} // встановлюємо значення
          type="text"
          name="filter"
        />
      </label>
      <br />
    </>
  );
};

// типи пропсів
Filter.propTypes = {
  filter: PropTypes.string.isRequired, // рядок
  onChangeInput:PropTypes.func.isRequired // функція
};
