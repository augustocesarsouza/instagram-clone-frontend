import styled from "styled-components";

export const ContainerMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`
export const ContainerImgRegister = styled.div`
  padding: 20px 50px;
    border: 1px solid #d5d5d5;
    height: 27rem;
    width: 18rem;
    margin-top: 10px;
    border-radius: 4px;
    flex-direction: column;
    display: flex;
`

export const ContainerImg = styled.div`
  width: 12rem;
  height: 7rem;
  display: flex;
  flex-direction: column;
`

export const Img = styled.img`
  width: 100%;
  height: 100%;
`

export const P = styled.p`
  font-family: 'Gill Sans','Gill Sans MT',Calibri,'Trebuchet MS',sans-serif;
  font-weight: 500;
  color: #a7a1a1;
`

export const DivSpan = styled.div`
  display: flex;
  gap: 35px;
  margin-top: 30px;
`

export const Span = styled.span`
  border: 1px solid #ebebeb;
  width: 5rem;
  border-width: 1px;
`

export const ContainerInfoRegister = styled.div`
  display: flex;
  flex-direction: column;
`

export const Input = styled.input`
  margin-top: 10px;
  padding: 7px;
  border: 1px solid #bfbfbf;
  border-radius: 3px;

  &:focus {
    outline: none;
    border-color: #9b9b9b;
  }
`

export const DivInputEmail = styled.div `
  position: relative;

  svg {
    color: red;
    position: absolute;
    right: 7px;
    top: 16px;
  }
`

export const DivButtonRegister = styled.div`
  width: auto;
  margin-top: 30px;
`

export const Button = styled.button`
  width: 11.6rem;
  font-family: 'Gill Sans MT', 'Trebuchet MS', sans-serif;
  font-weight: bolder;
  font-size: 16px;
  padding: 7px;
  background-color: #03A9F4;
  border: none;
  color: white;
  border-radius: 6px;

  cursor: ${props => props.disabled ? '' : 'pointer'};
  background-color: ${props => props.disabled ? '#03a9f475' : ''};
`

export const ContainerBackLogin = styled.div`
  margin-top: 10px;
  border: 1px solid #dddddd;
  padding: 25px 46px;
  border-radius: 4px;
  width: 18rem;
`

export const PLogin = styled.p``

export const SpanLogin = styled.span`
  font-family: 'Gill Sans', 'Gill Sans MT', 'Trebuchet MS', sans-serif;
  cursor: pointer;
  color: #67b7e7;
`