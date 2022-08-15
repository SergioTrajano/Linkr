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
        console.log("to dentro")
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/${userId}`, config);
        console.log("to aqui")
        promise.then(response => {
            setUserPosts(response.data);
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
            setUserData(response.data[0]);
        })
    }, [token, userId]);

    async function getPosts() {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const result = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/posts`,
                config
            );
           
            setUserPosts(result.data);

        } catch (e) {
            alert(
                "An error occured while trying to fetch the posts, please refresh the page"
            );
            console.log(e);
        }
    }

    function renderPosts() {
        if (userPosts.length) {
            const timeline = userPosts.map(
                ({
                    postId,
                    url,
                    article,
                    urlTitle,
                    urlImage,
                    urlDescription,
                    username,
                    userId,
                    pictureURL,
                    likes,
                }) => (
                    <Post
                        key={postId}
                        url={url}
                        article={article}
                        urlTitle={urlTitle}
                        urlImage={urlImage}
                        urlDescription={urlDescription}
                        username={username}
                        creatorId={userId}
                        pictureURL={pictureURL}
                        postId={postId}
                        setPosts={setUserPosts}
                        getPosts={getPosts} 
                        likes={likes}
                    />
                )
            );
            return timeline;
        }
        if (!userPosts.length) return <span>There are no posts yet</span>;
        return <span>Loading...</span>;
    }

    return (
        <>
            <S.Main>
                <S.ContentContainer>
                    <S.PostsContainer>
                        <S.UserData>{userData ? userData.username : ""}</S.UserData>
                        <S.UserPublishContainer>
                        
                        </S.UserPublishContainer>
                        {renderPosts()}
                    </S.PostsContainer>
                    <Trending />
                    <S.SidebarContainer>
                    </S.SidebarContainer>
                </S.ContentContainer>
              
            </S.Main>
        </>

    );
}