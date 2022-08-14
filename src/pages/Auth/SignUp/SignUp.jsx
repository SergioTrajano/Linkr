import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Container } from "./SignUp.js";
import { ThreeDots } from "react-loader-spinner";
import Header from "../HeaderRegister/Header.js";



export default function Register() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [picture, setPicture] = useState("");
    const [load, setLoad] = useState(false);

    const navigate = useNavigate();

    function signUp(event) {
        event.preventDefault();
        setLoad(true);

        const body = {
            username: userName,
            email,
            password,
            picture,
        };

        const promise = axios.post(`https://back-projeto17-linkr.herokuapp.com/sign-up`, body);

        promise.then(() => {
            setLoad(false);
            navigate("/");
        });

        promise.catch((Error) => {
            setLoad(false);
            if (Error.response.status === 422) {
                alert("Fill in the forms correctly!");
            }
            if (Error.response.status === 409) {
                alert("This email is already registered!");
            }
            if (Error.response.status === 500) {
                alert("Server error!");
            }
        });
    }

    return (
        <Container>
        
            <Header />
            <div className="right">
                <form onSubmit={signUp}>
                    <input
                        type="email"
                        placeholder="e-mail"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="username"
                        value={userName}
                        required
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="picture"
                        value={picture}
                        required
                        onChange={(e) => setPicture(e.target.value)}
                    />
                    <button type="submit" disabled={load}>
                        {load ? <ThreeDots /> : <h3>Sign Up</h3>}
                    </button>
                </form>
                <div className="back">
                    <h1 onClick={() => navigate("/")}>Switch back to login</h1>
                </div>
            </div>
        </Container>
    );
}
