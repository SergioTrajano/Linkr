/* eslint-disable no-undef */
import * as S from "./styles";
import { AiOutlineSearch } from "react-icons/ai";
import { DebounceInput } from "react-debounce-input";
import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../../context/userContext";

// eslint-disable-next-line no-unused-vars
const SearchBar = () => {
    const { token } = useContext(UserContext);
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
                        console.log(event.target.value)
                        const promise = axios.get(`http://localhost:4000/users?name=${event.target.value}`, config);
                        promise.then(response => {
                            setSearchResult(response.data);
                        });
                        }
                    }
                    placeholder="Search for people"
                    className="searchBar-input"
                    type="text"
                />
                <AiOutlineSearch className="search-icon" />
            </S.SearchBarContainerInput>
            <S.SearchBarDataResult>
                {serachResult.length ? serachResult.map((c, i) => <Link key={i} to={`/user/${c.id}`} onClick={() => setSearchResult([])}>
                    <S.UserImage src={`${c.pictureURL}`}></S.UserImage>
                    <p>{c.username}</p>
                </Link>) : <></>}
            </S.SearchBarDataResult>
        </S.SearchBarContainer>
    );
};

export default SearchBar;