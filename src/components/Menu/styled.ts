import styled, {keyframes} from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ButtonNavProps {
  $active: string;
}


const pulseAnimation = keyframes`
  0% {
    transform: scale(1.2);
  }
`;

export const Container = styled.div`
  display: flex;
  /* position: relative; */

  width: ${props => props.theme.activeButton === "message" ? "5rem" : "15rem"};
  position: ${props => props.theme.activeButton === "message" ? "fixed" : "relative"};
  height: 100vh;

  @media (max-width: 1000px) {
    width: 7.4rem;
  }

  @media (max-width: 1280px) {
    width: ${props => props.theme.activeButton === "profile" && "13%"}; 
  }

  @media (max-width: 750px) {
    position: absolute;
    left: 0px;
    top: 883px;
    @media(max-height: 875px){
      top: 827px;
    }
  }

  @media (max-width: 838px) {
    position: ${props => props.theme.activeButton === "profile" && "absolute"}; 
    left: ${props => props.theme.activeButton === "profile" && "0px"}; 
    top: ${props => props.theme.activeButton === "profile" && "883px"}; 
    
    @media(max-height: 875px){
      top: ${props => props.theme.activeButton === "profile" && "827px"}; 
    }
  }

  
`

export const ContainerMain = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: flex-start;
  width: 15rem; */
  padding: 16px;
  height: 59rem;
  border-right: 1px solid #c5c5c5;
  position: fixed;
  

  width: ${props => props.theme.activeButton === "message" ? "5rem" : "15rem"};
  align-items: ${props => props.theme.activeButton === "message" ? "center" : "flex-start"};
  

  @media (max-width: 1000px) {
    width: 5rem;
    align-items: center;
  }

  @media (max-width: 1280px) {
    width: ${props => props.theme.activeButton === "profile" && "5rem" };
    align-items: ${props => props.theme.activeButton === "profile" && "center"};
  }

  @media (max-width: 750px) {
    width: 100%;
    height: 3rem;
    align-items: center;
    z-index: 1;
    flex-direction: row;
    background: white;

    border-top: ${props => props.theme.activeButton === "message" && "1px solid #c5c5c5"};
  }

  @media (max-width: 838px) {
    width: ${props => props.theme.activeButton === "profile" && "100%"}; 
    height: ${props => props.theme.activeButton === "profile" && "3rem"}; 
    align-items: ${props => props.theme.activeButton === "profile" && "center"}; 
    z-index: ${props => props.theme.activeButton === "profile" && "1"}; 
    flex-direction: ${props => props.theme.activeButton === "profile" && "row"}; 
    background: ${props => props.theme.activeButton === "profile" && "white"}; 
    border-top: ${props => props.theme.activeButton === "profile" && "1px solid #c5c5c5"}; 
  }
`

export const ContainerInstagramSvg = styled.div`
  /* height: 3rem; */

  width: ${props => props.theme.activeButton === "message" && "78px"};
  height: ${props => props.theme.activeButton === "message" ? "38px" : "3rem"};

  @media (max-width: 1000px) {
    width: 78px;
    height: 38px;
  }

  @media (max-width: 1280px) {
    width: ${props => props.theme.activeButton === "profile" && "78px"};
    height: ${props => props.theme.activeButton === "profile" && "38px" };
  }

  @media (max-width: 750px) {
    display: none;
  }

  @media (max-width: 838px) {
    display: ${props => props.theme.activeButton === "profile" && "none"}; 
    
  }
`

export const SvgImg = styled.img`
  /* width: 70%; */

  width: ${props => props.theme.activeButton === "message" ? "100%" : "70%"};
  height: ${props => props.theme.activeButton === "message" && "100%"};

  @media (max-width: 1000px) {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 1280px) {
    width: ${props => props.theme.activeButton === "profile" && "100%"};
    height: ${props => props.theme.activeButton === "profile" && "100%" };
  }
`

export const ContainerNav = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 2rem;
  gap: 10px;
  width: 100%;
  align-items: center;
  height: 19rem;
  

  @media (max-width: 750px) {
    align-items: center;
    flex-direction: row;
    margin-top: 0;
    height: ${props => props.theme.activeButton === "message" ? "100%" : "2rem"};
  }

  @media (max-width: 838px) {
    align-items: ${props => props.theme.activeButton === "profile" && "center"}; 
    flex-direction: ${props => props.theme.activeButton === "profile" && "row"}; 
    margin-top: ${props => props.theme.activeButton === "profile" && "0"}; 
    height: ${props => props.theme.activeButton === "profile" && "2rem"}; 
  }
`

export const AnimatedSvg = styled(FontAwesomeIcon)`
  transition: transform all ease-in-out;
  width: 1.2rem;
  height: auto;
`

export const ContainerAwesomeButton = styled.div<ButtonNavProps>`
  display: flex;
  align-items: center;
  padding: 6px;
  /* width: 13rem; */
  border-radius: 7px;
  cursor: pointer;
  font-size: ${props => props.$active === 'true' ? '17px' : '16px'};
  font-weight: ${props => props.$active === 'true' ? 'bold': 'normal'};
  
  &:hover{
    background-color: #efefef;

    
  @media (max-width: 750px) {
    background-color: #d9d9d9;
  }

  @media (max-width: 838px) {
    background-color: ${props => props.theme.activeButton === "profile" && "#d9d9d9"};
  }
  }

  &:hover ${AnimatedSvg}{
    animation: ${pulseAnimation} 3s normal;
  }

  width: ${props => props.theme.activeButton === "message" ? "4rem" : "13rem"};
  justify-content: ${props => props.theme.activeButton === "message" && "center" };

  @media (max-width: 1000px) {
    width: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 1280px) { 
    width: ${props => props.theme.activeButton === "profile" && "4rem"};
    justify-content: ${props => props.theme.activeButton === "profile" && "center" };
  }

  @media (max-width: 750px) {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${props => props.theme.activeButton === "img" && "4px"};
  }

  @media (max-width: 838px) {
    display: ${props => props.theme.activeButton === "profile" && "flex"}; 
    align-items: ${props => props.theme.activeButton === "profile" && "center"}; 
    justify-content: ${props => props.theme.activeButton === "profile" && "center"}; 
    padding: ${props => props.theme.activeButton === "profile" && "4px"}; 
    
  }

  @media (min-width: 1001px) {
    padding: 14px;

  }

`

export const WrapperImgOther = styled.div`
  width: 35px;
  height: 35px;
`

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const ButtonNav = styled.p`
  font-family: 'Open Sans', sans-serif;
  margin-left: 10px;

  display: ${props => props.theme.activeButton === "message" && "none" };

  @media (max-width: 1000px) {
    display: none;
    
  }

  @media (max-width: 1280px) {
    display: ${props => props.theme.activeButton === "profile" && "none"};
    
  }
`

export const WrapperImg = styled.div`
  width: 30px;
  height: 30px;
`

export const ImgProfile = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  border: 2.5px solid black; 
  object-fit: cover;
`

export const ImgIcon = styled.img`
  width: 100%;
  height: 100%;
`