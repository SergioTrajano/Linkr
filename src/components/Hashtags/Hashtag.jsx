
import Header from "../Header";
import * as S from "./style";
import Trending from "../Trending/index.jsx";
import { useParams } from "react-router-dom";
import { useState  , useEffect} from "react";
import Post from "../../components/Post"
import axios from "axios";





export default function HashTag() {
    const {hashtag}=useParams()
    console.log(hashtag)

    const [info , setInfo]=useState([])
   
    async function getPostsByHashtag() {
        try {
            const result = await axios.get(`https://back-projeto17-linkr.herokuapp.com/hashtag/${hashtag}`);
          
            setInfo(result.data);
            console.log(result.data)
           
        } catch (e) {
            console.log(e);
          
          
        }
    }  
useEffect(()=>{
    getPostsByHashtag()
},[])
   
function renderPosts() {
   
        const timeline = info.map(
            ({
                postId,
                url,
                article,
                urlTitle,
                urlImage,
                urlDescription,
                username,
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


    return (<>
        <Header />
        <S.Main>
            <S.TimelineContainer>
                {"hashtag"}
            </S.TimelineContainer>
            <S.ContentContainer>
                <S.PostsContainer>
                    <S.UserData>

                        #{`${hashtag}`}

                    </S.UserData>
                    <S.UserPublishContainer>
                 
                {renderPosts()}


                    </S.UserPublishContainer>

                </S.PostsContainer>
                <Trending />
                <S.SidebarContainer>

                </S.SidebarContainer>
            </S.ContentContainer>

        </S.Main>

    </>)
}