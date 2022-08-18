import styled from "styled-components";
import device from "../../utils/devicesSizes";


export const Container=styled.div`
display: ${ props => props.view};
justify-content: center;
align-items: center;
    width:100% ;
    height: 41px;
    background-color: #1877F2;
    border-radius: 16px;
    margin-bottom: 17px;

    h1{
        color: #FFFFFF;
        font-size: 16px;
    }
    img{
        margin-left:8px;
        width: 22px;
        height: 16px;
    }
    @media ${device.desktop} {
        max-width: 611px;
        height: 61px;
       
    }
`