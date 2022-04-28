import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logout from './Logout';
import ChatInput from './ChatInput';
// import Messages from './Messages';
import axios from 'axios';
import { sendMessageRoute, getAllMessagesRoute } from '../utils/APIRoutes';


export default function ChatContainer({ currentChat, currentUser }) {

    const [messages, setMessages] = useState([]);

    const getResponse = async () => {
        const response = await axios.post(getAllMessagesRoute, {
            from: currentUser._id,
            to: currentChat._id,
            });
            setMessages(response.data)};

useEffect(() => {
     getResponse();
     // eslint-disable-next-line
        }, [currentChat]);

    const handleSendMsg = async (msg) => {
        await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg,
        });
    };

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
        <Logout />
    </div>
    <div className="chat-messages"></div>
    <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
    )}
    </>
    );
}

const Container = styled.div`
    padding-top: 1rem;
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
    
`;