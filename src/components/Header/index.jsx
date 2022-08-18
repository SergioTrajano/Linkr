import { IoChevronDownOutline as UserOptionsButton } from "react-icons/io5";
import { IoChevronUpOutline as UserOptionsUpButton } from "react-icons/io5";

import SearchBar from "./SearchBar/index.jsx";
import { useState } from "react";
import * as S from "./styles";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "../../context/userContext.js";

const Header = () => {
    const [ logoutScreen, setLogoutScreen] = useState(false);
    const { image, setShowHeader, id } = useContext(UserContext);
    const navigate = useNavigate();

    function showScreen() {
        setLogoutScreen(!logoutScreen);
    }

    function logout() {
        localStorage.removeItem("isLogged");
        setShowHeader(false);
        navigate('/');
    }

    return (
        <S.HeaderContainer tabIndex={0} onBlur={showScreen}>
            <S.Header>
                <Link to="/timeline">
                    <S.Logo >linkr</S.Logo>
                </Link>
                <SearchBar />
                <S.UserContainer>
                    <S.UserOptionsContainer>
                    {logoutScreen 
                    ?
                    <UserOptionsUpButton onClick={showScreen}/>
                    :
                    <UserOptionsButton onClick={showScreen}/>}  

                    {(<S.UserIcon src= 
                    {image}
                    onClick={showScreen} />)}
                    </S.UserOptionsContainer>

                    {(logoutScreen ?
                    <S.DropDownContainer>
                        <p onClick={logout}>Logout</p>
                        <p onClick={() => navigate(`/user/${id}`)}>Meu perfil</p>
                    </S.DropDownContainer>
                    : <></>)}
                     
                    
                </S.UserContainer>
            </S.Header>
        </S.HeaderContainer>
    );
};

export default Header;