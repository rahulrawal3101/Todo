'use client'
import Header from '@/components/Header';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import ImageIcon from '@mui/icons-material/Image';

const Profile = () => {
    return (
        <>
            <Container disableGutters maxWidth='xl'>
                <Header list={'home'}/>
                <Grid container>
                    <Grid item lg={4} md={4} sm={8} xs={12} sx={{  }}>
                        <Grid container sx={{ pl: '35px', pt: '10px' }}>
                            <Grid item xs={12} sx={{}}>
                                <Typography sx={{ fontSize: '37px', color: '#03015d', fontWeight: '800', }}>Profile</Typography>
                            </Grid>
                            <Grid item xs={12} sx={{mt:'15px'}}>
                                <Box sx={{ width: '80px', height: '80px', borderRadius: '50px', bgcolor: '#bdbdbd', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <ImageIcon sx={{ fontSize: '35px', color: '#9e9e9e' }} />
                                </Box>
                                <Button variant='contained' sx={{bgcolor:'#03015d', color:'white', fontSize:'10px', textTransform:'lowercase', mt:'18px','&:hover':{bgcolor:"#03015d"}}}>Choose a file</Button>
                            </Grid>
                        </Grid>

                        <Grid container sx={{ pl: '35px',mt:'20px' }}>
                            <Grid item lg={10} md={10} sm={10.5} xs={11}>
                                <TextField placeholder='Enter Name' sx={{fontSize:'17px',}} size='small' fullWidth />
                                <TextField placeholder='Enter Email' sx={{fontSize:'17px', mt:'12px'}} size='small' fullWidth/>
                                <TextField placeholder='Password' sx={{fontSize:'17px', mt:'12px'}} size='small' fullWidth/>
                                <TextField placeholder='Confirm Password' sx={{fontSize:'17px', mt:'12px'}} size='small' fullWidth/>

                            </Grid>
                            <Grid item lg={10} md={10} sm={10.5} xs={11} sx={{mt:'14px'}}>
                                <Button variant='contained' fullWidth sx={{bgcolor:'#03015d', '&:hover':{bgcolor:'#03015d'}}}>Update</Button>

                            </Grid>

                        </Grid>

                    </Grid>

                </Grid>
            </Container>

        </>
    )
}

export default Profile