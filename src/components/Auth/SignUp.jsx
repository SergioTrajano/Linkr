import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Form, Rigth, Left, Container } from "./Login.jsx";
import { ThreeDots } from "react-loader-spinner";

export default function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function clearSignUpInputs() {
    return {
      email: "",
      password: "",
      username: "",
      pictureURL: "",
    };
  }

  const [postForm, setPostForm] = useState(clearSignUpInputs);
  function handleForm(e) {
    setPostForm({
      ...postForm,
      [e.target.name]: e.target.value,
    });
  }

  function handleSignUpSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setPostForm(clearSignUpInputs);

    const promise = axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/sign-up`,
      postForm
    );
    promise
      .then(() => {
        navigate("/");
      })
      .catch((erro) => {
        console.log(erro);
        alert(`${erro.response.data}`);
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
        <Form $loading={loading} onSubmit={handleSignUpSubmit}>
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
          <input
            type="text"
            placeholder="username"
            name="username"
            value={postForm.username}
            onChange={handleForm}
            required
          />
          <input
            type="url"
            placeholder="picture url"
            name="pictureURL"
            value={postForm.pictureURL}
            onChange={handleForm}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? <ThreeDots /> : <>Sign Up</>}
          </button>
          <Link to="/">Switch back to log in</Link>
        </Form>
      </Rigth>
    </Container>
  );
}