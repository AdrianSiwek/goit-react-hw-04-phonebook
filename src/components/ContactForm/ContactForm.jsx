import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';



const ContactForm = ({onSubmit}) => {
    const[name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.currentTarget;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'number':
                setNumber(value);
                break;
            default:
                return;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({name, number});
        reset();
    }

    const reset = () => {
        setName('');
        setNumber('');
    }


    


        return (
            <div>
                <form className={styles.submit} onSubmit={handleSubmit}>
                    <label className={styles.label}>
                        Name
                        <input
                            className={styles.input}
                            type="text"
                            name="name"
                            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                            value={name}
                            onChange={handleChange}
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
                            value={number}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <button
                        className={styles.btn}
                        type="submit"
                        disabled={!name && !number}
                    >
                        <span>Add contact</span> 
                    </button>
                </form>
            </div>
        );
    }

 
ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;