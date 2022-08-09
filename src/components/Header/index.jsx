import { IoChevronDownOutline as UserOptionsButton } from "react-icons/io5";
import SearchBar from "../SearchBar";

import * as S from "./styles";

const Header = () => {
   
    return (
        <S.HeaderContainer>
            <S.Header>
                <S.Logo >linkr</S.Logo>
                <SearchBar />
                <S.UserContainer>
                    <S.UserOptionsContainer>
                    <UserOptionsButton/>
                     
                    </S.UserOptionsContainer>
                    <S.UserIcon />
                </S.UserContainer>
            </S.Header>
        </S.HeaderContainer>
    );
};

export default Header;