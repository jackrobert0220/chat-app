import React from 'react'
import styled from 'styled-components';
import Background from "../assets/background.jpg";

function Chat() {
  return (
    <Container>
      <div className="container"></div>
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
      @media screen and (min-width:360px) and (max-width:480px) {
        grid-template-columns: 35% 65%;
      }
    }
`

export default Chat