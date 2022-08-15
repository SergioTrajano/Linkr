import { useState, useContext } from "react";
import axios from "axios";
import * as S from "./styles";
import UserContext from "../../contexts/UserContext";


import styled from "styled-components";


export default function SendPostCard({ getPosts }) {
    const { image, token } = useContext(UserContext);
    const [url, setUrl] = useState("");
    const [article, setArticle] = useState("");
    const [loading, setLoading] = useState(false);
   

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
            if (!newArray.includes(currentValue))
                newArray.push(currentValue);
            return newArray;
        }, []);
        return uniqueHashtag;
    }

    async function publish(e) {
        console.log("to aqui")
     
        setLoading(true);
        try {
            const hashtags = removeDuplicates(findHashtags(article));
            console.log(hashtags)

            const post = {
                url,
                article,
                hashtags,
            };
            console.log(post)
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.post(
                `https://back-projeto17-linkr.herokuapp.com/posts`,
                post,
                config
            );
            await getPosts();
            /* await getTrending(); */
            setLoading(false);
            setUrl("");
            setArticle("");
        } catch (e) {
            alert("Houve um erro ao publicar seu link");
            console.log(e);
            setLoading(false);
        }
    }

    function contentButton() {
        if (loading) {
            return "Publishing...";
        }
        return "Publish";
    }
    return (
     
        <S.BoxPublish>
        <S.Container>
            <S.Data>
                <S.ImageUser>
                <img src={image} alt="img" />
                </S.ImageUser>
                <S.Form onSubmit={publish} className="Desk">
                    <p>What are you going to share today?</p>
                    <S.Inputs>
                        <input
                            type="url"
                            className="inputUrl"
                            placeholder="  http://..."
                            required
                            onChange={(e) => setUrl(e.target.value)}
                            value={url}
                            disabled={loading}
                        ></input>                      
                        <input
                            type="text"
                             placeholder="Awesome article about #javascript"
                             className="inputArticle"
                             onChange={(e) => setArticle(e.target.value)}
                             value={article}
                             disabled={loading}
                        ></input>
                    </S.Inputs>
                    <S.Button>
                        <button
                           disabled={loading}
                           type="submit"
                           className="PublishButton"
                        >
                           {contentButton()}
                        </button>
                    </S.Button>
                </S.Form>
            </S.Data>
        </S.Container>
    </S.BoxPublish>
 
    );
}


