import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Container } from "../SignUp/SignUp.js";
import { ThreeDots } from "react-loader-spinner";
import Header from "../HeaderRegister/Header.js";
import UserContext from "../../../contexts/UserContext.js";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [load, setLoad] = useState(false);

    const navigate = useNavigate();
    const { setToken, setImage, setName } = useContext(UserContext);

    function signIn(event) {
        event.preventDefault();
        setLoad(true);

        const body = {
            email,
            password,
        };

        const promise = axios.post(`https://back-projeto17-linkr.herokuapp.com/login`, body);

        promise.then((res) => {
            setLoad(false);
            localStorage.setItem("authToken", res.data.token);
            setImage(res.data.image);
            setName(res.data.name);
            setToken(localStorage.getItem("authToken"));
            navigate("/timeline");
        });

        promise.catch((Error) => {
            setLoad(false);
            if (Error.response.status === 401) {
                alert("User isn't registered or password is incorrect!");
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
                <form onSubmit={signIn}>
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
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" disabled={load}>
                        {load ? <ThreeDots /> : <h3>Sign In</h3>}
                    </button>
                </form>
                <div className="back">
                    <h1 onClick={() => navigate("/signup")}>
                        First time? Create an account!
                    </h1>
                </div>
            </div>
        </Container>
    );
}