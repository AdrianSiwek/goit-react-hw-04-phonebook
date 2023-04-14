import React from 'react';
import PropTypes from 'prop-types';
import style from './Filtr.module.css';


const Filtr = ({value, onChange}) => {
    return ( 
        <label className={style.label}>
        Find contacts by name
        <input
          className={style.input}
          type="text"
          value={value}
          onChange={onChange}
        />
        </label>
     );
}


Filtr.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
 
export default Filtr;