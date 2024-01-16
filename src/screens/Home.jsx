import { Menu, MenuItem, TextField, Tooltip } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { Timestamp, addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebaseconfig";
import Cookies from 'js-cookie';
import { useSelector } from "react-redux";
import SendIcon from '@mui/icons-material/Send';

function Home() {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [id,setId]=useState(null)
    const name = useSelector((state) => state.User.User)
    const messageRef = useRef(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event,id) => {
        setAnchorEl(event.currentTarget);
        setId(id);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setId(null)
    };
    const handledelete=async()=>{
        console.log(id);
        setAnchorEl(null);
        setId(null);
        const Messageref = doc(collection(db, "Post"),id);
        await deleteDoc(Messageref);
        
    }


    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    useEffect(() => {
        if (name==="") {
            navigate("/")
        }
    }, [])

    useEffect(() => {
        const Messageref = collection(db, "Post");
        const timeSortedQuery = query(Messageref, orderBy('timestamp', 'asc'));
        onSnapshot(timeSortedQuery, async (e) => {
            let data = e.docs.map((doc => {
                return ({
                    ...doc.data(),
                    id:doc.id
                })
            }))
            setMessages(data)
        })

    }, [])

    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (message.trim() !== '') {
            const currentDate = new Date();
            let date = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`
            let time = `${currentDate.getHours()}:${currentDate.getMinutes()}`
            const newMessage = {
                Date: date,
                Time: time,
                sender: name.split(" ")[0],
                text: message,
                timestamp: Timestamp.now()
            };
            setMessage('');
            const MessageRef = collection(db, "Post");
            await addDoc(MessageRef, newMessage);

        }
    };

    return (
        <div className="flex items-center justify-center bg-slate-900 h-screen w-screen">
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handledelete}>Delete</MenuItem>
            </Menu>
            <div className="container mx-auto my-8 p-4 h-full bg-gray-100 rounded shadow-md">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center gap-2">
                        <h1 className="text-3xl font-bold mb-4">WhatsWee</h1>
                        <h1 className="text-slate-500">{name.split(" ")[0]}</h1>
                    </div>
                    <Tooltip sx={{ marginBottom: 2 }} title="Logout">
                        <div >
                            <LogoutIcon onClick={() => { Cookies.remove("Token"); navigate("/") }} sx={{ fontSize: 40 }} />
                        </div>
                    </Tooltip>
                </div>

                <div ref={messageRef} className=" overflow-y-scroll" style={{ height: "83vh" }}>
                    <h2 className="text-xl font-bold mb-2">Messages</h2>
                    <div className='flex h-full flex-col'>
                        {messages.map((msg) => (
                            <div key={msg.id} onClick={(e)=>{handleClick(e,msg.id)}} className="bg-white p-2 flex flex-col items-start justify-between mb-2 rounded">
                                <div>
                                    <strong className="text-blue-500">{msg.sender}:</strong> {msg.text}
                                </div>
                                <div className="text-sm flex gap-3 text-slate-400">
                                    <h1>{msg.Date}</h1>
                                    <h1>{msg.Time}</h1>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mb-4 w-full p-2 border rounded flex">
                    <TextField
                        className="flex-1 p-2 border rounded"
                        rows="1"
                        placeholder="Share your Secrets..."
                        value={message}
                        onChange={handleInputChange}
                        autoFocus={true}
                        onKeyDown={(key) => { if (key.key === "Enter") handleSendMessage() }}
                    />
                    <div onClick={handleSendMessage} className="p-2 flex items-center justify-center">
                        <SendIcon />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;