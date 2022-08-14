import { useContext, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { UserPageContext } from "../../providers/ UserPageProvider";
import isLogged from "../../utils/isLogged";
import getUserData from "../../utils/getUserData";

import Header from "../../components/Header";
import Post from "../../components/Post";
import Trending from "../../components/Trending";
import UserPublish from "../../components/UserPublish";
import { LoadingContext } from "../../providers/LoadingProvider";
import LoadingLottie from "../Lottie";

import * as S from "./styles";

const UserPage = () => {
  
    return (
        <>
            <Header />
            <S.Main>
                <S.ContentContainer>
                    <S.PostsContainer>
                        <S.UserData>
                            <div>
                                <S.UserImage />
                              
                            </div>
                            <S.ButtonFollowMobile
                                
                            >
                               
                            </S.ButtonFollowMobile>
                        </S.UserData>
                    
                            <LoadingLottie />
                       
                                    <Post
                                        
                                    />
                       
                    </S.PostsContainer>
                    <S.SidebarContainer>
                        <S.ButtonFollow
                            
                        >
                           
                        </S.ButtonFollow>
                        <Trending />
                    </S.SidebarContainer>
                </S.ContentContainer>
            </S.Main>
        </>
    );
};

export default UserPage;