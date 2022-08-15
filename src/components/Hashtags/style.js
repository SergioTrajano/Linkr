import styled from "styled-components";
import device from "../../utils/devicesSizes";

export const Main = styled.main`
    width: 100%;
    z-index: -2;
    position: absolute;
    height: calc(100vh - 72px);
    display: flex;
    flex-direction: column;
    overflow: auto;
    margin-top: calc(72px + 74px);
    @media ${device.desktop} {
        margin-top: 72px;
    }
`;

export const UserData = styled.h1`
    width: 100%;
    display: flex;
    font-family: var(--secondary-font);
    font-weight: 700;
    font-size: 33px;
    line-height: 49px;
    color: var(--secondary-color);
    margin: 19px 17px 19px;
    display: none;
    @media ${device.desktop} {
        font-size: 43px;
        line-height: 64px;
        margin: 53px 0 41px;
        display: flex;
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
        margin-top: 158px;
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

export const Post = styled.div`
width: 100vw;
height: 232px;
background-color: #171717;
border-radius: 16px;
margin-bottom: 16px;

@media ${device.desktop}{
    width:611px;
    height: 276px;

  }

`
export const PostLinkPreviewContainer = styled.a`
    width: 100%;
    height: 115px;
    display: flex;
    border: 1px solid #4d4d4d;
    border-radius: 11px;
    cursor: pointer;
    @media ${device.desktop} {
        width: 503px;
        height: 155px;
    }
`;

export const PostLinkContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 7px 11px;
    font-weight: 400;
    @media ${device.desktop} {
        padding: 24px 20px;
    }
`;

export const PostLinkTitle = styled.h1`
    width: 100%;
    font-family: var(--primary-font);
    font-size: 11px;
    line-height: 13px;
    color: #cecece;
    margin-bottom: 5px;
    @media ${device.desktop} {
        font-size: 16px;
        line-height: 19px;
    }
`;

export const PostLinkDescription = styled.p`
    font-family: var(--primary-font);
    font-size: 9px;
    line-height: 11px;
    color: #9b9595;
    margin-bottom: 5px;
    @media ${device.desktop} {
        font-size: 11px;
        line-height: 13px;
    }
`;

export const PostLinkUrl = styled.p`
    font-family: var(--primary-font);
    font-size: 9px;
    line-height: 11px;
    color: #cecece;
    :hover {
        text-decoration: underline;
    }
    @media ${device.desktop} {
        font-size: 11px;
        line-height: 13px;
    }
`;

export const PostLinkImage = styled.img`
    width: 95px;
    height: 115px;
    border-radius: 0px 12px 13px 0px;
    object-fit: cover;
    @media ${device.desktop} {
        width: 155px;
        height: 155px;
    }
`;