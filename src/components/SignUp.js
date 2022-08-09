import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { useState} from "react"
import axios from "axios"
import { Form,Rigth,Left,Container } from "./Login"

export default function SignUp() {
    const navigate=useNavigate()
    const [loading,setLoading]=useState(false)

    function clearSignUpInputs(){
        return {
            email:'',
            password:'',
            username:'',
            picture:''
        }
    }

    const [postForm,setPostForm]=useState(clearSignUpInputs)
    function handleForm(e){
        setPostForm({
            ...postForm,
            [e.target.name]:e.target.value
        })
    }

    function handleSignUpSubmit(e){
        e.preventDefault()
        setLoading(true)
        setPostForm(clearSignUpInputs)

        const promise=axios.post("https://back-projeto17-linkr.herokuapp.com/sign-up",postForm)
        promise.then(()=>{
            navigate('/')
        })
        .catch(erro=>{
            alert(`${erro.response.data.message}`);
            setLoading(false)
        })

    }

    return (
        <Container>
            <Left>
                <span>linkr</span>
                <p>
                    save, share and discover the best links on the web
                </p>
            </Left>
            <Rigth>
                <Form $loading={loading} onSubmit={handleSignUpSubmit}>
                    <input type="email" placeholder="e-mail" name="email" value={postForm.email} onChange={handleForm} required/>
                    <input type="password" placeholder="password" name="password" value={postForm.password} onChange={handleForm} required/>
                    <input type="text" placeholder="username" name="username" value={postForm.username} onChange={handleForm} required/>
                    <input type="url" placeholder="picture url" name="picture" value={postForm.picture} onChange={handleForm} required/>
                    <button type="submit">Sign Up</button>

                    <Link to='/'>
                        Switch back to login
                    </Link>
                </Form>
            </Rigth>
        </Container>
    )
}

