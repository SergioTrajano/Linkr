
import styled from "styled-components";
import device from "../../utils/devicesSizes.js";

export const Main = styled.main`
    width: 100%;

    z-index: -2;
    position: absolute;
    height: calc(100vh - 72px);
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    margin-top: calc(72px + 74px);
    @media ${device.desktop} {
        margin-top: 72px;
    }
`;

export const UserData = styled.div`
    width: 611px;
    max-width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: var(--secondary-font);
    padding: 53px 20px 41px 20px;

    h1 {
        font-weight: 700;
        font-size: 33px;
        line-height: 49px;
        color: var(--secondary-color);
        
    }

    button {
        width: 134px;
        height: 37px;
        border-radius: 5px;
        border: none;
        font-size: 18px;
        line-height: 21px;
        font-family: var(--primary-font);
        padding: 10px 20px;
        font-weight:  bold;

        &:disabled {
            opacity: 0.8;
        }
    }
    
    @media ${device.desktop} {
        h1 {
            font-size: 43px;
            line-height: 64px;
        }
        
    }

    @media ${device.sidebar} {
        width: 970px;
    }
`;

export const ContentContainer = styled.section`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
`;

export const PostsContainer = styled.div`
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    a {
        text-decoration: none;
        color: var(--secondary-color)
    }

    > span {
        margin-Top: 100px;
        color: #FFFFFF;
        width: 611px;
        max-width: 100vw;
        font-size: 50px;
    }

    @media ${device.sidebar} {
        margin-right: 25px;
    }
`;

export const SidebarContainer = styled.div`
    display: none;
    @media ${device.sidebar} {
        width: auto;
        height: 100%;
        display: flex;
    }
`;

export const UserImage = styled.div`
    width: 40px;
    height: 40px;
    margin: 0 18px;
    border-radius: 26.5px;
    background-image: url(${({ src }) => src});
    background-size: cover;
    background-position: center;
    @media ${device.desktop} {
        width: 50px;
        height: 50px;
    }
`;

export const UserPublishContainer = styled.div`
    z-index: 1;
    @media (max-width: 611px) {
        width: 100%;
    }
    margin-bottom: 16px;
    @media ${device.desktop} {
    }
`;

export const TimelineContainer = styled.span`
    margin-bottom: 19px;
    font-family: var(--secondary-font);
    font-weight: 700;
    font-size: 33px;
    margin-left: 17px;
    color: #ffffff;
    @media ${device.desktop} {
        display: none;
    }
`;