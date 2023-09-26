import styled from 'styled-components';

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

interface WrapperProgressAudioRecordTrueProps {
  $progressaudio: number;
  $playaudio: string;
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

interface WrapperProgressAudioProps {
  $progressaudio: number;
  $playaudio: string;
  $changetransitionrecord: string;
  $timeaudiolessthan30: string;
}

export const WrapperProgressAudio = styled.div.attrs<WrapperProgressAudioProps>(props => ({
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
  transition: ${props => props.$changetransitionrecord === "true" ? "none" : "transform 0.3s linear"};
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