import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContactList.module.css';


const ContactList = ({ contacts, onDeleteContact }) => (
  <ul className={styles.list}>
    {contacts.map(({ id, name, number }) => (
      <li className={styles.contact} key={id}>
        <p>{name}:</p>
        <p>{number}</p>
        <button
          className={styles.btn}
          type="button"
          onClick={() => onDeleteContact(id)}
        >
          <span>Delete</span> 
        </button>
      </li>
    ))}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf
    (PropTypes.exact({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    })),
  onDeleteContact: PropTypes.func.isRequired,
};
 
export default ContactList;