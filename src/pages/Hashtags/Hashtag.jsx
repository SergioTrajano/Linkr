
import Header from "../Header";
import * as S from "./style";
import Trending from "../Trending/index.jsx";


export default function HashTag(){


    return(<>
            <Header/>
            <S.Main>
                <S.TimelineContainer>
                    {"hashtag"}
                    </S.TimelineContainer>
                <S.ContentContainer>
                    <S.PostsContainer>
                        <S.UserData>
                            
                          #hashtag
                         
                            </S.UserData>
                        <S.UserPublishContainer>
                           <S.Post></S.Post>
                           <S.Post></S.Post>
                           <S.Post></S.Post>
                        </S.UserPublishContainer>
                      
                    </S.PostsContainer>
                    <Trending/>
                    <S.SidebarContainer>
                 
                    </S.SidebarContainer>
                </S.ContentContainer>
              
            </S.Main>
    </>)
}