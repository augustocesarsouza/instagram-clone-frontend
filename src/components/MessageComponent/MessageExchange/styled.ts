import styled, { css, keyframes } from "styled-components";

interface WrapperPMessageProps {
  $mymessage: string;
}

interface pProps {
  $mymessage: string;
}

export const ContainerMessage = styled.div`
  width: 75%;
  font-family: 'Open Sans', sans-serif;

  @media (max-width: 901px) {
    width: 87%;
  }

  @media (max-width: 750px) {
    width: 86%;
  }
`

export const ContainerMainMessageAndTextarea = styled.div`
  display: flex;
  flex-direction: column;
  height: 50rem;
  max-height: 55rem;
  justify-content: flex-end;

  @media (max-width: 750px) {
    height: 47rem;
  }

  @media (min-height: 931px) {
    height: 54rem;

    @media (max-width: 750px) {
      height: 51rem;
    }
  }
`

export const ContainerMainMessage = styled.div`
  display: flex;
  flex-direction: column-reverse;
  overflow-x: auto;
  white-space: nowrap;
  &::-webkit-scrollbar{
    background-color: #f1f1f1;
    width: 5px;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb{
    background-color: #afafaf;
    border-radius: 5px;
  }
`

export const WrapperMessage = styled.div`
  display: flex;
  margin: 2px 3px;
  padding: 2px;
`

export const WrapperAllParagraph = styled.div`
  /* width: 29rem; */
  width: 100%;

  padding: 10px 0px;
`

export const WrapperTimeMessage = styled.div`
  display: flex;
  justify-content: center;
`

export const PTime = styled.p`
  font-size: 11px;
  font-weight: 400;
  font-family: 'Poppins';
  color: #65676b;
`


export const WrapperPMessage = styled.div<WrapperPMessageProps>`
  display: flex;
  justify-content: ${props => props.$mymessage === "true" ? 'flex-end' : 'flex-start'};
`

interface ContainerAdjustPositionMessageProps {
  $mymessage: string;
}

export const ContainerAdjustPositionMessage = styled.div<ContainerAdjustPositionMessageProps>`
  display: flex;
  justify-content: ${props => props.$mymessage === "true" ? "flex-end" : "flex-start"};
`

export const WrapperImg = styled.div`
  width: 156px;
  height: 257px;
  cursor: pointer;
  position: relative;
`

export const WrapperMainCreateComment = styled.div`
  display: flex;
  align-items: flex-end;
`

export const WrapperImgUserCreateComment = styled.div`
  width: 28px;
  height: 28px;
  margin-right: 10px;
`

export const ImgUserCreateComment = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`

export const Svg = styled.div`
  position: absolute;
  left: 9px;
  bottom: 5px;
`

export const ContainerInfoUserFrame = styled.div`
 position: absolute;
 top: 8px;
 left: 7px;
 display: flex;
 align-items: center;
 font-family: 'Poppins';

`

export const WrapperImgUserFrame = styled.div`
  width: 30px;
  height: 30px;
`

export const ImgUserFrame = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`

export const ContainerNameUser = styled.div`
  margin-left: 5px;
`

export const PName = styled.p`
  font-size: 13px;
  font-weight: 600;
  color: #FFFFFF;
`

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  
`

export const P = styled.p<pProps>`
  color: ${props => props.$mymessage === "true" ? 'white' : 'black'};
  background-color: ${props => props.$mymessage === "true" ? '#2196f3' : '#f5f5f5'};
  border-radius: 20px;
  padding: 7px;
  font-size: 13px;
`

export const ContainerMainText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const WrapperTextarea = styled.div`
  display: flex;
  justify-content: space-between; //center antes com textarea
  align-items: center;
  height: 2.7rem;
  width: 96%;
  margin: 10px 0px;
  border: 1px solid #c5c5c5;
  border-radius: 20px;
`

export const Textarea = styled.textarea`
  width: 100%;
  height: 15px;
  resize: none;
  border: none;
  padding: 0px 30px;
  &:focus {
    outline: none;
  }
`

export const WrapperButton = styled.div`
  padding-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ButtonSend = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  color: #2196F3;
  font-weight: bold;

  &:hover{
    color: #364079;
  }
`

export const WrapperSvgAudio = styled.div`
 cursor: pointer;
`

interface AdjustPositionAudioProps {
  $mymessage: string;
}

export const AdjustPositionAudio = styled.div<AdjustPositionAudioProps>`
  display: flex;
  justify-content: ${props => props.$mymessage === "true" ? 'flex-end' : 'flex-start'};

`

interface WrapperAudioProps {
  $mymessage: string;
}

export const WrapperAudio = styled.div<WrapperAudioProps>`
  /* background: #0084ff; */
  background: ${props => props.$mymessage === "true" ? "#0084ff" : "#80808087"};
  border-radius: 20px 18px 18px 20px;
  width: 15rem;
  height: 2.5rem;
  max-height: 5rem;
  overflow: hidden;
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 10;
`

interface WrapperProgressAudioProps {
  $progressaudio: number | null;
  $mymessage: string;
}

export const WrapperProgressAudio = styled.div.attrs<WrapperProgressAudioProps>(props => ({
  style: {
    transform: `translateX(${props.$progressaudio && props.$progressaudio <= 0 ? props.$progressaudio : 0}%)`,
  }
}))`
  width: 100%;
  height: 100%;
  background: ${props => props.$mymessage && props.$mymessage === "true" ? "#339dff" : "#80808059"};
  position: absolute;
  left: 0;
  top: 0;
  opacity: .8;
  transition: all 0.6s;
`

interface WrapperProgressAudioRecordTrueProps {
  $progressaudio: number;
  $changetransitionrecord: string;
  $timeaudiolessthan30: string;
}

export const WrapperProgressAudioRecordTrue = styled.div.attrs<WrapperProgressAudioRecordTrueProps>(props => ({
  style: {
    transform: `translateX(${props.$progressaudio <= 0 ? props.$progressaudio : 0}%)`,
    
  }
}))`
  width: 100%;
  height: 100%;
  background: #339dff; 
  position: absolute;
  left: 0;
  top: 0;
  opacity: .8;
  transition: ${props => props.$timeaudiolessthan30 === "true" ? "transform 0.3s linear" : "transform 0.6s linear"};
`

export const Audio = styled.audio`
`

export const WrapperSvgPlay = styled.div`
  background: #cccccc;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 5px;
  z-index: 10;
`

export const ContainerAudioStarted = styled.div`
  width: 80%;
  height: 85%;
  background-color: #0084ff;
  border-radius: 20px 18px 18px 20px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const ContainerSvgX = styled.div`
  /* height: 100%; */
  display: flex;
  align-items: center;
  margin-left: 15px;
  z-index: 10;
  cursor: pointer;
  svg  {
    transform: rotate(45deg);
  }
`

export const Source = styled.source`` 

export const ContainerSeconds = styled.div`
  margin: 5px;
  background: #cccccc;
  border-radius: 10px;
  padding: 2px 8px;
  font-family: "Poppins";
  z-index: 10;
  user-select: none;
 
`

export const PSeconds = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: #0080ff;
`