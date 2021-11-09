import React, { useState } from 'react'
import { Checkbox, Card, Button, TextField } from '@material-ui/core'
import { Delete, Edit, Save, Cancel } from '@material-ui/icons'
import {Input} from 'reactstrap';

function Task(props) {

  const style = {
    cardContainer:{
      display: 'flex',
      paddingLeft: '20px',
      justifyContent:'space-between'
    },
    buttonsContainer:{
      marginTop:'10px',
      marginRight: '20px'
    }
  }

  const[ isEditMode, setIsEditMode ] = useState(false);
  const[ text, setText ] = useState(props.taskData.text);
  const[ desc, setDesc ] = useState(props.taskData.desc);
  const[ date, setDate ] = useState(props.taskData.date);
  const { taskData } = props;

  const handleDeleteButton = ()=> {
    const { taskData, onDelete } = props
    onDelete(taskData.id)
  }

  const handleCheckBox = () =>{
    const { taskData, toggleComplete } = props
    toggleComplete(taskData.id)
  }
  const handleEditButton = () => {
    setIsEditMode(!isEditMode)
  }

  const handleSave = ()=>{
    const { taskData, handleEdit } = props
    handleEdit(taskData.id, text,desc,date);
    handleEditButton();
  }
  return (
      <>
        {isEditMode ?
            <Card style={style.cardContainer}>
              <TextField
                  onChange={(e)=>setText(e.target.value)}
                  value={text} />
              <TextField
                  onChange={(e)=>setDesc(e.target.value)}
                  value={desc} />
              <Input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
              <div style={style.buttonsContainer}  >
                <Button
                    onClick={handleEditButton}
                    variant="contained"
                    color="primary"
                    startIcon={<Cancel />}
                />
                <Button
                    onClick={handleSave}
                    variant="contained"
                    color="primary"
                    startIcon={<Save />}
                />
              </div>
            </Card>
            :
            <Card style={style.cardContainer}>
              <h3>{taskData.text}</h3>
              <h3>{taskData.desc}</h3>
              <h3>{taskData?.date}</h3>
              <div style={style.buttonsContainer}>
                <Checkbox
                    onClick={handleCheckBox}
                    checked={taskData.isComplete} />
                <Button
                    onClick={handleDeleteButton}
                    variant="contained"
                    color="secondary"
                    startIcon={<Delete />}
                />
                <Button
                    onClick={handleEditButton}
                    variant="contained"
                    color="primary"
                    startIcon={<Edit />}
                />
              </div>
            </Card>
        }
      </>
  )
}

export default Task