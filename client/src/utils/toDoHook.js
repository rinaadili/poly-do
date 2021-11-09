import React from 'react'
import {useState} from 'react'

function ToDoHook() {

  const[tasks, setTasks]=useState([{id: 1,text:'To Do Task 1', isComplete: false}]);

  const addNewTask =(text,desc,date) =>{
    if(text !== ""){
      const newTask = {
        id: 1,
        text,
        desc,
        date,
        isComplete: false
      }

      setTasks([
        ...tasks,
        newTask
      ]);
    }
  }

  const handleDelete = (id)=>{
    const newTasks = tasks.filter((element)=>{
      if(element.id === id){
        return false
      }
      return true
    })
    setTasks(newTasks)
  }

  const handleEdit = (id,text,desc,date) => {

    const newTasks = tasks.map((element)=>{
      if(element.id === id){
        element.text = text;
        element.desc = desc;
        element.date = date;
      }
      return element
    })
    setTasks(newTasks);
  }

  const handleComplete = (id) =>{
    const newTasks = tasks.map((element)=>{
      if(element.id === id){
        element.isComplete = !element.isComplete;
      }
      return element
    })
    setTasks(newTasks);
  }

  const completedTasks = ()=> tasks.reduce((prevValue, element)=>{
    if(element.isComplete){
      return prevValue + 1
    }else{
      return prevValue
    }
  }, 0)

  return [tasks,addNewTask, handleDelete, handleEdit, handleComplete,completedTasks]
}

export {ToDoHook}