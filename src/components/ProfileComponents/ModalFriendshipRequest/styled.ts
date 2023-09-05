import styled from "styled-components";

export const ContainerMain = styled.div`
  position: absolute;
  right: -34px;
  top: 23px;
  width: 15rem;
  height: 30rem;
  background: white;
  box-shadow: 3px 2px 3px 0px #0000001f;
`

export const ContainerUserRequest = styled.div`
  display: flex;
  /* background-color: #80808012; */
  cursor: pointer;
  padding: 8px;

  &:hover {
    background-color: #8080802b;
  }
`

export const ContainerImgUser = styled.div`
  width: 145px;
  
`

export const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`

export const ContainerP = styled.div`
  margin-left: 10px;
`

export const P = styled.p`
  font-family: 'Nunito Sans', sans-serif;
  color: #000000;
  font-weight: 500;
  word-wrap: break-word;
`

export const span = styled.span`
  font-weight: 400;
  color: #5f5f5f;
`