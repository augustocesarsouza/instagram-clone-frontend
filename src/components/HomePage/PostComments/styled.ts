import styled from "styled-components";

export const ContainerInfoComment = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40%;

  height: 90%;

  @media (max-width: 1448px) {
    height: 100%;
  }

  @media (max-width: 840px) {
    height: 96%;
  }
`

export const ContainerGeneral = styled.div`
  height: 100%;
  background-color: white;

  @media (max-width: 1448px) {
    height: 79%;
  }

  @media (max-width: 800px) {
    height: 72%;
  }
`