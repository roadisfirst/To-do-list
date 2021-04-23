import React, { Component } from 'react';


import Tasks from '../components/Tasks/Tasks';
import TaskAdder from '../components/Tasks/TaskAdder/TaskAdder';

import '../components/Tasks/Task/Task.css';
import './App.css';

class App extends Component {

    state = {
      tasks: [],
      input: '',
      filter: 'Все',
      total: 0,
      currentTask: null
    }

    changeHandler = (event) => {
      this.setState({input: event.target.value});
    }

    addTaskHandler = () => {
      let total = this.state.total;
      if (this.state.input !== '') {
        const newTask = {
          id: Date.now() + Math.floor(Math.random() * 100),
          value: this.state.input,
          isDone: false,
          order: ++total
        }
        const updatedTasks = [...this.state.tasks];
        updatedTasks.push(newTask);
        this.setState({tasks: updatedTasks, input:'', total: newTask.order});
      }
    }

    deleteTaskHandler = (taskId) => {
      let updatedTasks = [...this.state.tasks];
      if (!Array.isArray(taskId)){
        taskId = [taskId];
      }
      let delTasksOrder = updatedTasks.filter(elem => taskId.indexOf(elem.id) >= 0).map(elem => elem.order);
      updatedTasks = updatedTasks.filter(elem => taskId.indexOf(elem.id) < 0);
      let newTotal = updatedTasks.length;
      updatedTasks = updatedTasks.map(elem => {
        let dec = 0;
        let order = elem.order;
        let newOrder;
        for(let i = 0; i < delTasksOrder.length; i++){
          if( delTasksOrder[i] < order){
            dec++;
          }
          newOrder = order - dec;
        elem = {
          ...elem,
          order: newOrder
        }
        return elem;
        }
       });
      this.setState({tasks: updatedTasks, total: newTotal});
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

    dragStartHandler = (event, task) => {
      this.setState({currentTask: task});
    }

    dragEndHandler = (event) => {
      event.target.closest('div.Task').classList.remove("Selected");
    }

    dragOverHandler = (event) => {
      event.preventDefault();
      event.target.closest('div.Task').classList.add("Selected");
    }

    dropHandler = (event, task) => {
      event.preventDefault();
      let taskDiv = event.target.closest('div.Task');
      if(!taskDiv) return;
      let taskList = [...this.state.tasks];
      taskList = taskList.map(t => {
        if (t.id === task.id){
          t = {...t, order: this.state.currentTask.order};
        }
        if (t.id === this.state.currentTask.id){
          t = {...t, order: task.order};
        }
        return t;
      })
      this.setState({tasks: taskList}); 
      taskDiv.classList.remove("Selected");
    }

    orderSort = (a, b) => {
      if (a.order > b.order) {
        return 1;
      } else {
        return -1;
      }
    }

    render () {

      let tasks = null;
      if (this.state.tasks !== null){
        tasks = <Tasks
                tasks={this.state.tasks}
                clicked={this.deleteTaskHandler}
                changed={this.isDoneHandler}
                setFilter={this.filterSetter}
                filter={this.state.filter}
                onDragStart={this.dragStartHandler}
                onDragLeave={this.dragEndHandler}
                onDragEnd={this.dragEndHandler}
                onDragOver={this.dragOverHandler}
                onDrop={this.dropHandler} 
                orderSort={this.orderSort} />
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