import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Logout from './Logout';
import ChatInput from './ChatInput';
import axios from 'axios';
import { sendMessageRoute, getAllMessagesRoute } from '../utils/APIRoutes';
import { v4 as uuidv4 } from "uuid";


export default function ChatContainer({ currentChat, currentUser, socket }) {

    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef();

const getResponse = async () => {
    const response = await axios.post(getAllMessagesRoute, {
        from: currentUser._id,
        to: currentChat._id,
        });
        setMessages(response.data)};

useEffect(() => {
    if (currentChat) {
        getResponse();
    }
     // eslint-disable-next-line
        }, [currentChat]);

// Sets path of message being sent to correct user with socket connection
    const handleSendMsg = async (msg) => {
        await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg,
        });
        socket.current.emit("send-msg", {
            to: currentChat._id,
            from: currentUser._id,
            message: msg,
        });

        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);
    };

// Establishes socket connection
    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-receive", (msg) => {
                setArrivalMessage({fromSelf:false, message: msg});
            });
        }
 // eslint-disable-next-line
    }, []);


useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
}, [arrivalMessage]);

// Animation effect of automatically scrolling to newest message
useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
}, [messages]);

// Function for Self-Destruct Button
const deleteUser = async (e) => {
    e.preventDefault()
    try {
    await axios.delete(`http://localhost:5000/api/auth/deleteUser/${currentUser._id}`);
    localStorage.removeItem("chat-app-user");
} catch(ex) {
    console.log(ex)
}
window.location.reload();
}



    return (
    <>
    {
        currentChat && (

    <Container>
    <div className="chat-header">
        <div className="user-details">
            <div className="avatar">
            <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="avatar"/>
            </div>
            <div className="username">
                <h3>{currentChat.username}</h3>
            </div>
        </div>  
        <button onClick={deleteUser} className="delete">
                                ??? Self-Destruct ???
                            </button>
        <Logout />
    </div>
    <div className="chat-messages">

        {
            messages.map((message) => {
                return (
                    <div ref={scrollRef} key={uuidv4()}>
                        <div className={`message ${message.fromSelf ? "sent":"received"}`}>
                            <div className="content">
                                <p>
                                    {message.message}
                                </p>
                            </div>                 
                        </div>
                    </div>
                );
            })}
    </div>
    <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
    )}
    </>
    );
}

const Container = styled.div`
    padding-top: 1rem;
    display: grid;
    grid-template-rows: 10% 78% 12%;
    gap: 0.1rem;
    overflow: hidden;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
    .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;
        .user-details {
            display: flex;
            align-items: center;
            gap: 1rem;
            .avatar {
                img {
                    height: 3rem;
                }
            }
        .username {
            h3{
                color: white;
            }
        }
        }

    }
    .chat-messages {
        padding: 1rem 2 rem;
        display: flex;
        flex-direction: column;
        gap: 1 rem;
        overflow: auto;
        &::-webkit-scrollbar {
            width: 0.2rem;
            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
        .message {
            display: flex;
            align-items: center;
            .content {
                max-width: 40%;
                overflow-wrap: break-word;
                padding: 1rem;
                font-size: 1.1rem;
                border-radius: 1rem;
                color: #d1d1d1;
            }
        }
        .sent {
            justify-content: flex-end;
        }
        .content {
            background-color: #640064;
        }
    }
        .received {
            justify-content: flex-start;
            .delete {
                display: none;
            }
            .content {
                background-color: green;
            }
        }
`;