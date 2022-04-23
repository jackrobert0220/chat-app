import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from "../assets/logo.png"
import Background from "../assets/background.jpg"

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
    background-image: url(${Background});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img {
            height: 7rem;
            border-radius: 0.4rem;
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
        border-radius: 2rem;
        padding: 3rem 5rem;
        input {
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #0BDA51;
            border-radius: 0.4rem;
            color: white;
            width: 100%;
            font-size: 1rem;
            &:focus {
                border: 0.1rem solid #ECFFDC;
                outline: none;
            }
        }
        button {
            background-color: #0BDA51;
            color: white;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            text-transform: uppdercase;
            transition: 0.5s ease-in-out;
            &:hover {
                background-color: #90EE90;
            }
            }
            span {
                color: white;
                text-transform: uppercase;
                a {
                    color: #90EE90;
                    text-decoration: none;
                    font-weight: bold;
                }
            }
        }
    }
`;

export default Register