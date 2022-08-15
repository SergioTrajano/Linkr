import { useState, useContext } from "react";
import axios from "axios";
import * as S from "./styles";
import UserContext from "../../../context/userContext.js";

export default function SendPostCard({ getPosts }) {
    const { image, token } = useContext(UserContext);
    const [url, setUrl] = useState("");
    const [article, setArticle] = useState("");
    const [loading, setLoading] = useState(false);

    async function publish(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const post = {
                url,
                article,
            };
            console.log(post)
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/posts`,
                post,
                config
            );
            await getPosts();
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
                            maxLength={150}
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


