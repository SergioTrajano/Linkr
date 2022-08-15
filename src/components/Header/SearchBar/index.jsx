/* eslint-disable no-undef */
import * as S from "./styles";
import { AiOutlineSearch } from "react-icons/ai";
import { DebounceInput } from "react-debounce-input";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
const SearchBar = () => {
    const [serachResult, setSearchResult] = useState([]);
 
    return (
        <S.SearchBarContainer>
            <S.SearchBarContainerInput>
                <DebounceInput
                    minLength={3}
                    debounceTimeout={300}
                    onChange={event => {
                        const config = {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        };
                        const promise = axios.get(`${process.env.REACT_APP_URI}/users?name=${event.target.value}`, config);
                        promise.then(response => setSearchResult(response.data));
                        }
                    }
                    placeholder="Search for people"
                    className="searchBar-input"
                    type="text"
                />
                <AiOutlineSearch className="search-icon" />
            </S.SearchBarContainerInput>
            <S.SearchBarDataResult>
                {serachResult.map(c => <Link to={`/user/${c.id}`} onClick={() => setSearchResult([])}>
                    <S.UserImage src={`${c.picture}`}></S.UserImage>
                    <p>{c.name}</p>
                </Link>)}
            </S.SearchBarDataResult>
        </S.SearchBarContainer>
    );
};

export default SearchBar;