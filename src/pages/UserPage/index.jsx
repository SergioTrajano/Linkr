import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as S from "./styles";
import Post from "../../components/Post";
import Header from "../../components/Header/index.jsx";



import { DebounceInput } from "react-debounce-input";

export default function UserPage() {
    const [posts, setPosts] = useState("");
    const [trending, setTrending] = useState("");

    const { id } = useParams();

    useEffect(() => {
        getTrending();

        const promise = axios.get(
            `${process.env.REACT_APP_BASE_URL}/timeline/user/${id}`
        );

        promise.then((res) => {
            setPosts(res.data);
        });

        promise.catch((Error) => {
            alert(Error.response.status);
        });
    }, []);

    function renderPosts() {
        if (posts) {
            const timeline = posts.map(
                ({
                    id,
                    username,
                    pictureURL,
                    url,
                    article,
                    title,
                    image,
                    description,
                    userId,
                    like
                }) => (
                    <Post
                    key={id}
                    username={username}
                    pictureURL={pictureURL}
                    url={url}
                    article={article}
                    titleUrl={title}
                    imageUrl={image}
                    descriptionUrl={description}
                    creatorId={userId}
                    likes={like}
                    postId={id}
                    />
                )
            );
            return timeline;
        }
        if (posts === []) return <span>There are no posts yet</span>;
        return <span>Loading...</span>;
    }

    async function getTrending() {
        try {
            const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/trending`);
            setTrending(result.data);
        } catch (e) {
            alert(
                "An error occured while trying to fetch the trending hashtags, please refresh the page"
            );
            console.log(e);
        }
    }
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
                    
                          {/*   <LoadingLottie />
                       
                                    <Post
                                        
                                    /> */}
                       
                    </S.PostsContainer>
                    <S.SidebarContainer>
                        <S.ButtonFollow
                            
                        >
                           
                        </S.ButtonFollow>
                    {/*     <Trending /> */}
                    </S.SidebarContainer>
                </S.ContentContainer>
            </S.Main>
        </>
    );
};

