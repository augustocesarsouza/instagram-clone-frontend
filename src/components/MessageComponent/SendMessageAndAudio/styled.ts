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

export const Source = styled.source`` 