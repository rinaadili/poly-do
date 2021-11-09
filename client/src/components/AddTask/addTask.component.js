import React, {useEffect, useState} from 'react';
import {Card, TextField, Button, FormLabel, Box} from '@material-ui/core';
import './addTask.scss';
import {createUpdateTask} from '../../services/Tasks/tasks.services';
import {Input} from 'reactstrap';

function AddTask(props) {

  const style = {
    cardWrapper: {
      padding: '20px',
      display: 'flex',
      marginTop: '20px'
    },
    textField:{
      width:'420px'
    },
    button:{
      marginLeft: '10px'
    }
  }

  const [ text, setText ] = useState("");
  const [ desc, setDesc] = useState("");
  const [ date, setDate] = useState(null);

  const handleKeyUp =(e)=>{
    if(e.keyCode === 13){
      addNewTask(e)
    }
  }

  const addNewTask = async (e)=>{
    e.preventDefault()

    const data = {
      title:'TEEST TASKA',
      desc:'Pershkrimi i taskes se pare',
      date:date,
    }

    try{
      const response = await createUpdateTask(data)
      console.log(response);
    }catch{

    }

    const { addNewTask } = props
    addNewTask(text,desc,date)
    setText("");
    setDesc("");
    setDate(null);
  }

  return (
      <Card style={style.cardWrapper} >
        <div className="desc">
          {/*<TextField id="outlined-basic" label="Outlined" variant="outlined"  onKeyUp={handleKeyUp} value={text} onChange={onTextChange}  />*/}
          <TextField onKeyUp={handleKeyUp} value={text} onChange={(e)=>setText(e.target.value)}
                     id="standard-basic" label="Title" variant="standard"/>

          <TextField onKeyUp={handleKeyUp} value={desc} onChange={(e)=>setDesc(e.target.value)} style={style.textField}
                     id="standard-basic" label="Description" variant="standard" />
          <Input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
        </div>
        <div>
          <Button onClick={addNewTask} style={style.button} variant="contained" color="primary">Add new Task</Button>
        </div>
      </Card>
  )
}

export default AddTask;