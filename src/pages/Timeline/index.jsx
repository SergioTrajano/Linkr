import {  useEffect, useState, useContext} from "react";
import Post from "../../components/Post";
import axios from "axios";
import UserContext from "../../contexts/UserContext";
import SendPostCard from "../../components/UserPublish";
import Header from "../../components/Header";
import * as S from "./style";
import Trending from "../../components/Trending/index.jsx";
 
const Timeline = () => {
    const { token,setImage, setName } = useContext(UserContext);
    const [posts, setPosts] = useState("");
  /*   const [trending, setTrending] = useState(""); */


    async function getPosts() {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const result = await axios.get(
                `https://back-projeto17-linkr.herokuapp.com/posts`,
                config
            );
           
            setPosts(result.data);
            console.log(result.data)

        } catch (e) {
            alert(
                "An error occured while trying to fetch the posts, please refresh the page"
            );
            console.log(e);
        }
    }
  
    useEffect(()=>{
        getPosts() 
        
    },[]);
 

    function renderPosts() {
        if (posts) {
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
                    likes
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
                        likes={likes}
                        postId={postId}
                      
                        // setPosts={setPosts}
                        // getPosts={getPosts} 
                    /*     getTrending={getTrending} */
                    />
                )
            );
            return timeline;
        }
        if (posts === []) return <span>There are no posts yet</span>;
        return <span>Loading...</span>;
    }
    return (
        <>
            <Header />
            <S.Main>
                <S.TimelineContainer>{"timeline"}</S.TimelineContainer>
                <S.ContentContainer>
                    <S.PostsContainer>
                        <S.UserData>timeline</S.UserData>
                        <S.UserPublishContainer>
                        <SendPostCard getPosts={getPosts} />
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
};
export default Timeline;