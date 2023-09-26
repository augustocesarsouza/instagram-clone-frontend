import styled from 'styled-components';

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

export const Source = styled.source`` 