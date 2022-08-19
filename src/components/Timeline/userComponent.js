import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../../context/userContext.js";
import Post from "./Post/index.jsx";
import * as S from "./style";
import Trending from "./Trending/index.jsx";


export default function User() {
    const userId = parseInt(useParams().id);
    const [userPosts, setUserPosts] = useState([]);
    const [userData, setUserData] = useState("");
    const { token, id, setShowHeader } = useContext(UserContext);
    const [buttonFollowing, setBUttonFollowing] = useState(userId === id ? "" : "Loading...");
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    setShowHeader(true);
    
    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/${userId}`, config);
        promise.then(response => {
            setUserPosts(response.data);
            setIsLoading(false);
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

    /*eslint-disable  react-hooks/exhaustive-deps */ 
    function follow(e) {
        e.preventDefault();
        setIsDisabled(true);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const promise = axios.post(`${process.env.REACT_APP_API_BASE_URL}/follows/${userId}/${id}`, {},config);
        promise.then(() => {
            setBUttonFollowing(
                <button 
                        style={{color: "#1877F2", backgroundColor: "#FFFFFF" }}
                        onClick={unfollow}
                        disabled={isDisabled}    
                    >
                        Unfollow
                    </button>);
        })
        promise.catch(() => {
            alert("An error has occurred. Try again latter!");
        });
        setIsDisabled(false);
    }

    function unfollow(e) {
        e.preventDefault();
        setIsDisabled(true);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const promise = axios.delete(`${process.env.REACT_APP_API_BASE_URL}/follows/${userId}/${id}`, config);
        promise.then(() => {
            setBUttonFollowing(
                <button 
                    style={{backgroundColor: "#1877F2", color: "var(--secondary-color)" }}
                    onClick={follow}
                >
                    Follow
                </button>);
        })
        promise.catch(() => {
            alert("An error has occurred. Try again latter!");
        });
        setIsDisabled(false);
    }

    useEffect(() => {
        if (userId === id) return;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/follows/${userId}/${id}`, config);
        promise.then((response) => {
            if (response.data.length) {
                setBUttonFollowing(
                    <button 
                        style={{color: "#1877F2", backgroundColor: "#FFFFFF" }}
                        onClick={unfollow}
                        disabled={isDisabled}    
                    >
                        Unfollow
                    </button>);
            }
            else {
                setBUttonFollowing(
                    <button 
                        style={{backgroundColor: "#1877F2", color: "var(--secondary-color)" }}
                        onClick={follow}
                        disabled={isDisabled}
                    >
                        Follow
                    </button>);
            }
        })
    }, [token, id, userId]);

    async function getPosts() {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/${userId}`, config);
        promise.then(response => {
            setUserPosts(response.data);
        });
    }

    function renderPosts() {
        if (isLoading) return <span>Loading...</span>;
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
        return <span>There are no posts yet</span>;
    }

    return (
        <>
            <S.Main>
                <S.UserData>
                    <h1>
                        {userData ? userData.username + "'s posts" : ""}
                    </h1>
                    {buttonFollowing}
                </S.UserData>
                <S.ContentContainer>
                    <S.PostsContainer>
                        {renderPosts()}
                    </S.PostsContainer>
                    <S.SidebarContainer>
                        <Trending />
                    </S.SidebarContainer>
                </S.ContentContainer>
              
            </S.Main>
        </>

    );
}