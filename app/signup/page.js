'use client'
import { Box, Button, Grid, InputBase, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';


const SignUp = () => {
    const router = useRouter();
    const [registerData, setRegisterData] = useState({
        fullName:'',
        email:'',
        password:'',
        confirmPassword:'' 
    });
    const registerHandler=(e)=>{
        const{name,value} = e.target;
        setRegisterData({...registerData,[name]:value})
    }

    const loginHandler=()=>{
        router.push('/login')
    };
    // console.log(registerData)

    const handleRegister =async()=>{
        // console.log("trycatch",registerData)
        if(registerData.fullName !=='' && registerData.email !=='' && registerData.confirmPassword !=='' && registerData.password !==''){
            if(registerData.password == registerData.confirmPassword){
                try{
                    const resp = await axios.post('/api/registeruser',registerData)
                    console.log("trycatch",resp)
                    if(resp.data.message == "Successfully Registered"){
                       router.push('/login')
                    }
                    if(resp.data.message == 'This Email is Already Registered'){
                       alert(resp.data.message)
                    }
                 }
                 catch(err){
                     console.log(err)
                     alert(err)
                 }
            }
            else{
                alert('Confirmed Password has to be same')
            }
        }
        else{
            alert('Please fill the form fully')
        }
       
    }
    return (
        <>
            <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: { lg: 'center', md: 'center', sm: 'center', xs: 'flex-start' }, height: '100vh', bgcolor: '#c4c4c4' }}>
                <Grid item lg={7} md={8} sm={9.5} xs={12} sx={{ height: { lg: '60%', md: '60%', sm: '60%', xs: '100%' }, borderRadius: { lg: '10px', md: '10px', sm: '10px', xs: '0px' } }}>
                    <Paper sx={{ height: '100%', borderRadius: { lg: '10px', md: '10px', sm: '10px', xs: '0px' }, }} elevation={2}>
                        <Grid container sx={{ height: { lg: '100%', md: '100%', sm: '100%', xs: '50%' }, borderRadius: { lg: '10px', md: '10px', sm: '10px', xs: '0px' }, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>

                            <Grid item lg={6} md={6} sm={6} xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between' }}>

                                <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: { lg: '10px', md: '10px', sm: '18px', xs: '18px' } }}>
                                    <Grid item xs={10} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Box sx={{ width: '100%', border: '1px solid lightgrey', p: '7px', borderRadius: '8px' }}>
                                            <InputBase placeholder='Username' sx={{ color: 'black', fontSize: '17px' }} size='small' onChange={registerHandler} name='fullName' value={registerData.fullName}/>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={10} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Box sx={{ width: '100%', border: '1px solid lightgrey', p: '7px', borderRadius: '8px', mt: '10px' }}>
                                            <InputBase placeholder='Email' type='email' sx={{ color: 'black', fontSize: '17px' }} size='small' onChange={registerHandler} name='email' value={registerData.email}/>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={10} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Box sx={{ width: '100%', border: '1px solid lightgrey', p: '7px', borderRadius: '8px', mt: '10px' }}>
                                            <InputBase placeholder='Password' type='password' sx={{ color: 'black', fontSize: '17px' }} size='small' onChange={registerHandler} name='password' value={registerData.password}/>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={10} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Box sx={{ width: '100%', border: '1px solid lightgrey', p: '7px', borderRadius: '8px', mt: '10px' }}>
                                            <InputBase placeholder='Confirm Password'type='password' sx={{ color: 'black', fontSize: '17px' }}size='small'  onChange={registerHandler} name='confirmPassword' value={registerData.confirmPassword}/>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={10} sx={{ mt:{lg:'50px', md:'50px', sm:'40px', xs:'40px'}, pb:{lg:'0px', md:'0px', sm:'20px', xs:'20px'}}}>
                                    <Box sx={{width:'100%',}}>
                                        <Button variant='contained' sx={{bgcolor:'#03015d', width:'100%',fontSize:'15px','&:hover':{bgcolor:'#03015d'},border:"1px solid red" }} size='large' onClick={handleRegister}>Sign Up</Button>
                                    </Box>
                                    
                                    </Grid>
                                </Grid>

                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={12} sx={{ bgcolor: '#03015d', height: '100%', borderRadius: { lg: '10px', md: '10px', sm: '10px', xs: '0px' }, p: '50px 40px', }}>
                                <Typography sx={{ fontSize: '40px', fontWeight: '700', color: '#fff' }}>Sign Up</Typography>
                                <Typography sx={{ fontSize: '13px', color: '#fff', mt: '14px' }}>Register and create an account on Todo List. Write your tasks anytime and anywhere </Typography>
                                <Typography sx={{ fontSize: '13px', color: '#fff', mt: '14px' }}>Already have an account ? <b onClick={loginHandler} style={{cursor:'pointer'}}>Login</b> </Typography>

                            </Grid>
                        </Grid>

                    </Paper>


                </Grid>
            </Grid>
        </>
    )
}

export default SignUp