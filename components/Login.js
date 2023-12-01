'use client'
import { Box, Button, Grid, InputBase, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const LoginPage = () => {
    const router = useRouter();
    const [loginData, setLoginData] = useState({
        email:'',
        password:''
    });

    const loginDetails=(e)=>{
        const{name,value} = e.target;
        setLoginData({...loginData,[name]:value})
    }

    const verfiyUser=async()=>{
        if(loginData.email !== '' && loginData.password !== ''){
            try{
                const resp = await axios.post('/api/verifyuser',loginData)
                console.log(resp)
                if(resp.data.message == "Login Verified"){
                   const respJson = JSON.stringify(resp.data.resp.tid)
                   await localStorage.setItem('tid',respJson)
                   router.push('/')
                }
                else{
                    alert(resp.data.message)
                }        
            }
            catch(err){
              console.log(err);
              alert(err)
            }
        }
    };
    console.log(loginData)

    const registerHandler =()=>{
        router.push('/signup')
    }
    return (
        <>
            <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: {lg:'center', md:'center', sm:'center', xs:'flex-start'}, height: '100vh', bgcolor: '#c4c4c4' }}>
                <Grid item lg={6} md={8} sm={9.5} xs={12} sx={{ height:{ lg:'50%', md:'50%', sm:'50%', xs:'100%'}, borderRadius: { lg:'10px', md:'10px', sm:'10px', xs:'0px'} }}>
                    <Paper sx={{ height: '100%', borderRadius: '10px',}} elevation={2}>
                        <Grid container sx={{ height: {lg:'100%', md:'100%', sm:'100%', xs:'50%'}, borderRadius: { lg:'10px', md:'10px', sm:'10px', xs:'0px'}, display:'flex',justifyContent:'center', alignItems:'center',  }}>
                            <Grid item lg={6} md={6} sm={6} xs={12} sx={{ bgcolor: '#03015d', height: '100%', borderRadius:{ lg:'10px', md:'10px', sm:'10px', xs:'0px'}, p: '50px 40px',  }}>
                                <Typography sx={{ fontSize: '40px', fontWeight: '700', color: '#fff' }}>Login</Typography>
                                <Typography sx={{ fontSize: '13px', color: '#fff', mt: '14px' }}>Log in and start creating your next task <br /> Do not have an account ? <b onClick={registerHandler} style={{cursor:'pointer'}}>Sign up</b> </Typography>

                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={12} sx={{display:'flex', flexDirection:'column',alignItems:'flex-start', justifyContent:'space-between'}}>

                                <Grid container sx={{  display:'flex', justifyContent:'center', alignItems:'center', mt:{lg:'0px', md:'0px', sm:'20px', xs:'30px'}}}>
                                    <Grid item xs={10} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                    <Box sx={{ width: '100%', border: '1px solid lightgrey', p: '7px', borderRadius: '8px' }}>
                                        <InputBase placeholder='Email' type='email' sx={{ color: 'black', fontSize: '17px' }} size='small' onChange={loginDetails} name='email' value={loginData.email}/>
                                    </Box>
                                    </Grid>

                                    <Grid item xs={10} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                    <Box sx={{ width: '100%', border: '1px solid lightgrey', p: '7px', borderRadius: '8px', mt: '20px' }}>
                                        <InputBase placeholder='Password' type='password' sx={{ color: 'black', fontSize: '17px' }} size='small' onChange={loginDetails} name='password' value={loginData.password}/>
                                    </Box>
                                    </Grid>
                                </Grid>
                             

                                <Grid container sx={{  display:'flex', justifyContent:'center', alignItems:'center'}}>
                                    <Grid item xs={10} sx={{ mt:{lg:'50px', md:'45px', sm:'40px', xs:'30px'}}}>
                                    <Box sx={{width:'100%'}}>
                                        <Button variant='contained' sx={{bgcolor:'#03015d', width:'100%',fontSize:'15px','&:hover':{bgcolor:'#03015d'} }} size='large' onClick={verfiyUser}>Login</Button>
                                    </Box>
                                    <Typography sx={{fontSize:'13px',color:'#8b8b8b', mt:'15px',cursor:"pointer"}} >Forgot your password ? <b style={{color:'#03015d', fontSize:'13.5px'}}>Forgot Password</b></Typography>
                                    </Grid>
                                </Grid>


                            </Grid>
                        </Grid>

                    </Paper>


                </Grid>
            </Grid>
        </>
    )
}

export default LoginPage