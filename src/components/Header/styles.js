import styled from "styled-components";
import device from "../../utils/devicesSizes.js";

export const Header = styled.header`
  width: 100%;
  height: 72px;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-header);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 0 17px 0 17px;
`;

export const Logo = styled.h1`
  font-family: var(--thirdy-font);
  font-weight: 700;
  font-size: 49px;
  line-height: 54px;
  letter-spacing: 0.05em;
  color: var(--secondary-color);
  word-break: keep-all;
  cursor: pointer;
  @media ${device.desktop} {
    font-size: 49px;
    line-height: 54px;
    margin-right: 10px;
  }
`;

export const UserContainer = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const UserOptionsContainer = styled.div`
  display: flex;
  align-items: center;
  color: white;
  font-size: 18px;
  options-icon {
    cursor: pointer;
  }

  @media ${device.desktop} {
    font-size: 25px;
    margin-left: 10px;
  }
`;

export const UserIcon = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 26.5px;
  object-fit: cover;
  margin-left: 17px;
  @media ${device.desktop} {
    width: 53px;
    height: 53px;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const DropDownContainer = styled.div`
  font-family: "Lato";
  padding: 12px;
  font-size: 17px;
  font-weight: 700;
  color: white;
  background-color: #171717;
  border-radius: 0px 0px 0px 20px;
  position: absolute;
  width: 110%;
  top: 60px;
  right: -16px;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin-top:8px; 
    cursor: pointer;
  }
`;
