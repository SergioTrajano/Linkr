/* import { useContext, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

import { TimelineContext } from "../../providers/ TimelineProvider";
import { LoadingContext } from "../../providers/LoadingProvider";
import isLogged from "../../utils/isLogged";
import Post from "../Post"; */

import Header from "../../components/Header";
import UserPublish from "../UserPublish";
import * as S from "./style";
import Trending from "../Trending/index.jsx";
/* import UpdatePosts from "../EditPost";
import LoadingLottie from "../Lottie";
 */
const Timeline = () => {
 /*    const navigate = useNavigate();
    const { dataPosts, catchPosts, newPosts } = useContext(TimelineContext);
    const { loading } = useContext(LoadingContext);
   
    useLayoutEffect(() => {
        if (!isLogged()) navigate("/");
        else catchPosts();
    },); */
    return (
        <>
            <Header />
            <S.Main>
                <S.TimelineContainer>{"timeline"}</S.TimelineContainer>
                <S.ContentContainer>
                    <S.PostsContainer>
                        <S.UserData>timeline</S.UserData>
                        <S.UserPublishContainer>
                        <UserPublish  />
                        </S.UserPublishContainer>
                        {/* <UpdatePosts numberPosts={newPosts.length} />
                        {loading ? (
                            <LoadingLottie />
                        ) : (
                            dataPosts?.map(
                                ({
                                    id,
                                    username,
                                    pictureURL,
                                    userId,
                                    article,
                                    url,
                                    urlMetadata,
                                    
                                }) => (
                                    <Post
                                        key={id}
                                        postId={id}
                                        username={username}
                                        pictureURL={pictureURL}
                                        userId={userId}
                                        article={article}
                                        url={url}
                                        urlMetadata={urlMetadata}
                                      
                                    />
                                ),
                            )
                        )}
                         */}
                    </S.PostsContainer>
                    <Trending/>
                    <S.SidebarContainer>
                 
                    </S.SidebarContainer>
                </S.ContentContainer>
              
            </S.Main>
          
        </>
    );
};
export default Timeline;