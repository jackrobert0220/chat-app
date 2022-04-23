import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from "../assets/logo.jpg"

function Register() {

    const handleSubmit = (event)=> {
        event.preventDefault();
        alert("form");
    };

    const handleChange = (event) => {};
  return (
    <>
        <FormContainer>
            <form onSubmit={(event)=>handleSubmit(event)}>
                <div className="brand">
                    <img src={Logo} alt="LOgo" />
                    <h1>Chat App</h1>
                </div>
                <input 
                    type="text" 
                    placeholder="Username" 
                    name="username" 
                    onChange={(e) => handleChange(e)} 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    name="password" 
                    onChange={(e) => handleChange(e)} 
                />
                <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    name="confirmPassword" 
                    onChange={(e) => handleChange(e)} 
                />
                <input 
                    type="text" 
                    placeholder="Username" 
                    name="username" 
                    onChange={(e) => handleChange(e)} 
                />
                <button type="submit">Create User</button>
                <span>
                Already have an account? <Link to="/login">Login</Link>
                </span>
                
            </form>
        </FormContainer>
    </>
  )
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img {
            height: 5rem;
        }
        h1 {
            color: white;
            text-transform: uppercase;
        }
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #00000076;
    }
`;

export default Register