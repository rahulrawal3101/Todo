'use client'
import { context } from '@/Global/GlobalContext';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Alert, Box, Grid, Snackbar, Typography } from '@mui/material';
import { Roboto } from 'next/font/google';
import { useContext, useState } from 'react';
import NewTaskModal from './NewTaskModal';
import TaskList from './TaskList';



const roboto4 = Roboto({
    weight:'500',
    subsets:['latin-ext'],
    display:"swap"
  })
  const roboto = Roboto({
    weight:'900',
    subsets:['latin'],
    display:"swap"
  })

  const roboto2 = Roboto({
    weight:'300',
    subsets:['latin'],
    display:"swap"
  })

const MiddlePartHome = () => {
    const {state , dispatch} = useContext(context)
    const [open , setOpen]=useState(false)
    const [ title , setTitle]=useState('All Tasks')
   
    const [snackOpen , setSnackOpen]=useState({
        open:false,
        message:"",
        color:""
      })

    const filters = [
        {
            name:"All Tasks",
            icons:<DescriptionOutlinedIcon sx={{ mr: "7px", fontSize: "25px", }} />
        },
        {
            name:"In Progress",
            icons:<DescriptionOutlinedIcon sx={{ mr: "7px", fontSize: "25px", }} />
        },
        {
            name:"Completed",
            icons:<DescriptionOutlinedIcon sx={{ mr: "7px", fontSize: "25px", }} />
        },
        {
            name:"Today",
            icons:<DescriptionOutlinedIcon sx={{ mr: "7px", fontSize: "25px", }} />
        },
        {
            name:"Tommorow",
            icons:<DescriptionOutlinedIcon sx={{ mr: "7px", fontSize: "25px", }} />
        },
        {
            name:"Month",
            icons:<DescriptionOutlinedIcon sx={{ mr: "7px", fontSize: "25px", }} />
        }
    ]

    
    // console.log("mainPage",filterData)
    // console.log("asdas",state.allData)

    const handleChange =(item)=>{
        setTitle(item)
      
    }


    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSnackOpen(false);
      };

    
  
    return (
        <>

        <Grid container sx={{ height: "90dvh",justifyContent:"center" }}>
            <Grid item lg={2.5} md={2.5} sm={4} xs={12} sx={{ borderRight: "1px solid #e0e0e0", }}>
                <Box sx={{ mt: "30px",p:"7px"  }}>
                    <Typography   sx={{ textAlign:{lg:"left",md:"left",sm:"left",xs:"center"},fontSize: "15px", userSelect: "none", cursor: "pointer", color: "#bdbdbd" }}>
                        Tasks Management
                    </Typography>
                </Box>
                <Box sx={{display:{xs:"flex",sm:"block",md:"block",lg:"block"},alignItems:"center",p:"7px",overflow:"auto",bgcolor:{xs:"#eeeeee",sm:"white",md:"white",lg:"white"}}}>
                {
                    filters.map((ele,index)=>{
                        return(
                            <Box key={index} sx={{ m:{ lg:"15px",md:"15px",sm:"15px",xs:"10px"},width:"fit-content",p:"10px 35px 10px 10px",borderRadius:"7px",'&:hover':{border:"1px solid #332a7c"},ml:{xs:"0px",sm:"15px",md:"20px",lg:"20px"}, border: title == ele.name?"1px solid #332a7c":"1px solid white" }} onClick={()=>{handleChange(ele.name)}}>
                               <Typography className={roboto4.className} sx={{ userSelect:"none",cursor:"pointer",whiteSpace:"nowrap",fontSize: "19px", display: "flex", alignItems: "center", color:title == ele.name?" #332a7c":"#616161" }} >{ele.icons}{ele.name}</Typography>
                            </Box>
                        )
                    })
                }
                   
                </Box>
            </Grid>
             <TaskList open={open}  snackOpen={snackOpen} setSnackOpen={setSnackOpen}  setOpen={setOpen} title={title}  setTitle={setTitle}/>
        </Grid>
        <NewTaskModal open={open} setOpen={setOpen}  snackOpen={snackOpen} setSnackOpen={setSnackOpen}/>
       
        <Snackbar open={snackOpen.open} autoHideDuration={2000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} sx={{ width:'100%',bgcolor:snackOpen.color,color:"white"}}>
            {snackOpen.message}
        </Alert>
      </Snackbar>
         </>
    )
}

export default MiddlePartHome