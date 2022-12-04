import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import Notiflix from 'notiflix';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };


  addContact = newContact => {
    const FoundContact = this.state.contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (FoundContact) {
      Notiflix.Notify.failure(`${newContact.name} is already in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };


  deleteContact = ({ id }) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };


  filterChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };


  filterContacts = () => {
    const filteredContacts = this.state.contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(this.state.filter.trim().toLowerCase());
    });
    return filteredContacts;
  };


  render() {
    const { contacts } = this.state;

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} contacts={contacts} />
        <h2>Contacts</h2>
        <Filter filterChange={this.filterChange} />
        {contacts.length > 0 && (
          <ContactList
            contacts={this.filterContacts()}
            deleteContact={this.deleteContact}
            filter={this.filter}
          />
        )}
      </div>
    );
  }
}


export default App;
