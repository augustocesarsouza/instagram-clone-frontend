import styled from 'styled-components';

export const WrapperMain = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 13%;
  border-top: 1px solid #e9e9e9;
  padding: 9px;
  background: white;

  

  /* @media (min-width: 1400px) { - antes
    height: 58px;
  } */

  @media (min-width: 1400px) {
    height: auto;
    max-height: 120px;
  }
`

interface FormProps {
  hasvalue: string;
  valueheight: string;
}


export const Form = styled.div`
  width: 19rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 100px;
  height: auto;
`

interface Form__TextareaProps {
  heighttext: number;
}

export const Form__Textarea = styled.textarea<Form__TextareaProps>`
  width: 100%;
  height: auto;
  max-height: 70px;
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