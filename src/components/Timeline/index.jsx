import {  useEffect, useState, useContext} from "react";
import Post from "./Post/index.jsx";
import axios from "axios";
import UserContext from "../../context/userContext.js";
import SendPostCard from "./UserPublish/index.jsx";
import * as S from "./style";
import Trending from "./Trending/index.jsx";

const Timeline = () => {
    const { token, id } = useContext(UserContext);
    const [posts, setPosts] = useState("");
    const [followsCount, setFollowsCount] = useState("");

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
           
            setPosts(result.data);

        } catch (e) {
            alert(
                "An error occured while trying to fetch the posts, please refresh the page"
            );
            console.log(e);
        }
    }

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const result = axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/posts`,
            config
        );
        result.then((res) => {
        setPosts(res.data);
        });
        result.catch((e) => {
            alert(
                "An error occured while trying to fetch the posts, please refresh the page"
            );
            console.log(e);
        });
    }, [token]);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/follows/${id}`, config);
        promise.then(res => {
            setFollowsCount(res.data);
        });
        promise.catch(e => {
            console.log(e);
        })
    }, [id, token]);

    function renderPosts() {
        if (followsCount === 0) {
            return <span>You don't follow anyone yet. Search for new friends!</span>
        }
        if (posts.length) {
            const timeline = posts.map(
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
                        setPosts={setPosts}
                        getPosts={getPosts} 
                        likes={likes}
                    />
                )
            );
            return timeline;
        }
        if (!posts.length) return <span>No posts found from your friends</span>;
        return <span>Loading...</span>;
    }
    return (
            <S.Main>
                <S.UserData>
                    <h1>timeline</h1>
                </S.UserData>
                <S.ContentContainer>
                    <S.PostsContainer>
                        <S.UserPublishContainer>
                            <SendPostCard getPosts={getPosts} />
                        </S.UserPublishContainer>
                        {renderPosts()}
                    </S.PostsContainer>
                    <S.SidebarContainer>
                        <Trending />
                    </S.SidebarContainer>
                </S.ContentContainer>
            </S.Main>
    );
};
export default Timeline;