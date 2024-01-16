import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from '../firebase/firebaseconfig';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { addUid, addUser } from '../redux/User';


export default function Login() {
    const navigate = useNavigate()
    const dispatch=useDispatch()
    const provider = new GoogleAuthProvider();

    React.useEffect(() => {
        if (Cookies.get("Token")) {
            navigate("/home")
        }
    }, [])

    const loginwithGoogle = async () => {
        try {
            const token = await signInWithPopup(auth, provider)
            if (token) {
                dispatch(addUser(token.user.displayName))
                dispatch(addUid(token.user.uid))
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
                        Login
                    </Typography>

                    <Button
                        onClick={loginwithGoogle}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: "#864AF9", "&:hover": { backgroundColor: "#3B3486" } }}
                    >
                        <h1 className='font-bold text-lg mr-2'>Login with </h1>
                        <img src="google.png" width={40} height={40} alt="" srcSet="" />
                    </Button>
                </Box>
            </Container>
        </div>
    );
}