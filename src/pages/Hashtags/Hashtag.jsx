
import Header from "../Header";
import * as S from "./style";
import Trending from "../Trending/index.jsx";



export default function HashTag(){


    return (<>
        <Header />
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
                       
                    </S.UserPublishContainer>

                </S.PostsContainer>
                <Trending />
                <S.SidebarContainer>

                </S.SidebarContainer>
            </S.ContentContainer>

        </S.Main>

    </>)
}