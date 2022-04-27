import React, {useState, useEffect } from 'react';
import styled from 'styled-components';
import Background from "../assets/background.jpg";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { allUsersRoute } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";

function Chat() {
  const navigate = useNavigate;
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if(!localStorage.getItem("chat-app-user")) {
      navigate("/login");
  } else {
    setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
    setIsLoaded(true);
    // eslint-disable-next-line
  }}, []);
  
  useEffect(() => {

    if(currentUser) {
      if(currentUser.isAvatarImageSet) {
        /* Thank you, Gabe and Avisa \m/, (>.<) ,\m/ */
       axios.get(`${allUsersRoute}/${currentUser._id}`).then((res) => {
         console.log(res.data)
         setContacts(res.data)
       });
       
      } else {
        navigate("/setAvatar");
      }
  }
  /* Thank you, Rome!!! \m/, (>.<) ,\m/ */
// eslint-disable-next-line
  }, [currentUser]);
console.log(contacts);
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
          {isLoaded && currentChat === undefined ? (
        <Welcome currentUser={currentUser} />
          ) : ( 
            <ChatContainer currentChat={currentChat} />
          )}
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