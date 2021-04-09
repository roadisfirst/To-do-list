import React from 'react';
import PropTypes from 'prop-types';

import { RemoveOutline } from 'react-ionicons';



const task = (props) => {
    let taskClassName = "Task";
    if (props.done) {
        taskClassName = "Task isDone";
    }
    return (
        <div className={taskClassName}>
            <p onChange={props.changed}>
                <input type="checkbox" value={true} id="markdone"/>
                Task: {props.value}
                    <RemoveOutline className="removeOutline"
                        onClick={props.clicked} /> 
            </p>
        </div>
    )

};

export default task;