import { IoChevronDownOutline as UserOptionsButton } from "react-icons/io5";
import { IoChevronUpOutline as UserOptionsUpButton } from "react-icons/io5";

import SearchBar from "../SearchBar";
import { useState } from "react";
import * as S from "./styles";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import DefaultIcon from '../../assets/DefaultIcon.png'



const Header = () => {
const [logoutScreen,setLogoutScreen]=useState(false)
const {user,setUser}=useContext(AuthContext)
const navigate=useNavigate()

function showScreen(){
    setLogoutScreen(!logoutScreen)
}

function logout(){
    localStorage.removeItem("logged_in")
    navigate('/')
    setUser()
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
                    {user 
                    ? user.pictureURL 
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