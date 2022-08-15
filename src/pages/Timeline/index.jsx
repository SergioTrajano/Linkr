import {  useEffect, useState, useContext} from "react";
import Post from "../../components/Post";
import axios from "axios";
import UserContext from "../../contexts/UserContext";
import Header from "../../components/Header";
import UserPublish from "../../components/UserPublish";
import * as S from "./style";
/* import Trending from "../../components/Trending/index.jsx";
 */
const Timeline = () => {
    const { token } = useContext(UserContext);
    console.log(token)
    const [posts, setPosts] = useState([]);
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
   
   /*  async function getTrending() {
        try {
            const result = await axios.get(`https://back-projeto17-linkr.herokuapp.com/trending`);
            setTrending(result.data);
        } catch (e) {
            alert(
                "An error occured while trying to fetch the trending hashtags, please refresh the page"
            );
            console.log(e);
        }
    }  */

    function renderPosts() {
        if (posts) {
            const timeline = posts.map(
                ({
                    id,
                    username,
                    pictureURL,
                    url,
                    article,
                    title,
                    image,
                    description,
                    userId,
                    like
                }) => (
                    <Post
                        key={id}
                        name={username}
                        pictureURL={pictureURL}
                        url={url}
                        article={article}
                        titleUrl={title}
                        imageUrl={image}
                        descriptionUrl={description}
                        likes={like}
                        postId={id}
                        creatorId={userId}
                        setPosts={setPosts}
                        getPosts={getPosts} 
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
                        <UserPublish getPosts={getPosts}  />
                        </S.UserPublishContainer>
                        {renderPosts()}
                    </S.PostsContainer>
                    <S.SidebarContainer>
                {/*      <Trending getTrending={getTrending}/>  */}
                    </S.SidebarContainer>
                </S.ContentContainer>
              
            </S.Main>
          
        </>
    );
};
export default Timeline;