import { BiSearchAlt } from '@react-icons/all-files/bi/BiSearchAlt';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={onSubmit}>
        <button type="submit" className={css.button}>
          <BiSearchAlt className={css.icon} size={25} />
          <span className={css.buttonlabel}>Search</span>
        </button>

        <input
          name="searchWord"
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="What image you want to find this time?"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
