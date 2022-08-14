
import { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
/* import ReactHashtag from "react-hashtag"; */
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
import UserContext from "../../contexts/UserContext";

/* import animationDataLike from "../assets/like-icon.json"; */
/* import animationDataDelete from "../assets/delete-icon.json"; */
/* import { ReactTagify } from "react-tagify"; */

import * as S from "./styles";

export default function Post({
    key,
    username,
    pictureURL,
    url,
    article,
    titleUrl,
    imageUrl,
    descriptionUrl,
    likes,
    postId,
    creatorId,
    setPosts,getPosts,getTrending
}){

const { token, userId, setUserId, setImage, setName } = useContext(UserContext);
const [bodyValue, setBodyValue] = useState();
const [originalBody, setOriginalBody] = useState(article);
const [textEdit, setTextEdit] = useState(false);
const [like, setLike] = useState(likes);
const [show, setShow] = useState(false);
const [isInputDisabled, setIsInputDisabled] = useState("");
const [isDisabled, setIsDisabled] = useState("");
const navigate = useNavigate();
const inputRef = useRef();
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
/* const likeDefaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animationDataLike,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
};
 */
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

/* const deleteDefaultOptions = {
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
}; */

const normalAnimation = 1;
const reverseAnimation = -1;
const legendAlt = `${username} profile pic`;

/* useEffect(() => {
    if (textEdit === true) {
        inputRef.current.focus();
    }

    getLikes();
}, [textEdit]); */

/* async function getLikes() {
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

        console.log(e);
    }
} */

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

    const promisse = axios
        .put(
            `${process.env.REACT_APP_BASE_URL}/posts/${postId}`,
            {
                bodyValue,
            },
            config
        )
        .then(() => {
            setOriginalBody(bodyValue);
            setTextEdit(!textEdit)
            setIsInputDisabled('');
        })
        .catch((e) => {
            setIsInputDisabled('');
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
                `${process.env.REACT_APP_BASE_URL}/like/${postId}`,
                config
            )

            .then(() => removeLike())

            .catch((e) => console.log(e));
    } else {
        const promisse = axios
            .post(
                `${process.env.REACT_APP_BASE_URL}/like/${postId}`,
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
            `${process.env.REACT_APP_BASE_URL}/post/${postId}`,
            config
        )
        .then(() => removedPostSuccess())
        .catch((e) => error(e));
}
    return (
        <S.Wrapper >
          <span>
                <S.PostContainer key={key} >
                    <S.PostSideContainer>
                        <S.PostUserImage
                           src={pictureURL} alt={legendAlt}
                        />
                    </S.PostSideContainer>

                    <S.PostContentContainer>
                        <S.PostUserName>
                            <p onClick={() => navigate(`/timeline/user/${creatorId}`)}>
                             {username}
                            </p>
                            {textEdit === false ? (
                             <S.PostText>
                             {/* <ReactHashtag
                                 tagStyle={tagStyle}
                                 tagClicked={(tag) => {
                                     const tagWithoutHash = tag.replace("#", "");
                                     navigate(`/hashtag/${tagWithoutHash}`);
                                 }}
                             >
                               {originalBody}
                             </ReactHashtag > */}
                         </S.PostText>
                        ) : (
                            <S.PostForm
                            onSubmit={(e) => updateBody(e)} 
                        >
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
                            {creatorId === userId ? (
                            <S.IconsContainer
                                userId={userId}
                            >
                                <TiPencil
                                    onClick={() => setTextEdit(!textEdit)}
                                    className="icon-post"
                                />
                                <FaTrash
                                    onClick={() => setShow(true)}
                                    className="icon-post"
                                />
                            </S.IconsContainer>
                                 ) : null}
                        </S.PostUserName>
                        <S.LinkBox href={url} target="_blank">
                        <div>
                            <h4>{titleUrl}</h4>
                            <h5>{descriptionUrl}</h5>
                            <h6>{url}</h6>
                        </div>
                            <img src={imageUrl} alt={titleUrl} />
                        </S.LinkBox>

                    </S.PostContentContainer>
               
        </S.PostContainer>
            </span>
             
        </S.Wrapper>
    );
};

