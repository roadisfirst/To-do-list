import React, { Component } from 'react';


import Tasks from '../components/Tasks/Tasks';
import TaskAdder from '../components/Tasks/TaskAdder/TaskAdder';

import '../components/Tasks/Task/Task.css';
import './App.css';

class App extends Component {

    state = {
      tasks: [],
      input: '',
      filter: 'Все'
    }

    changeHandler = (event) => {
      this.setState({input: event.target.value});
    }

    addTaskHandler = () => {
      if (this.state.input !== '') {
        const newTask = {
          id: Date.now() + Math.floor(Math.random() * 100),
          value: this.state.input,
          isDone: false
        }
        const updatedTasks = [...this.state.tasks];
        updatedTasks.push(newTask);
        this.setState({tasks: updatedTasks, input:''});}
      }

    deleteTaskHandler = (taskIndex) => {
      let updatedTasks = [...this.state.tasks];
      if (Array.isArray(taskIndex)){
      updatedTasks = updatedTasks.filter((e, i) => taskIndex.indexOf(i) < 0);

      } else {
        updatedTasks.splice(taskIndex, 1);
      }
      
      this.setState({tasks: updatedTasks});
    }

    keyDownHandler = (event) => {
      if(event.key === 'Enter'){
        this.addTaskHandler();
      }
    }

    isDoneHandler = (event, id) => {
      const taskIndex = this.state.tasks.findIndex(t => {
        return t.id === id;
      });
      const task = {
        ...this.state.tasks[taskIndex]
      };
      task.isDone = event.target.checked;
      const updatedTasks = [...this.state.tasks];
      updatedTasks[taskIndex] = task;
      this.setState({tasks: updatedTasks}); 
    }

    filterSetter = (filterName) => {
      this.setState({filter: filterName});
    }

    render () {

      let tasks = null;
      if (this.state.tasks !== null){
        tasks = <Tasks
                tasks={this.state.tasks}
                clicked={this.deleteTaskHandler}
                changed={this.isDoneHandler}
                setFilter={this.filterSetter}
                filter={this.state.filter} />
      }

      return (
        <div className="App">
          <h1>To do List!</h1>
          <p>Приветствуем вас в нашем приложении!</p>
          <TaskAdder
            value={this.state.input}
            changed={this.changeHandler}
            added={this.addTaskHandler}
            pressedEnter={this.keyDownHandler}>
          </TaskAdder>
          {tasks}
        </div>
      );
    }
}

export default App;