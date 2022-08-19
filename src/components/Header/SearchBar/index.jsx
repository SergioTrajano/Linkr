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
    const { token, id, setShowHeader } = useContext(UserContext);
    const [serachResult, setSearchResult] = useState([]);

 
    return (
        <S.SearchBarContainer>
            <S.SearchBarContainerInput>
                <DebounceInput
                    minLength={0}
                    debounceTimeout={300}
                    onChange={event => {
                        const config = {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        };
                        if (event.target.value.trimStart().length < 3) {
                            setSearchResult([]);
                            return;
                        }
                        const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/users?name=${event.target.value}&followerId=${id}`, config);
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
                {serachResult.length ? serachResult.map((c, i) => <Link key={i} to={`/user/${c.id}`} onClick={() => {setSearchResult([]); setShowHeader(false)}}>
                    <S.UserImage src={`${c.pictureURL}`}></S.UserImage>
                    <p>{c.username} {c.isFollowing ? <span>• following</span> : ""}</p>

                </Link>) : <></>}
            </S.SearchBarDataResult>
        </S.SearchBarContainer>
    );
};

export default SearchBar;