import styled from 'styled-components';

interface ContainerTextareaProps {
  hasvalue: string;
  valueheight: string;
}

export const ContainerParagraphAndSpanMain = styled.div` // 
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  padding: 11px 33px;
`

export const ContainerParagraphAndSpan = styled.div` // 
  border: 1px solid black;
  border-color: #0000003b;
  border-bottom-left-radius: 38px;
  border-bottom-right-radius: 38px;
  border-top-left-radius: 38px;
  border-top-right-radius: 38px;
  
  width: 100%; //276px
  height: 43px;
  align-items: center; 
  display: flex;
  justify-content: space-between;
`

export const WrapperImgComment = styled.div` // 
  width: 30px;
  height: 30px;
  margin-left: 5px;
`

export const ImgUserComment = styled.img` // 
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`

export const ContainerTextarea = styled.div<ContainerTextareaProps>` //
  font-family: 'Poppins';
  /* width: 175px; //145px */
  width: ${props => props.hasvalue === "true" ? "145px" : "175px"};
  display: flex;
  overflow-y: scroll;
  overflow-x: hidden;
  /* height: 33px; */
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${props => props.valueheight + "px"};
`

export const Textarea = styled.textarea` 
  width: 100%;
  height: 33px;
  padding: 7px 5px;
  font-size: 16px;
  border: none;
  outline: none;
  resize: none;
  font-family: Arial, Helvetica, sans-serif;
  /* overflow-y: scroll; */

  &::-webkit-scrollbar{
    width: 0px;
  }

  &::placeholder {
    font-size: 12px;
    padding: 3px 2px;
  }
`

export const WrapperButtonAndIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 5px 5px;
`

export const WrapperButton = styled.div`
`

export const Button = styled.button`
  color: #1aa0f7;
  border: none;
  background: none;
  font-size: 14px;
  font-family: 'Roboto';
  cursor: pointer;
`

