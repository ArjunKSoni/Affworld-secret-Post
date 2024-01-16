import { IconButton, TextField, Tooltip } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { Timestamp, addDoc, collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebaseconfig";

function Home() {
    const navigate=useNavigate();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const messageRef = useRef(null);

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    useEffect(() => {
        const Messageref=collection(db,"Post");
        const timeSortedQuery = query(Messageref, orderBy('timestamp', 'asc'));
        onSnapshot(timeSortedQuery,async(e)=>{
            let data=e.docs.map((doc=>{
                return({
                    ...doc.data()
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

    const handleSendMessage = async() => {
        if (message.trim() !== '') {
            const currentDate = new Date();
            let date = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`
            let time = `${currentDate.getHours()}:${currentDate.getMinutes()}`
            const newMessage = {
                id: new Date().getTime(),
                Date: date,
                Time: time,
                sender: `Anonymous ${Math.floor(Math.random() * 1000)}`,
                text: message,
                timestamp: Timestamp.now()
            };

            const MessageRef=collection(db,"Post");
            const data=await addDoc(MessageRef,newMessage);
            console.log(data);
            setMessage('');
        }
    };

    return (
        <div className="flex items-center justify-center bg-slate-900 h-screen w-screen">
            <div className="container mx-auto my-8 p-4 h-full bg-gray-100 rounded shadow-md">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold mb-4">Anonymous Message</h1>
                    <Tooltip sx={{marginBottom:2}} title="Logout">
                        <div >
                            <LogoutIcon onClick={()=>navigate("/")} sx={{fontSize:40}} />
                        </div>
                    </Tooltip>
                </div>
                <div className="mb-4">
                    <TextField
                        className="w-full p-2 border rounded"
                        rows="1"
                        placeholder="Share your Secrets..."
                        value={message}
                        onChange={handleInputChange}
                        autoFocus={true}
                        onKeyDown={(key) => { if (key.key === "Enter") handleSendMessage() }}
                    />
                    <h1 className="text-slate-400">Press Enter to send message*</h1>
                </div>
                <div ref={messageRef} className=" overflow-y-scroll h-3/4">
                    <h2 className="text-xl font-bold mb-2">Messages</h2>
                    <div className='flex h-full flex-col'>
                        {messages.map((msg) => (
                            <div key={msg.id} className="bg-white p-2 flex flex-col items-start justify-between mb-2 rounded">
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
            </div>
        </div>
    );
}

export default Home;