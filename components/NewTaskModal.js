'use client'
import {  Box, Button, FormControl, Icon, InputBase, InputLabel, MenuItem, Modal, Paper, Select, Snackbar, TextareaAutosize, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'
import date from '../app/styles/scroll.module.css'
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios'
import { context } from '@/Global/GlobalContext'

const NewTaskModal = ({open , setOpen,snackOpen , setSnackOpen}) => {

  const {fetchData}=useContext(context)
 
  
  const [inputData , setInputData] =useState({
    title:"",
    desc:"",
    date:new Date(),
    importance:""
  })

  const handleClose = () => {
    setOpen(false)
  }

  const eventHandler =(e)=>{
     const {name , value}= e.target;
     setInputData({...inputData,[name]:value})
  }


  const handleSubmit =async()=>{
   
    if(inputData.date && inputData.desc && inputData.importance && inputData.title){
         const tid = JSON.parse(localStorage.getItem('tid'))
         const toSend = {...inputData,tid}
         console.log(toSend)
      try{
            const resp =await axios.post('/api/newtask',toSend);
            console.log(resp);
            if(resp.data.message == 'Task Added Successfully'){
              fetchData();
              setSnackOpen({...snackOpen,open:true,message:resp.data.message,color:"#2e7d32"});
              setInputData({
                title:"",
                desc:"",
                date:new Date(),
                importance:""
              });
              setOpen(false)

            }
            else{
              setSnackOpen({...snackOpen,open:true,message:resp.data.message,color:"#F44336"});
              setInputData({
                title:"",
                desc:"",
                date:new Date(),
                importance:""
              });
              setOpen(false)
            }
      } 
      catch(err){
        console.log(err)
        alert(err)
      }
    }
    else{
      alert('Please Fill The Details Carefully')
    }
  }

 
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}

      >
        <Paper elevation={5} sx={{ position: 'absolute',borderRadius:"14px", top: '50%', left: '50%', transform: 'translate(-50%, -50%)', p: 3, width: 400, bgcolor: 'white', height: 'fit-content', bgcolor: "white" }}>
        <Box sx={{display:"flex",justifyContent:"right"}}>
          <Icon sx={{cursor:"pointer"}} onClick={()=>{setOpen(false)}}>
             <ClearIcon sx={{color:"#616161"}}/>
          </Icon>
        </Box>
          <Box sx={{ height: "100%", width: "100%",  display: "flex", justifyContent: "Center", alignItems: "center", flexDirection: "column" }}>
            <Typography sx={{ color: "#616161", width: "100%" }}>
              Title
            </Typography>
            <InputBase name='title' value={inputData.title} placeholder='What needs be done ?' fullWidth sx={{ mt: "5px", border: "1px solid #616161",pl:"5px",fontSize:"13px" }} onChange={eventHandler}/>

            <Typography sx={{ color: "#616161", width: "100%", mt: "20px" }}>
              Decription
            </Typography>
            <TextareaAutosize name='desc' value={inputData.desc} placeholder='Decription about the task' minRows={10} style={{ paddingLeft:"3px",width: "98%", border: "1px solid #616161", marginTop: "5px" }} fullWidth sx={{ mt: "5px" }} onChange={eventHandler}/>

            <Typography sx={{ color: "#616161", width: "100%", mt: "20px" }}>
              Date picker
            </Typography>
            <Box sx={{ mt: "5px", width: "100%", p: "2px" }}>
              <DatePicker selected={inputData.date} minDate={new Date()}  onChange={(date) => {setInputData((prev)=>({...prev,date:date}))}} className={date.date} />
            
            </Box>
            <Box sx={{width:"100%",mt:"10px"}}> 
              <FormControl variant="standard" size='small' sx={{ minWidth: 120, }}>
                <InputLabel id="demo-simple-select-standard-label" sx={{}}>Importance</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                   id="demo-simple-select-standard"
                  value={inputData.importance}
                  name='importance'
                  onChange={eventHandler}
                >
              
                  <MenuItem value={'Low'}>Low </MenuItem>
                  <MenuItem value={'Medium'}>Medium</MenuItem>
                  <MenuItem value={'High'}>High</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{m:"20px 0px",width:"100%"}}>
               <Button variant='contained' fullWidth sx={{bgcolor:"#332a7c",'&:hover':{bgcolor: "#332a7c"}}} onClick={handleSubmit}>Add New Task</Button>
            </Box>
          </Box>
        </Paper>
      </Modal>
  
    </>
  )
}

export default NewTaskModal