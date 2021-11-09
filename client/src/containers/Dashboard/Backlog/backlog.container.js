import React, { useState } from 'react';
import './style.scss';
import { ToDoHook } from '../../../utils/toDoHook';
import { Container, Grid } from '@material-ui/core';
import Task from '../../../components/Task/task.component';
import AddTask from '../../../components/AddTask/addTask.component';

const Backlog = (props) => {

  const [tasks, addNewTask, handleDelete, handleEdit, handleComplete, completedTasks] = ToDoHook();
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const { title } = props;

  const toBeCompleted = tasks.length - completedTasks()

  return (
    <Container>
      <Grid md={12}>
        <h1>Task Manager</h1>
        <h4>Per tu perfunduar: {toBeCompleted} taska; Te perfunduara {completedTasks()} taska</h4>
        {tasks.map(element => {
          return <Task handleEdit={handleEdit} toggleComplete={handleComplete} onDelete={handleDelete} key={element.id} taskData={element} />
        })}
        <div onClick={() => setIsNewTaskOpen(true)} className='addNewTask'>
          <span>+ New Task</span>
        </div>
        <div className="addNewTaskBox">
          {isNewTaskOpen && <AddTask addNewTask={addNewTask} setIsNewTaskOpen={setIsNewTaskOpen} />}
        </div>
      </Grid>
    </Container>
  )
}

export default Backlog