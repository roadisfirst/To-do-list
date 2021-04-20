import React from 'react';

import './FilterButton.css';

const FilterButton = (props) => {
    let buttonClass = (props.isPressed) ? 'Btn Toggle-btn' : 'Btn';
    return (
        <button 
            type="button" 
            className={buttonClass}
            aria-pressed={props.isPressed}
            onClick={() => props.setFilter(props.name)}>
            <span>{props.name}</span>
        </button>
    );
};

export default FilterButton;