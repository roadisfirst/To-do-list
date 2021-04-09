import React from 'react';

import Task from './Task/Task';
import { TrashOutline } from 'react-ionicons';

import './Tasks.css';

const tasks = (props) => {
    const undoneTasksCount = props.tasks.filter(task => !task.isDone).length;
    
    const doneTasksIndexes = [];
    props.tasks.map((task, index) => {
        task.isDone && doneTasksIndexes.push(index);
    });
    return (
        <div className="AllTasksContainer">
            {props.tasks.map((task, index) => {
                return <Task
                  clicked={() => props.clicked(index)}
                  changed={(event) => props.changed(event, task.id)} 
                  value={task.value}
                  key={task.id}
                  done={task.isDone}
                  animation={props.animation}
                  startAnimation={() => props.startAnimation()}
                  stopAnimation={() => props.stopAnimation()} />
              }).reverse() }
            <p>Количество невыполненых дел <strong>{undoneTasksCount}</strong></p>
            <p>Удалить все выполненные дела
                <TrashOutline
                    className="trashOutline"
                    onClick={() => {props.clicked(doneTasksIndexes)}} />
            </p>
        </div>
    )
           
};

export default tasks;