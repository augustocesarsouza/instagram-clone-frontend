import styled from "styled-components";
import { StoryProps } from "../InfoProfile/InfoProfile";

interface WrapperArrowProps {
  $arrowdirection: string;
}

// interface LineBlackProps {
//   countpx: number;
//   idphoto: number;
//   indexbarwhite: number;
//   completedindexes: number[] | null;
//   story: StoryProps[];
//   currentphotoindex: number;
// }

export const SvgIconExit = styled.div`
  position: absolute;
  left: 1603px;
  top: 15px;
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

export const ContainerInstagram = styled.div`
  width: 119px;
  height: 42px;
  position: absolute;
  left: 1px;
  top: 1px;
`

export const ImgInsta = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  color: white;
`

export const WrapperArrow = styled.div<WrapperArrowProps>`
  svg {
    position: absolute;
    font-size: 30px;
    color: white;
    right: ${props => props.$arrowdirection === "right" ? "520px" : "759px"};

    cursor: pointer;
    
  }
`