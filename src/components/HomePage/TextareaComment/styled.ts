import styled from 'styled-components';

export const ContainerMain = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
`

export const WrapperMain = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: auto;
  min-height: 40px;
  max-height: 80px;
  border-top: 1px solid #e9e9e9;
  padding: 9px;
  background: white;

  

  /* @media (min-width: 1400px) { - antes
    height: 58px;
  } */

  /* @media (min-width: 1400px) {
    height: auto;
    max-height: 120px;
  } */
`

export const Form = styled.div`
  width: 75%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  overflow-x: hidden;
  height: auto;
  max-height: 70px;
  min-height: 19px;
`

interface Form__TextareaProps {
  $heightText: number;
  $erasingtextarea: string;
}

export const Form__Textarea = styled.textarea<Form__TextareaProps>`
  width: 100%;
  /* height: ${props => props.$heightText}px !important; */
  height: ${props => props.$erasingtextarea === "true" ? "auto" : `${props.$heightText}px !important`};
  font-size: 16px;
  overflow-y: hidden;
  overflow-x: hidden;
  border: none;
  outline: none;
  resize: none;
  font-family: Arial, Helvetica, sans-serif;

  &::-webkit-scrollbar{
    width: 0px;
  }

  &::placeholder {
    font-size: 12px;
    padding: 3px 2px;
  }

  @media (max-width: 800px) {
    &::placeholder {
    font-size: 10px;
    
  }
  }
`

export const Wrapper = styled.div`

`

export const Wrapper__Button = styled.button`
  border: none;
  background: none;
  color: #03A9F4;

  cursor: pointer;

  &:hover {
    color: #2196f3;
  }

`

export const ContainerInfoPost = styled.div`
  /* width: 6.5rem; */
  display: flex;
  flex-direction: column;
  background: white;
`

export const ContainerSvg = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
  margin-bottom: 10px;
  margin-left: 10px;
`

export const ContainerCountLikes = styled.div`
  display: flex;
`

export const PLikes = styled.p`
  display: block;
  word-wrap: break-word;
  margin-left: 11px;
`