import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import { db,auth } from '../firebase/firebaseconfig';


export default function Login() {
    const navigate=useNavigate()
    const provider= new GoogleAuthProvider();
    const handleSubmit = async(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const newdata={
            email: data.get('email'),
            password: data.get('password'),
        };
    };

    const loginwithGoogle=async()=>{
        try {
            const token=await signInWithPopup(auth,provider)
            if(token){
                console.log(token.user.uid);
                navigate("/home")
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='bg-slate-900 h-screen w-screen flex items-center justify-center'>
            <Container className='bg-white px-4 pb-5 rounded-lg'  component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <h1 className='text-center font-extrabold text-3xl mb-3'>Welcome to Anonymous</h1>
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2,backgroundColor:"#864AF9","&:hover":{backgroundColor:"#3B3486"} }}
                        >
                            <h1 className='text-lg font-bold'>Login</h1>
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <div variant="body2">
                                    Forgot password?
                                </div>
                            </Grid>
                            <Grid item>
                                <Link className='text-blue-700' to="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Button
                            onClick={loginwithGoogle}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2,backgroundColor:"#864AF9","&:hover":{backgroundColor:"#3B3486"} }}
                        >
                            <h1 className='font-bold text-lg mr-2'>Login with </h1>
                            <img src="google.png" width={40} height={40} alt="" srcSet="" />
                        </Button>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}