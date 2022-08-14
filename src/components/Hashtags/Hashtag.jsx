
import Header from "../Header";
import * as S from "./style";
import Trending from "../Trending/index.jsx";
import { useParams } from "react-router-dom";
import { useState } from "react";



function Post(info){
    return(
        <S.Post>
        <S.infoUser>
            <S.photoUser>
                <S.imageUser></S.imageUser>
                <ion-icon name="heart-outline"></ion-icon>
                <h1>131 likes</h1>
            </S.photoUser>

        </S.infoUser>
        <S.publishUser>
            <S.userName><h1>Juvenal Juvêncio</h1></S.userName>
            <S.article><h1>Muito maneiro esse tutorial de Material UI com React, deem uma olhada! #react #material</h1></S.article>
            <S.link></S.link>
        </S.publishUser>
    </S.Post>
    )
}

export default function HashTag() {
    const {hashtag}=useParams
    const [info , setInfo]=useState(null)

    useEffect(() => {
        const URL = `https://back-projeto17-linkr.herokuapp.com/hashtags/${hashtag}`;
        const promise = axios.get(URL);
    
        promise.then(response => {
          const { data } = response;
          setInfo(data);
        });
    
        promise.catch(err => {
          const message = err.response.statusText;
          alert(message);
        });
      }, []);


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
                    <Post info={info} />
                       
                    </S.UserPublishContainer>

                </S.PostsContainer>
                <Trending />
                <S.SidebarContainer>

                </S.SidebarContainer>
            </S.ContentContainer>

        </S.Main>

    </>)
}