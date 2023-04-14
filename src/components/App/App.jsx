import React, { Component } from 'react';
import styles from './App.module.css';
import ContactForm from '../ContactForm/ContactForm'
import Filtr from '../Filtr/Filtr';
import ContactList from '../ContactList/ContactList';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  } 
  



  addContact = ({ name, number }) => {
        const normalizedCase = name.toLowerCase();
        let isAdded = false;

        this.state.contacts.forEach((el) => {
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
        this.setState((prevState) => ({
            contacts: [...prevState.contacts, contact],
        }));
    };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFiltr = (event) => {
    this.setState({filter: event.currentTarget.value})
  }

  getFiltersContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();

    return this.state.contacts
      .map(
        contact =>
          contact.name.toLowerCase().includes(normalizedFilter) && contact
      )
      .filter(contact => contact !== false);
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsContacts = JSON.parse(contacts);
    if (parsContacts) {
      this.setState({contacts: parsContacts});
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }
}

  render() { 
    const filtredContacts = this.getFiltersContacts();
    const contact = this.addContact;
    const filter = this.changeFiltr;
    const delet = this.deleteContact;
    const value = this.state.filter;
    
    return (
      <div className={styles.form}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={contact} />
        <h2>Contacts</h2>
        <Filtr value={value} onChange={filter} />
        <ContactList
          contacts={filtredContacts}
          onDeleteContact={delet}
        />
      </div>
    );
  }
}
 
