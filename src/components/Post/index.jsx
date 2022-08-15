import { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import Lottie from "react-lottie";
/* import { toast } from "react-toastify"; */
import styled from "styled-components";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
import UserContext from "../../contexts/UserContext";
import animationDataLike from "../assets/like-icon.json";
import animationDataDelete from "../assets/delete-icon.json";

/* import { ReactTagify } from "react-tagify"; */

export default function PostCard({
    key,
    url,
    article,
    urlTitle,
    urlImage,
    urlDescription,
    name,
    creatorId,
    pictureURL,
    likes,
    postId,
    setPosts,
    getPosts,
    getTrending,
}) {

    const { token, userId, setUserId,setLoad } = useContext(UserContext);
    const [bodyValue, setBodyValue] = useState(article);
    const [originalBody, setOriginalBody] = useState(article);
    const [textEdit, setTextEdit] = useState(false);
    const [like, setLike] = useState(likes);
    const [show, setShow] = useState(false);
    const [isInputDisabled, setIsInputDisabled] = useState("");
    const [isDisabled, setIsDisabled] = useState("");
    const navigate = useNavigate();
    const inputRef = useRef();
    const [articleLog, setArticleLog] = useState(article);
    const [editPostState, setEditPostState] = useState(false);
    const handleClose = () => setShow(false);
    const toggleEditing = () => {
        setTextEdit(!textEdit);
    };
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,

        },
    };
    

    const tagStyle = {
        fontFamily: "Lato",
        fontSize: "18px",
        fontWeight: "700",
        lineHeight: "20px",
        letterSpacing: "0em",
        textAlign: "left",
        color: "#FAFAFA",
    };
    const [animationLikeState, setAnimationLikeState] = useState({
        isStopped: false,
        isPaused: false,
        direction: -1,
    });
    const likeDefaultOptions = {
        loop: false,
        autoplay: false,
        animationData: animationDataLike,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const [animationDeleteState, setAnimationDeleteState] = useState({
        isStopped: false,
        isPaused: false,
        direction: 1,
        speed: 0.09,
        eventListeners: [
            {
                eventName: "complete",
                callback: reloadPage,
            },
        ],
    });

    const deleteDefaultOptions = {
        loop: false,
        autoplay: false,
        animationData: animationDataDelete,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
        eventListeners: [
            {
                eventName: "complete",
                callback: () => console.log("the animation completed:"),
            },
        ],
    };

    const normalAnimation = 1;
    const reverseAnimation = -1;
    const legendAlt = `${name} profile pic`;

   /*  useEffect(() => {
        if (textEdit === true) {
            inputRef.current.focus();
        }

        getLikes();
    }, [textEdit]);  */

   /*  async function getLikes() {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const { data: result } = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/like/${postId}`,
                config
            );
            setUserId(result?.userId);
            if (result.isLiked === true) {
                setAnimationLikeState({ ...animationLikeState, direction: 1 });
            }
        } catch (e) {
            alert(
                "An error occured while trying to fetch the posts, please refresh the page"
            );

            setTimeout(() => {
                navigate("/");
              }, 1000);

            console.log(e);
        }
    }
  */
    function handleKeyPress(event) {
        if (event.key === "Escape") {
            setTextEdit(!textEdit);
        }
    }

    function findHashtags(searchText) {
        var regexp = /(\s|^)\#\w\w+\b/gm;
        let result = searchText.match(regexp);
        if (result) {
            result = result.map(function (s) {
                return s.trim();
            });
            return result;
        } else {
            return [];
        }
    }

    function removeDuplicates(arr) {
        const uniqueHashtag = arr.reduce(function (newArray, currentValue) {
            if (!newArray.includes(currentValue)) newArray.push(currentValue);
            return newArray;
        }, []);
        return uniqueHashtag;
    }

    function updateBody(e) {
        e.preventDefault();
        const hashtags = removeDuplicates(findHashtags(bodyValue));

        if (originalBody === bodyValue) {
            return setTextEdit(!textEdit);
        }

        setIsInputDisabled("disabled");

        const promisse = axios
            .put(
                `${process.env.REACT_APP_BASE_URL}/timeline/${postId}`,
                {
                    bodyValue,
                    hashtags,
                },
                config
            )
            .then(() => {
                setOriginalBody(bodyValue);
                setTextEdit(!textEdit);
                setIsInputDisabled("");
                getTrending();
            })
            .catch((e) => {
                setIsInputDisabled("");
                alert(e);
            });
    }

    function addLike() {
        setAnimationLikeState({
            ...animationLikeState,
            isStopped: false,
            direction: normalAnimation,
        });
        setLike(like + 1);
    }

    function removeLike() {
        setAnimationLikeState({
            ...animationLikeState,
            isStopped: true,
            direction: reverseAnimation,
        });

        setLike(like - 1);
    }

    function postLike() {
        if (animationLikeState.direction === 1) {
            const promisse = axios
                .delete(
                    `https://back-projeto17-linkr.herokuapp.com/`,
                    config
                )

                .then(() => removeLike())

                .catch((e) => alert(e));
        } else {
            const promisse = axios
                .post(
                    `https://back-projeto17-linkr.herokuapp.com/`,
                    {},
                    config
                )

                .then(() => addLike())

                .catch((e) => console.log(e));
        }
    }

    function reloadPage() {
        getPosts();
        getTrending();
        setIsDisabled("");
        setShow(false);
    }

    function removedPostSuccess(s) {
        setAnimationDeleteState({ ...animationDeleteState, isPaused: false });
    }

    function error(e) {
        setAnimationDeleteState({ ...animationDeleteState, isPaused: true });
        setIsDisabled("");
        alert(e);
    }

    function removePost() {
        setIsDisabled("disabled");

        const promisse = axios
            .delete(
                `https://back-projeto17-linkr.herokuapp.com/`,
                config
            )
            .then(() => removedPostSuccess())
            .catch((e) => error(e));
    }

    return (
        <S.Wrapper >

        <S.PostContainer key={key}>
        
            <ProfilePhoto>
                <img src={pictureURL} alt={legendAlt} />
                <div className="animation" onClick={postLike}>
                    <Lottie
                        options={likeDefaultOptions}
                        height={65}
                        width={60}
                        direction={animationLikeState.direction}
                        isStopped={animationLikeState.isStopped}
                    />
                </div>
                <h6>{like > 1 ? `${like} likes` : `${like} like`}</h6>
            </ProfilePhoto>
          
            <S.PostContentContainer>
            <S.PostUserName>
             <h3>{name}</h3> 
             <S.IconsContainer  >

                                <TiPencil
                                    
                                    className="icon-post"
                                />
                            
                                <FaTrash
                                   
                                    className="icon-post"
                                />
             </S.IconsContainer>  
            </S.PostUserName>
                <S.PostLinkPreviewContainer href={url} target="_blank">
                            <S.PostLinkContent>
                                <span>
                                    <S.PostLinkTitle>
                                        {urlTitle}
                                    </S.PostLinkTitle>
                                    <S.PostLinkDescription>
                                        { urlDescription}
                                    </S.PostLinkDescription>
                                </span>
                                <S.PostLinkUrl>{url}</S.PostLinkUrl>
                            </S.PostLinkContent>
                            <S.PostLinkImage src={urlImage} alt={urlTitle}/>
                </S.PostLinkPreviewContainer>

                </S.PostContentContainer>
        
        </S.PostContainer >

        </S.Wrapper>
    );
}


const ProfilePhoto = styled.div`
height: 100%;

    cursor: pointer;
    img {
        width: 58px;
        height: 58px;
        border-radius: 50%;
        object-fit: cover;
    }
    h6 {
        color: #b6b6b6;
        text-align: center;
    }
    
`;

