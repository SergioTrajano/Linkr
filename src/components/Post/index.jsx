import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ReactHashtag from "react-hashtag";

import { ReactComponent as RepostIcon } from "../../assets/icons/repost.svg";
import { AiOutlineComment as CommentsIcon } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
import ReactTooltip from "react-tooltip";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import getUserData from "../../utils/getUserData";

import { PublishContext } from "../../providers/UserPublishProvider";
import { LoadingContext } from "../../providers/LoadingProvider";

import ScreenDelete from "../ConfirmModal";

import * as S from "./styles";

const Post = ({
    postId,
    username,
    pictureURL,
    userId,
    article,
    url,
    urlMetadata,

}) => {
    const navigate = useNavigate();
    const { editPost } = useContext(PublishContext);
    
    const [deletePost, setDeletePost] = useState(false);
    const [editPostState, setEditPostState] = useState(false);
    const { setLoading } = useContext(LoadingContext);

    const [articleLog, setArticleLog] = useState(article);

    const currentUserId = userId;
    const userIdStorage = getUserData().userId;
    const currentUserPic = getUserData().pictureURL;
   
    return (
        <S.Wrapper >
         {/*    <span>
                <S.PostContainer >
                    {deletePost && (
                        <ScreenDelete
                            closeModal={() => setDeletePost(true)}
                            postId={postId}
                            tittle={
                                "Are you sure you want to delete this post?"
                            }
                            cancelButton={"No, go back"}
                            confirmButton={"Yes, delete it"}
                            modalFunction={() => {
                                setLoading(true);
                                deletePost(postId, () => {
                                    setDeletePost(false);
                                });
                            }}
                        />
                    )}
                    
                    <S.PostSideContainer>
                        <S.PostUserImage
                            src={pictureURL}
                            onClick={() => navigate(`/user/${userId}`)}
                        />
                  
                    </S.PostSideContainer>
                    <S.PostContentContainer>
                        <S.PostUserName>
                            <p onClick={() => navigate(`/user/${userId}`)}>
                                {username}
                            </p>
                            <S.IconsContainer
                                userId={userId}
                                userIdStorage={userIdStorage}
                            >
                                <TiPencil
                                    onClick={() =>
                                        setEditPostState(!editPostState)
                                    }
                                    className="icon-post"
                                />
                                <FaTrash
                                    onClick={() => setDeletePost(!deletePost)}
                                    className="icon-post"
                                />
                            </S.IconsContainer>
                        </S.PostUserName>
                        {editPostState ? (
                            <S.PostForm
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    setArticleLog(articleLog);
                                    editPost(postId, {
                                        article: articleLog,
                                        url: url,
                                    });
                                    setEditPostState(!editPostState);
                                }}
                            >
                                <S.PostInput
                                    type="text"
                                    value={articleLog}
                                    onChange={(e) =>
                                        setArticleLog(e.target.value)
                                    }
                                />
                            </S.PostForm>
                        ) : (
                            <S.PostText>
                                <ReactHashtag
                                    onHashtagClick={(hashtagValue) =>
                                        navigate(
                                            `/hashtag/${hashtagValue
                                                .replace("#", "")
                                                .toLowerCase()}`,
                                        )
                                    }
                                >
                                    {articleLog}
                                </ReactHashtag>
                            </S.PostText>
                        )}

                        <S.PostLinkPreviewContainer href={url} target="_blank">
                            <S.PostLinkContent>
                                <span>
                                    <S.PostLinkTitle>
                                        {urlMetadata.title}
                                    </S.PostLinkTitle>
                                    <S.PostLinkDescription>
                                        {urlMetadata.description}
                                    </S.PostLinkDescription>
                                </span>
                                <S.PostLinkUrl>{url}</S.PostLinkUrl>
                            </S.PostLinkContent>
                            <S.PostLinkImage src={urlMetadata.image} />
                        </S.PostLinkPreviewContainer>
                    </S.PostContentContainer>
                </S.PostContainer>
            </span>
             */}
        </S.Wrapper>
    );
};

export default Post;