import * as S from "./style";
import Vector from "../../assets/Vector.png";

export default function Load({posts, dbPosts, getPosts}){

    return(
        <S.Container view={posts.length < dbPosts.length ? "flex" : "none"} onClick={getPosts}>
        <h1>{dbPosts.length - posts.length } new posts, load more!</h1><img src={Vector} alt="Vector"/>
        </S.Container>
    );
}

