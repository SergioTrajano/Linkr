import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../../context/userContext.js";
import Post from "./Post/index.jsx";
import * as S from "./style";
import Trending from "./Trending/index.jsx";


export default function User() {
    const userId = useParams().id;
    const [userPosts, setUserPosts] = useState([]);
    const [userData, setUserData] = useState("");
    const { token } = useContext(UserContext);
    

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/${userId}`, config);

        promise.then(response => {
            setUserPosts(response.data);
            console.log(response.data)
        });

        
    }, [token, userId]);
    
    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const promise2 = axios.get(`${process.env.REACT_APP_API_BASE_URL}/users?userId=${userId}`, config);
        
        promise2.then(response => {
            setUserData(response.data);
            console.log(response.data)
        })
    }, [token, userId])


    return (
        <>
            <S.Main>
                <S.TimelineContainer>{userData ? userData.username : ""}</S.TimelineContainer>
                <S.ContentContainer>
                    <S.PostsContainer>
                        <S.UserData>{userData ? userData.username : ""}</S.UserData>
                        {userPosts.length ? 
                        <Post 
                            
                        /> : <></>}
                    </S.PostsContainer>
                    <Trending />
                    <S.SidebarContainer>
                    </S.SidebarContainer>
                </S.ContentContainer>
              
            </S.Main>
        </>

    );
}