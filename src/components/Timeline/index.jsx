import Header from "../../components/Header";
import UserPublish from "../UserPublish";
import * as S from "./style";


const Timeline = () => {

    return (
        <>
            <Header />
            <S.Main>
                <S.TimelineContainer>{"timeline"}</S.TimelineContainer>
                <S.ContentContainer>
                    <S.PostsContainer>
                        <S.UserData>timeline</S.UserData>
                        <S.UserPublishContainer>
                            <UserPublish />
                        </S.UserPublishContainer>
                      
                    </S.PostsContainer>
                    <S.SidebarContainer>
                 
                    </S.SidebarContainer>
                </S.ContentContainer>
            </S.Main>
        </>
    );
};
export default Timeline;