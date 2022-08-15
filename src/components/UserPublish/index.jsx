import { useState, useContext } from "react";
import axios from "axios";
import * as S from "./styles";
import UserContext from "../../contexts/UserContext";

export default function SendPostCard({ getPosts,getTrending }) {
    const {image, token } = useContext(UserContext);
    const [url, setLink] = useState("");
    const [article, setBody] = useState("");
    const [loading, setLoading] = useState(false);

    console.log(token)
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
                hashtags: hashtags
            };
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
          //  await getPosts();
           // await getTrending();
            setLoading(false);
            setLink("");
            setBody("");
            console.log("deu")
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
                <S.Form onSubmit={publish}className="Desk">
                    <p>What are you going to share today?</p>
                    <S.Inputs>
                        <input
                            type="url"
                            placeholder="  http://..."
                            required
                            onChange={(e) => setLink(e.target.value)}
                            value={url}
                            disabled={loading}
                        ></input>                      
                        <input
                             name="text"
                             rows="14"
                             cols="10"
                             wrap="soft"
                             placeholder="Awesome article about #javascript"
                             required
                             onChange={(e) => setBody(e.target.value)}
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
