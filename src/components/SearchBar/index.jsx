/* eslint-disable no-undef */
import * as S from "./styles";
import { AiOutlineSearch } from "react-icons/ai";
import { DebounceInput } from "react-debounce-input";

// eslint-disable-next-line no-unused-vars
const SearchBar = () => {
 
    return (
        <S.SearchBarContainer>
            <S.SearchBarContainerInput>
                <DebounceInput
                    minLength={3}
                    debounceTimeout={300}
                  
                    placeholder="Search for people"
                    className="searchBar-input"
                    type="text"
                />
                <AiOutlineSearch className="search-icon" />
            </S.SearchBarContainerInput>
            <S.SearchBarDataResult>
                
            </S.SearchBarDataResult>
        </S.SearchBarContainer>
    );
};

export default SearchBar;