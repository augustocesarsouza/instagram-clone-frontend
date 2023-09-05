import styled from "styled-components";

export const ContainerMain = styled.div`
  position: absolute;
  background-color: white;
  right: -63px;
  top: 23px;
  width: 11rem;
  display: flex;
  flex-direction: column;
  width: 11rem;
  box-shadow: 3px 2px 3px 0px #0000001f;
  background-color: #7f7c7c0d;
  padding: 5px;
`

export const Button = styled.button`
  background: none;
  border: none;
  background-color: #7f7c7c0d;
  cursor: pointer;
  padding: 6px;
  display: flex;
  border-radius: 3px;
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 500;
  font-size: 15px;


  &:hover {
    background-color: #7f7c7c75;
  }
`