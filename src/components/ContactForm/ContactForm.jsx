import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';

const CONTACT_STATE = {
    name: '',
    number: '',
}

class ContactForm extends Component {
    state = {
        ...CONTACT_STATE
    } 

    handleChange = (event) => {
        const { name, value } = event.currentTarget;
        this.setState({[name]: value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
        this.reset();
    }

    reset = () => {
        this.setState({...CONTACT_STATE});
    }


    

    render() { 
        return (
            <div>
                <form className={styles.submit} onSubmit={this.handleSubmit}>
                    <label className={styles.label}>
                        Name
                        <input
                            className={styles.input}
                            type="text"
                            name="name"
                            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                            value={this.state.name}
                            onChange={this.handleChange}
                            required
                        />
                    </label>
                    <label className={styles.label}>
                    Number
                        <input
                            className={styles.input}
                            type="tel"
                            name="number"
                            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                            value={this.state.number}
                            onChange={this.handleChange}
                            required
                        />
                    </label>
                    <button
                        className={styles.btn}
                        type="submit"
                        disabled={!this.state.name && !this.state.number}
                    >
                        <span>Add contact</span> 
                    </button>
                </form>
            </div>
        );
    }
}
 
ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;