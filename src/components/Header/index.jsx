import { IoChevronDownOutline as UserOptionsButton } from "react-icons/io5";
import { IoChevronUpOutline as UserOptionsUpButton } from "react-icons/io5";

import SearchBar from "../SearchBar";
import { useState } from "react";
import * as S from "./styles";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import DefaultIcon from '../../assets/DefaultIcon.png'


const Header = () => {
const [logoutScreen,setLogoutScreen]=useState(false)
const { setToken, image,setImage, setName } = useContext(UserContext);
const navigate=useNavigate()

function showScreen(){
    setLogoutScreen(!logoutScreen)
}

function logout(){
    localStorage.removeItem("isLogged")
    navigate('/')
    setToken()
    setImage()
    setName()
}

    return (
        <S.HeaderContainer 
        onClick={()=>{
            if(logoutScreen)setLogoutScreen(false)
        }}>
            <S.Header>
                <S.Logo >linkr</S.Logo>
                <SearchBar />
                <S.UserContainer>
                    <S.UserOptionsContainer>
                    {(logoutScreen 
                    ?
                    <UserOptionsUpButton onClick={showScreen}/>
                    :
                    <UserOptionsButton onClick={showScreen}/>)}  

                    {(<S.UserIcon src= 
                    {image 
                    ? image
                    : DefaultIcon} 
                    onClick={showScreen} />)}
                    </S.UserOptionsContainer>

                    {(logoutScreen ?
                    <S.Button onClick={logout}>Logout</S.Button> 
                    : <></>)}
                     
                    
                </S.UserContainer>
            </S.Header>
        </S.HeaderContainer>
    );
};

export default Header;