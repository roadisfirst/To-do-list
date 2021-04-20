import React from 'react';

import Task from './Task/Task';
import { TrashOutline } from 'react-ionicons';
import FilterButton from '../FilterButton/FilterButton';

import './Tasks.css';

const FILTER_MAP = {
    Все: () => true,
    Активные: task => !task.isDone,
    Завершенные: task => task.isDone
  };

const FILTER_NAMES = Object.keys(FILTER_MAP);

const tasks = (props) => {
    const undoneTasksCount = props.tasks.filter(task => !task.isDone).length;

    const doneTasksIds = [];
    props.tasks.map((task, index) => {
        task.isDone && doneTasksIds.push(task.id);
    });
    
    const filterList = FILTER_NAMES.map(name => (
        <FilterButton 
        key={name} 
        name={name}
        isPressed={name === props.filter}
        setFilter={() => props.setFilter(name)} 
        />
      ));
    return (
        <div className="AllTasksContainer">
            {props.tasks.filter(FILTER_MAP[props.filter])
            .sort(props.orderSort)
            .map((task, index) => {
                return <Task
                    clicked={() => props.clicked(task.id)}
                    changed={(event) => props.changed(event, task.id)}
                    value={task.value}
                    key={task.id}
                    done={task.isDone}
                    onDragStart={(event) => props.onDragStart(event, task)}
                    onDragLeave={(event) => props.onDragLeave(event)}
                    onDragEnd={(event) => props.onDragEnd(event)}
                    onDragOver={(event) => props.onDragOver(event)}
                    onDrop={(event) => props.onDrop(event, task)} />
              }).reverse() }
            <div className="AllTasksContainerInfo">
                <p>Количество активных дел <strong>{undoneTasksCount}</strong></p>
                {filterList}
                <p>Удалить все завершенные дела
                    <TrashOutline
                        className="trashOutline"
                        onClick={() => {props.clicked(doneTasksIds)}} />
                </p>
            </div>
        </div>
    )
};

export default tasks;