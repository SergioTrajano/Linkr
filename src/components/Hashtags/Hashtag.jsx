
import Header from "../Header";
import * as S from "./style";
import Trending from "../Trending/index.jsx";
import { useParams } from "react-router-dom";
import { useState  , useEffect} from "react";
import Post from "../Post/index.jsx"
import axios from "axios";





export default function HashTag() {
    const {hashtag}=useParams
    console.log(hashtag)
    
    const [info , setInfo]=useState(null)

    useEffect(() => {
        const URL = `https://back-projeto17-linkr.herokuapp.com/hashtag/${hashtag}`;
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