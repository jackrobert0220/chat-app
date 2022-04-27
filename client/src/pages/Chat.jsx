import React, {useState, useEffect } from 'react';
import styled from 'styled-components';
import Background from "../assets/background.jpg";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { allUsersRoute } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";

function Chat() {
  const navigate = useNavigate;
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  useEffect(() => {

    if(!localStorage.getItem("chat-app-user")) {
      navigate("/login");
  } else {

    setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")))
  }

  }, []);
  
  useEffect(() => {
    async function isUser() {
    if(currentUser) {
      if(currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
      } else {
        navigate("/setAvatar");
      }
  }
}
isUser()
  }, []);

  const handleChatChange = (chat) => {
      setCurrentChat(chat);
  }
  
  
  return (
    <Container>
      <div className="container">
        <Contacts 
          contacts={contacts} 
          currentUser={currentUser} 
          changeChat={handleChatChange}
          />
        <Welcome 
          currentUser={currentUser}
        />
      </div>
    </Container>
  );
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-image: url(${Background});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    .container {
      height: 85vh;
      width: 85vw;
      background-color: #00000076;
      display: grid;
      grid-template-columns: 25% 75%;
      @media screen and (min-width:720px) and (max-width:1080px) {
        grid-template-columns: 35% 65%;
        }
        @media screen and (min-width:360px) and (max-width:480px) {
        grid-template-columns: 35% 65%;
        }
    }
`

export default Chat