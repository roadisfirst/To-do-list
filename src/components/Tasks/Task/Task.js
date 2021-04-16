import React from 'react';

import { RemoveOutline } from 'react-ionicons';
import './Task.css';

const task = (props) => {
    const taskClassName = (props.done) ? "Task isDone" : "Task";
    const checking = props.done;
    return (
        <div className={taskClassName}>
            <span>
                <input type="checkbox" value={props.done} checked={checking} id="markdone" onChange={props.changed}/>
                <span className="TaskValue">{props.value}</span>
            </span>
            <RemoveOutline className="removeOutline"
                onClick={props.clicked} />
        </div>
    )
};

export default task;