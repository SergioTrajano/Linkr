import * as S from "./style";
import { useState , useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Trending( ){
    const [trending, setTrending] = useState([])
const navigate=useNavigate()
    
    async function getTrending() {
        try {
            const result = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/trending`);
          
            setTrending(result.data);
           
        } catch (e) {
            console.log(e);
          
          
        }
    }  
    useEffect(()=>{
        getTrending()
    },[])
   
    

    return(<>
    <S.Container>
        <S.Title>
            <S.TrendingTitle>trending</S.TrendingTitle>
        
        </S.Title>
        <S.Hashtags>
        {trending.map(item=>  <S.Hashtag onClick={()=>{ navigate(`/hashtag/${item.name}`)}}>#{item.name}</S.Hashtag>)}
           
            </S.Hashtags>
    </S.Container>
    </>)
}
