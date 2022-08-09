import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { useState} from "react"
import axios from "axios"

export function Login() {
    const navigate=useNavigate()
    const [loading,setLoading]=useState(false)

    function clearLoginInputs(){
        return {
            email:'',
            password:'',
        }
    }

    const [postForm,setPostForm]=useState(clearLoginInputs)
    function handleForm(e){
        setPostForm({
            ...postForm,
            [e.target.name]:e.target.value
        })
    }

    function handleLoginSubmit(e){
        e.preventDefault()
        setLoading(true)
        setPostForm(clearLoginInputs)

        const promise=axios.post("https://back-projeto17-linkr.herokuapp.com/login",postForm)
        promise.then(()=>{
            navigate('/timeline')
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

                <Form $loading={loading} onSubmit={handleLoginSubmit}>
                    <input type="email" placeholder="e-mail" name="email" value={postForm.email} onChange={handleForm} required/>
                    <input type="password" placeholder="password" name="password" value={postForm.password} onChange={handleForm} required/>
                    <button type="submit">Log In</button>
                </Form>

                <Link to='/sign-up'>
                    First time? Create an account!
                </Link>
                
            </Rigth>

        </Container>
    )
}

export const Container=styled.div`
display: flex;
@media(max-width:611px){
    display: block;
}
`

export const Form=styled.form`

input, button {
    font-size: 27px;
    border-radius: 6px;
    pointer-events: ${props=>(props.$loading ? "none" : "auto")};
    height: 65px;
    width: 30vw;
}
input{
    padding: 12px 17px;
    margin-bottom: 12px;
    color: #9F9F9F;
}
input::placeholder{
    color: #9F9F9F;
}
button{
    color:white;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1877F2;
    margin-bottom: 14px;
}
a{
    font-size: 24px;
    text-decoration-color: white;
}

@media(max-width:611px){
    input, button {
    color:white;
    font-size: 22px;
    border-radius: 6px;
    background-color: #1877F2;
    pointer-events: ${props=>(props.$loading ? "none" : "auto")};
    height: 55px;
    width: 90vw;
    }
    button{
    margin-bottom: 14px;
    }
    a{
    font-size: 17px;
    }
}
`

export const Rigth=styled.div`
background-color: #333333;
width: 37vw;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

@media(max-width:611px){
    width:100vw;
}
`

export const Left=styled.div`
background-color: #151515;
font-weight: 700;
color:white;
font-size: 43px;
padding: 0 144px;
display: flex;
flex-direction: column;
justify-content: center;
span{
    font-size: 106px;
}

@media(max-width:611px){
    width:100vw;
    font-size: 23px;
    align-items: center;
    span{
        font-size: 76px;
    }
}
`
