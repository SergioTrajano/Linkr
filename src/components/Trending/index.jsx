import * as S from "./style";
import { useState , useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default function Trending( ){
    const [trending, setTrending] = useState([])

    
    async function getTrending() {
        try {
            const result = await axios.get(`https://back-projeto17-linkr.herokuapp.com/trending`);
          
            setTrending(result.data);
           
        } catch (e) {
            console.log(e);
          
          
        }
    }  
    useEffect(()=>{
        getTrending()
    },[])
   
      
   async function getHashtagByName(){
    
   }
   

    return(<>
    <S.Container>
        <S.Title>
            <S.TrendingTitle>trending</S.TrendingTitle>
        
        </S.Title>
        <S.Hashtags>
        {trending.map(item=>  <S.Hashtag
        onClick={getHashtagByName}
        >#{item.name}</S.Hashtag>)}
           
            </S.Hashtags>
    </S.Container>
    </>)
}
