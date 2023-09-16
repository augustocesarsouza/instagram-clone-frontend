import styled from "styled-components";
import { StoryProps } from "../InfoProfile/InfoProfile";

interface LineBlackProps {
  $imgorvideo: number;
  $progress: number;
  $countpx: number;
  $idphoto: number;
  $completedindexes: number[] | null;
  $story: StoryProps[];
  $currentphotoindex: number;
  $widthdivprogressbar: number | null;
}

interface ContainerTextValueProps {
  $fontChosen: string | undefined;
  $colorchosenbackground: string | undefined;
  $widthtext: number | undefined;
  $eixoy: number | undefined;
  $eixox: number | undefined;
}

export const ContainerTextValue = styled.div<ContainerTextValueProps>`
  top: ${props => props.$eixoy}px;
  left: ${props => props.$eixox}px;
  position: absolute;
  color: black;
  font-family: ${props => props.$fontChosen};
  background: ${props => props.$colorchosenbackground};
  width: ${props => props.$widthtext + "px"};
  height: 23px;
  font-size: 16px;
  border-radius: 4px;
  padding: 2px 5px;
  z-index: 100;
  
  user-select: none; 
`

export const Pvalue = styled.p``

export const ContainerSee = styled.div`
  width: 542px;
  height: 871px;  //835px
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  @media (max-width: 1029px) {
    height: 814px; // 854px
  }
`

export const Line = styled.div`
  position: absolute;
  top: 10px;
  left: 0px;
  width: 100%;
  
  /* background-color: black; */
  gap: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const ContainerProgressBar = styled.div`
  width: 95%;
  display: flex;
  background: none;
  gap: 10px;
`

export const ContainerBackgroundBlack = styled.div`
  background: #858481;
  width: 100%;
  height: 3px;
  position: relative;
  border-radius: 2px;
`

export const LineBlack = styled.div.attrs<LineBlackProps>(props => ({
  style: {
        width: props.$imgorvideo === 1 ? props.$completedindexes?.includes((props.$idphoto)) 
      ? `${props.$widthdivprogressbar}px`
      : props.$idphoto === (props.$story[props.$currentphotoindex]?.id ?? null) 
      ? `${props.$countpx}px`
      : undefined : props.$completedindexes?.includes((props.$idphoto)) 
        ? `100%`
        : props.$idphoto === (props.$story[props.$currentphotoindex]?.id ?? null) 
        ? `${props.$progress}%`
        : undefined,
  },
}))`
  height: 3px;
  background: #ffffff;
  position: absolute;
  border-radius: 2px;
  transition: width 0.2s linear;
`;

export const WrapperMainStatusInfoUser = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0px 20px;
`

export const WrapperMainInfoUser = styled.div`
  display: flex;
  align-items: center;
  width: 140px;
`

export const WrapperImagem = styled.div`
  width: 35px;
  height: 35px;
`

export const WrapperImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`

export const WrapperInfoUser = styled.div`
  margin-left: 5px;
  margin-bottom: 6px;
`

export const P = styled.p`
  color: white;
  font-family: 'Nunito Sans',sans-serif;
  font-size: 15px;
`

export const WrapperSvg = styled.div`
  display: flex;
  width: 79px;
  height: 27px;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  svg {
    color: white;
    cursor: pointer; 
  }
`

export const ContainerTextArea = styled.div`
  position: absolute;
  left: 1px;
  bottom: 1px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ContainerOnlyTextarea = styled.div`
  width: 300px;
  height: 45px;
  border-radius: 15%;
  padding: 3px 2px;
`

export const Textarea = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  resize: none;
  background: none;
  border-radius: 25px;
  padding: 10px 14px;
  border: 2px solid #6f6f6f;
  color: #000000;

  &::placeholder{
    color: #000000;
  }

  &:focus{
    outline: none;
  }
`;

export const ContainerImg = styled.div`
  height: 100%;
  background: black;
`

export const ImgStory = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const Video = styled.video`
  width: 100%;
  height: 100%;
`

export const Source = styled.source``

interface WrapperArrowProps {
  $arrowdirection: string;
}

export const WrapperArrow = styled.div<WrapperArrowProps>`
  width: 30px;
  height: 30px;
  position: absolute;
  right: ${props => props.$arrowdirection === "right" ? "-50px" : "759px"};
  top: 349px;

  svg {
    font-size: 30px;
    color: white;
    cursor: pointer;
    
  }
`