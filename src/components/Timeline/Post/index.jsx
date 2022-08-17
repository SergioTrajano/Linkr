import { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import Lottie from "react-lottie";
/* import { toast } from "react-toastify"; */
import ReactTooltip from 'react-tooltip';
import styled from "styled-components";
import * as S from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
import UserContext from "../../../context/userContext.js";
import animationDataLike from "../assets/like-icon.json";
import animationDataDelete from "../assets/delete-icon.json";
import AiOutlineComment from 'react-icons'
import IoPaperPlaneOutline from 'react-icons'
import { ReactTagify } from "react-tagify"; 

export default function PostCard({
    key,
    url,
    article,
    urlTitle,
    urlImage,
    urlDescription,
    username,
    creatorId,
    pictureURL,
    likes,
    postId,
    getPosts,
}) {

    const { token, name } = useContext(UserContext);
    const [bodyValue, setBodyValue] = useState(article);
    const [originalBody, setOriginalBody] = useState(article);
    const [textEdit, setTextEdit] = useState(false);
    const [like, setLike] = useState(likes?.length);
    const [comment, setComment]= useState(comments.length)
    const [commentScreen,setCommentScreen]=useState(false)
    const [show, setShow] = useState(false);
    const [isInputDisabled, setIsInputDisabled] = useState("");
    const [isDisabled, setIsDisabled] = useState("");
    const navigate = useNavigate();
    const inputRef = useRef();
    const handleClose = () => setShow(false);
    const toggleEditing = () => {
        setTextEdit(!textEdit);
    };
    const [modalDisplay, setModalDisplay] = useState("none");
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
        isPaused: true,
        direction: likes.some(e => e.username === name) ? 1 : -1,
    });
    const likeDefaultOptions = {
        loop: false,
        autoplay: likes.some(e => e.username === name),
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

    const filterLikes=likes.filter((e)=>e.username!==name)

    function tooltipIfs() {
        if(animationLikeState.direction===1) {
            if(filterLikes.length>1){
                return `Você, ${filterLikes[0]?.username}, ${filterLikes[1]?.username} e outras ${filterLikes.length-2} pessoas`
            } 
            if(filterLikes.length===1){
                return `Você e ${filterLikes[0]?.username} curtiram`
            }
            if(filterLikes.length<1){
                return `Você curtiu`
            } 
        } else{
            if(filterLikes.length>2){
                return `${filterLikes[0]?.username}, ${filterLikes[1]?.username}, ${filterLikes[2]?.username} e outras ${filterLikes.length-3} pessoas`
            }
            if(filterLikes.length===2){
                return `${filterLikes[0]?.username} e ${filterLikes[1]?.username} curtiram`
            }
            if(filterLikes.length===1){
                return `${filterLikes[0]?.username} curtiu`
            }
            if(filterLikes.length===0){
                return `Nenhuma curtida ainda`
            }
        }
    }
   
    const [tooltip,setTooltip]=useState(tooltipIfs)

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
    const legendAlt = `${username} profile pic`;

    function handleKeyPress(event) {
        if (event.key === "Escape") {
            setTextEdit(!textEdit);
        }
    }

    function updateBody(e) {
        e.preventDefault();

        if (originalBody === bodyValue) {
            return setTextEdit(!textEdit);
        }

        setIsInputDisabled("disabled");
        const promise = axios
            .put(
                `${process.env.REACT_APP_API_BASE_URL}/posts/${postId}`,
                {
                    article: bodyValue,
                },
                config
            )
        promise.then(() => {
                setOriginalBody(bodyValue);
                setTextEdit(!textEdit);
                setIsInputDisabled("");
            })
        promise.catch((e) => {
                setIsInputDisabled("");
                alert(e);
            });
    }

    useEffect(() => {
        setTooltip(tooltipIfs);
    }, [animationLikeState])

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
            const promise = axios
                .delete(
                    `${process.env.REACT_APP_API_BASE_URL}/like/${postId}`,
                    config
                )

            promise.then(() => removeLike())

            promise.catch((e) => alert(e));
        } else {
            const promise = axios
                .post(
                    `${process.env.REACT_APP_API_BASE_URL}/like/${postId}`,
                    {},
                    config
                )

            promise.then(() => addLike())

            promise.catch((e) => console.log(e));
        }
    }

    function reloadPage() {
        getPosts();
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

        const promise = axios
            .delete(
                `${process.env.REACT_APP_API_BASE_URL}/`,
                config
            )
        promise.then(() => removedPostSuccess())
        promise.catch((e) => error(e));
    }

    return (
    <>
        <Modal modalDisplay={modalDisplay}>
            <div>
                <p>
                    Are you sure you want
                    to delete this post?
                </p>
                <div>
                    <button onClick={() => setModalDisplay("none")}>
                        No, go back
                    </button>
                    <button onClick={() => {
                        const promise = axios.delete(`${process.env.REACT_APP_API_BASE_URL}/posts/${postId}`, config);
                        promise.then(() => {
                            getPosts();
                            setModalDisplay("flex")
                        })
                    }
                    }>
                        Yes, delete it
                    </button>
                </div>
            </div>
        </Modal>
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
                    <span data-tip={tooltip}
                        data-class='classTooltip'
                        data-arrow-color='white'
                    >
                    <h6>{like} likes</h6>
                    </span>
                    <ReactTooltip />
                    <AiOutlineComment onClick={()=>setCommentScreen(true)}/>
                    <h6>{comments} comments</h6>
                </ProfilePhoto>

                <S.PostContentContainer>

                    <S.PostUserName>
                    <Link to={`/user/${creatorId}`}>
                        <h3 >{username}</h3>
                    </Link>
                    
                            <S.IconsContainer  >

                            <TiPencil
                                onClick={() => {if(name===username) setTextEdit(!textEdit)}}
                                className="icon-post"
                            />
                        
                            <FaTrash
                                onClick={() => {if (name===username) setModalDisplay("flex")}}
                                className="icon-post"
                            />
                            </S.IconsContainer>  
                    

                    </S.PostUserName>
                    {textEdit === false ? (
                            <ReactTagify
                                tagStyle={tagStyle}
                                tagClicked={(tag) => {
                                    const tagWithoutHash = tag.replace("#", "");
                                    navigate(`/hashtag/${tagWithoutHash}`);
                                }}
                            >
                                <p style={{color: "#9B9595"}}>{originalBody}</p>
                            </ReactTagify>
                        ) : (
                            <S.PostForm onSubmit={(e) => updateBody(e)}>
                        
                                <S.PostInput
                                    type="text"
                                    ref={inputRef}
                                    placeholder="Awesome article about #javascript"
                                    onChange={(e) => setBodyValue(e.target.value)}
                                    value={bodyValue}
                                    disabled={isInputDisabled}
                                    onKeyUpCapture={(e) => handleKeyPress(e)}
                                    required
                                />
                        </S.PostForm>
                        )}
                    





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

                        {(commentScreen 
                        ? 
                        <AllComments>
                            {comment.map(e=>
                            <Comment>
                                {e.pictureURL}
                                <CommentText>
                                    <span> 
                                        {e.username} {e.username===username ? <>• post's author</> : <></>} 
                                    </span>
                                    <p> {e.text} </p>
                                </CommentText>
                            </Comment> 
                            )}
                            <WriteComment >
                                {pictureURL}
                                <CommentText>
                                    <input placeholder='write a comment...' />
                                    <IoPaperPlaneOutline/>
                                </CommentText>
                            </WriteComment>
                        </AllComments>
                            
                        : 
                        <WriteComment >
                                {pictureURL}
                            <CommentText>
                                <input placeholder='write a comment...' />
                                <IoPaperPlaneOutline/>
                            </CommentText>
                        </WriteComment>
                        )}
                </S.PostContentContainer>

            </S.PostContainer >

        </S.Wrapper>
    </>
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

const Modal = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.4);
    z-index: 2;
    display: ${props => props.modalDisplay};
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;

    > div {
        width: 597px;
        height: 267px;
        background-color: #333333;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 40px 130px 70px 130px;
        border-radius: 20px;

        p {
            font-family: var(--primary-font);
            font-size: 34px;
            line-height: 38px;
            font-weight: bold;
            color: var(--secondary-color);
            margin-bottom: 20px;
            text-align: center;
        }

        > div {
            display: flex;
            justify-content: space-between;
            width: 300px;

            > button {
                width: 134px;
                height: 37px;
                border-radius: 5px;
                border: none;
                font-size: 18px;
                line-height: 21px;
                font-family: var(--primary-font);
                padding: 10px 20px;
            }

            > button:first-child {
                background-color: var(--secondary-color);
                color: #1877F2;
            }

             >button:last-child {
                background-color: #1877F2;
                color: var(--primary-color);
            }
        }
    }
`

