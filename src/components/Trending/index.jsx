import * as S from "./style";
import { useState , useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default function Trending(trending , setTrending){
    

    
    async function getTrending() {
        try {
            const result = await axios.get(`https://back-projeto17-linkr.herokuapp.com/trending`);
            setTrending(result.data);
        } catch (e) {
            alert(
                "An error occured while trying to fetch the trending hashtags, please refresh the page"
            );
            console.log(e);
        }
    }  
  //  getTrending()

    return(<>
    <S.Container>
        <S.Title>
            <S.TrendingTitle>trending</S.TrendingTitle>
            
        </S.Title>
        <S.Hashtags>
              
           
            </S.Hashtags>
    </S.Container>
    </>)
}
