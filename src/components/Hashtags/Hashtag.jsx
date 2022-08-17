import * as S from "./style";
import Trending from "../Timeline/Trending/index.jsx";
import { useParams } from "react-router-dom";
import { useState  , useEffect} from "react";
import Post from "../Timeline/Post/index.jsx"
import axios from "axios";


export default function HashTag() {
    const {hashtag}=useParams()

    const [info , setInfo]=useState([])
   
    async function getPostsByHashtag() {
        try {
            const result = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/hashtag/${hashtag}`);
          
            setInfo(result.data);
           
        } catch (e) {
            console.log(e);
        }
    }  
    useEffect(()=>{
        const result =  axios.get(`${process.env.REACT_APP_API_BASE_URL}/hashtag/${hashtag}`);
        result.then(response => {
            setInfo(response.data);
        })
        result.catch(e => {
            console.log(e);
        });
    }, [hashtag])
   
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
                likes,
                userId,
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
                    setPosts={setInfo}
                    getPosts={getPostsByHashtag} 
                />
            )
        );
        return timeline;
 
}


    return (<>
        <S.Main>
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