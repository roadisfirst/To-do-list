import React from 'react';

import { AddOutline } from 'react-ionicons';
import './TaskAdder.css';

const TaskAdder = (props) => {

    return(
            <div className="InputContainer">
                <p>Что нужно сделать?</p>
                <div>
                    <input
                        className="input-task" 
                        type="text" 
                        id="mainInput" 
                        onChange={props.changed} 
                        placeholder='введите задание' 
                        value={props.value}
                        onKeyDown={props.pressedEnter}></input>
                    <AddOutline 
                        className="addOutline"
                        onClick={props.added} />
                </div>
            </div>
    );
};

export default TaskAdder;