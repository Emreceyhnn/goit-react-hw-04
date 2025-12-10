import React from 'react';
import styles from './SearchBar.module.css';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ onChange, onSubmit }) => {
  return (
    <header className={styles.header}>
      <form className={styles.form} onSubmit={onSubmit}>
        <input
          className={styles.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onChange}
        />
        <button className={styles.button} type="submit">
          <FiSearch />
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
