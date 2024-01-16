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
import { signInWithPopup,GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase/firebaseconfig';


export default function SignIn() {
    const navigate=useNavigate()
    const provider =new GoogleAuthProvider();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            name: data.get('name'),
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    const loginwithGoogle=async()=>{
        try {
            const token=await signInWithPopup(auth,provider)
            if(token){
                navigate("/home")
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='bg-slate-900 h-screen w-screen flex items-center justify-center'>
            <Container className='bg-white px-4 pb-5 rounded-lg' component="main" maxWidth="xs">
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
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="User Name"
                            name="name"
                            autoComplete="User Name"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
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
                            sx={{ mt: 3, mb: 2, backgroundColor: "#864AF9", "&:hover": { backgroundColor: "#3B3486" } }}
                        >
                            <h1 className='text-lg font-bold'>Sign up</h1>
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link className='text-blue-700' to="/" variant="body2">
                                    {"Already have an Account? Sign In"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Button
                            onClick={loginwithGoogle}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2,backgroundColor:"#864AF9","&:hover":{backgroundColor:"#3B3486"} }}
                        >
                            <h1 className='font-bold text-lg mr-2'>Signup with </h1>
                            <img src="google.png" width={40} height={40} alt="" srcSet="" />
                        </Button>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}