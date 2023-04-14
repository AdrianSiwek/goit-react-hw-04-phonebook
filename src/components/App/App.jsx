import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import ContactForm from '../ContactForm/ContactForm'
import Filtr from '../Filtr/Filtr';
import ContactList from '../ContactList/ContactList';
import { nanoid } from 'nanoid';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );

  const [filter, setFilter] = useState("");
  

  useEffect(() => {
        localStorage.setItem("contacts", JSON.stringify(contacts));
    }, [contacts]);



  const addContact = ({ name, number }) => {
        const normalizedCase = name.toLowerCase();
        let isAdded = false;

        contacts.forEach((el) => {
            if (el.name.toLowerCase() === normalizedCase) {
                alert(`${name} is already in contacts`);
                isAdded = true;
            }
        });

        if (isAdded) {
            return;
        }
        const contact = {
            id: nanoid(),
            name: name,
            number: number,
        };
        setContacts((prevContact) => 
            [...prevContact, contact],
        );
    };

  const deleteContact = contactId => {
    setContacts(prevState => 
      prevState.filter(contact => contact.id !== contactId),
    );
  };

  const changeFiltr = (event) => {
    setFilter(event.currentTarget.value)
  }

  const getFiltersContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts
      .map(
        contact =>
          contact.name.toLowerCase().includes(normalizedFilter) && contact
      )
      .filter(contact => contact !== false);
  };



    return (
      <div className={styles.form}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <h2>Contacts</h2>
        <Filtr value={filter} onChange={changeFiltr} />
        <ContactList
          contacts={getFiltersContacts()}
          onDeleteContact={deleteContact}
        />
      </div>
    );
  }

 
