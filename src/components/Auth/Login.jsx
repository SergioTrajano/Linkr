import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../../context/userContext.js";

export function Login() {
  const navigate = useNavigate();
  const { setToken, setImage, setName, setShowHeader, setId } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  function clearLoginInputs() {
    return {
      email: "",
      password: "",
    };
  }

  const [postForm, setPostForm] = useState(clearLoginInputs);
  function handleForm(e) {
    setPostForm({
      ...postForm,
      [e.target.name]: e.target.value,
    });
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const loginPost = {
      email: postForm.email,
      password: postForm.password,
    };
    setPostForm(clearLoginInputs);

    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/login`, loginPost)
      .then((res) => {
        localStorage.setItem("isLogged",JSON.stringify({
            image:res.data.pictureUrl,
            name:res.data.username,
            token:res.data.token,
            id: res.data.id,
        }));
        setImage(res.data.pictureURL);
        setName(res.data.username);
        setToken(res.data.token);
        setShowHeader(true);
        setId(res.data.id);
        navigate("/timeline");
      })
      .catch((error) => {
        alert(`${error.response.data}`);
        setLoading(false);
      });
  }

  return (
    <Container>
      <Left>
        <span>linkr</span>
        <p>save, share and discover the best links on the web</p>
      </Left>

      <Rigth>
        <Form $loading={loading} onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="e-mail"
            name="email"
            value={postForm.email}
            onChange={handleForm}
            required
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={postForm.password}
            onChange={handleForm}
            required
          />
          <button type="submit">Log In</button>
          <Link to="/sign-up">First time? Create an account!</Link>
        </Form>
      </Rigth>
    </Container>
  );
}

export const Container = styled.div`
  display: flex;
  height: 100vh;
  @media (max-width: 611px) {
    display: block;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  input,
  button {
    font-size: 27px;
    border-radius: 6px;
    pointer-events: ${(props) => (props.$loading ? "none" : "auto")};
    height: 65px;
    width: 28vw;
  }
  input {
    padding: 12px 17px;
    margin-bottom: 12px;
    color: #9f9f9f;
  }
  input::placeholder {
    color: #9f9f9f;
  }
  button {
    color: white;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1877f2;
    margin-bottom: 18px;
  }
  a {
    font-size: 24px;
    color: white;
    text-decoration: underline;
    pointer-events: ${(props) => (props.$loading ? "none" : "auto")};
  }
  @media (max-width: 611px) {
    input,
    button {
      color: white;
      font-size: 22px;
      border-radius: 6px;
      pointer-events: ${(props) => (props.$loading ? "none" : "auto")};
      height: 55px;
      width: 90vw;
    }
    button {
      margin-bottom: 14px;
    }
    a {
      font-size: 17px;
    }
  }
`;

export const Rigth = styled.div`
  padding: 0 5vw;
  background-color: #333333;
  width: 40vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 611px) {
    width: 100vw;
  }
`;

export const Left = styled.div`
  background-color: #151515;
  font-weight: 700;
  width: 60vw;
  color: white;
  font-size: 43px;
  padding: 5vw 13vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  span {
    font-size: 106px;
    font-family:"Passion one", cursive
  }

  @media (max-width: 611px) {
    width: 100vw;
    font-size: 23px;
    align-items: center;
    span {
      font-size: 76px;
    }
    margin-bottom: 40px;
  }
`;
