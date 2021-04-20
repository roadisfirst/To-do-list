import React from 'react';

import { RemoveOutline } from 'react-ionicons';
import './Task.css';

const task = (props) => {
    const taskClassName = (props.done) ? "Task isDone" : "Task";
    const checking = props.done;
    return (
        <div className={taskClassName}
            draggable={true}
            onDragStart={(event) => props.onDragStart(event, task)}
            onDragLeave={(event) => props.onDragLeave(event)}
            onDragEnd={(event) => props.onDragEnd(event)}
            onDragOver={(event) => props.onDragOver(event)}
            onDrop={(event) => props.onDrop(event, task)} >
            <span>
                <input type="checkbox" value={props.done} checked={checking} id="markdone" onChange={props.changed} />
                <span className="TaskValue">{props.value}</span>
            </span>
            <RemoveOutline className="removeOutline"
                onClick={props.clicked} />
        </div>
    )
};

export default task;