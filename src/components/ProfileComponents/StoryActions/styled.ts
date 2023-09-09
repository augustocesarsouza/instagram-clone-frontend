import styled from "styled-components";
import { StoryProps } from "../InfoProfile/InfoProfile";

interface WrapperArrowProps {
  $arrowdirection: string;
}

export const ContainerSeeStoriesBackground = styled.div`
  width: 100%;
  height: 100%;
  background-color: #1a1a1a;
  position: absolute;
  z-index: 50;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
`

export const ContainerSubStoriesSee = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`

export const SvgIconExit = styled.div`
  position: absolute;
  right : 40px;
  top: 0px;
  width: 35px;
  height: 35px;
  
  svg {
    color: white;
    font-size: 25px;
    position: absolute;
    right: 1px;
    cursor: pointer;
  }
`

export const ContainerInstagram = styled.div`
  width: 119px;
  height: 42px;
  position: absolute;
  left: 18px;
  top: 0px;
`

export const ImgInsta = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  color: white;
`

export const WrapperArrow = styled.div<WrapperArrowProps>`
  width: 20px;
  height: 20px;
  position: absolute;
  right: ${props => props.$arrowdirection === "right" ? "520px" : "759px"};

  svg {
    font-size: 30px;
    color: white;
    cursor: pointer;
    
  }
`