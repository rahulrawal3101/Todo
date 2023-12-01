'use client'
import AddIcon from '@mui/icons-material/Add';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { Alert, Box, Button, Grid, Icon, Paper, Snackbar, Typography } from '@mui/material';
import axios from 'axios';
import { Roboto } from 'next/font/google';
import { useContext, useEffect, useState } from 'react';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import BeenhereOutlinedIcon from '@mui/icons-material/BeenhereOutlined';
import { context } from '@/Global/GlobalContext';


const roboto = Roboto({
    weight: '900',
    subsets: ['latin'],
    display: "swap"
})
const roboto2 = Roboto({
    weight: '300',
    subsets: ['latin'],
    display: "swap"
})
const TaskList = ({  setOpen,snackOpen , setSnackOpen,title }) => {
      const {state,fetchData}= useContext(context)
      const [filterData,setFilterData]=useState([])


    const handleDelete =async(id)=>{
        try{
             const respData = await axios.delete(`/api/newtask/${id}`);
             console.log(respData)
             if(respData.data.message == 'Deleted Successfully'){
                fetchData();
                 setSnackOpen({...snackOpen,open:true,message:respData.data.message,color:"#2e7d32"})
             }
        }
        catch(err){
            console.log(err)
            alert(err)
        }
    }
   const fetchFilteredData=()=>{
    console.log("first",title)
        if(title == "All Tasks"){
            console.log(state.allData)
            console.log("first running")
            setFilterData(state.allData)
        }

        if(title == "In Progress"){
            // console.log(item)
            const filteredData = state.allData.filter((ele)=>{return ele.isCompleted == false});
          
            setFilterData(filteredData)
            
        }
        if(title == "Completed"){
            const filteredData = state.allData.filter((ele)=>{return ele.isCompleted == true});
           
            setFilterData(filteredData)
            
        }
        if(title == "Today"){
            
            const filteredData = state.allData.filter((ele)=>{
                const date = new Date(ele.date).getDate();
                const year = new Date(ele.date).getFullYear();
                const month = new Date(ele.date).getMonth()+1;
                  
                if(date == new Date().getDate() && year == new Date().getFullYear() && month == new Date().getMonth()+1){
                    return ele};
                })
            
                setFilterData(filteredData)
           
        }

        if(title == "Tommorow"){
            const filteredData = state.allData.filter((ele)=>{
                const date = new Date(ele.date).getDate();
                const year = new Date(ele.date).getFullYear();
                const month = new Date(ele.date).getMonth()+1;
                if(date == new Date().getDate()+1 && year == new Date().getFullYear() && month == new Date().getMonth()+1){
                    return ele};
                });
                setFilterData(filteredData)
        }
        if(title == "Month"){
            const filteredData = state.allData.filter((ele)=>{
                const year = new Date(ele.date).getFullYear();
                const month = new Date(ele.date).getMonth()+1;
                // console.log(year,month)
                if(year == new Date().getFullYear() && month == new Date().getMonth()+1){
                    return ele};
                });
                setFilterData(filteredData)
        }
   }

//    console.log("filter filter",title)

    useEffect(()=>{
        fetchFilteredData();
    },[title,state])

    // console.log(filterData)
    return (
        <>
            <Grid item xs={11} sm={8} md={9.5} lg={9.5}>
                <Box sx={{ m:{ lg:"30px",md:"30px",sm:"15px",xs:"15px"} }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box>
                            <Typography className={roboto.className} sx={{ fontSize: "35px", color: "#332a7c" }}>
                                {/* {taskData.title} <span style={{ fontSize: "16px", mt: "-20px", color: "#bdbdbd" }}>( 7 )</span> */}
                            </Typography>
                        </Box>
                        <Box sx={{}}>
                            <Button variant='contained' sx={{ bgcolor: "#332a7c", "&:hover": { bgcolor: "#332a7c" }, fontSize: "12px" }} onClick={() => { setOpen(true) }}>
                                <AddIcon sx={{ fontSize: "12px", fontWeight: "bold" }} /> new task
                            </Button>
                        </Box>
                    </Box>

                    <Grid container sx={{ mt: "40px" }} spacing={2}>
                        {
                            filterData.map((ele, index) => {
                                const date = new Date(ele.date).getDate();
                                const month = new Date(ele.date).getMonth()+1;
                                const year = new Date(ele.date).getFullYear();
                                {/* console.log("ele date",new Date(ele.date))
                                console.log("new date",new Date()) */}

                                return <Grid key={index} item lg={3} md={4} sm={6} xs={12}>
                                    <Paper sx={{ p: "10px", borderRadius: "14px" }} elevation={3}>
                                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                            <Typography sx={{ color: "#616161",textTransform:"capitalize", fontSize: "16px", fontFamily: 'cursive' }}>
                                                {ele.title}
                                            </Typography>
                                            <Icon>
                                                <DeleteForeverIcon sx={{ color: "#d50000", cursor: "pointer" }} onClick={() => { handleDelete(ele._id) }} />
                                            </Icon>
                                        </Box>
                                        <Box sx={{ height: "85px", boxSizing: "border-box", mt: "10px", overflowY: "auto" }}>
                                            <Typography className={roboto2.className} sx={{ fontSize: "12px", fontWeight: "100", flexWrap: "wrap", overflowWrap: "break-word" }}>
                                                {ele.desc}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: "flex", alignItems: "center", mt: "10px" }}>
                                            <Icon>
                                                <WatchLaterIcon sx={{ color: "#616161", fontSize: "17px" }} />
                                            </Icon>
                                            <Typography sx={{ fontSize: "13px", mt: "2px" }}>
                                                {date}/{month}/{year}
                                            </Typography>
                                            <Icon sx={{ ml: "25px" }}>
                                                <AssistantPhotoIcon sx={{ fontSize: "19px", cursor: "pointer", color: ele.importance == 'High' ? "red" : ele.importance == 'Medium' ? "orange" : "green" }} />

                                            </Icon>
                                            <Icon sx={{ ml: "8px" }}>

                                                <BeenhereOutlinedIcon sx={{ fontSize: "18px", cursor: "pointer", mt: "3px" }} />
                                            </Icon>
                                        </Box>
                                    </Paper>
                                </Grid>
                            })
                        }

                    </Grid>
                </Box>
            </Grid>
         
        </>
    )
}

export default TaskList