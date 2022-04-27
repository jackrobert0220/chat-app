import React from 'react';
import styled from 'styled-components';
import Zombie from "../assets/zombie.gif";

export default function Welcome({ currentUser }) {
  return (
    <Container>
    <img src={Zombie} alt="Zombie" />
    <h1>
        Welcome, <span>{currentUser.username}!</span>
    </h1>
    <h3>Please select a chat to Start Messaging.</h3>

    </Container>
  );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    img {
        height: 10rem;
    }
    span {
        color: #4e00ff;
    }
`;