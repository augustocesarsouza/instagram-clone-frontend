import styled from "styled-components";

interface FormProps {
  $heightadapter: number;
  $textareavalue: number;
}

interface Form__TextareaProps {
  $heightadapter: number;
}

export const ContainerInfoComment = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40%;
  height: 100%; //880px

  @media (max-width: 1448px) {
    height: 100%;
  }

  @media (max-width: 1100px) {
    height: 100%;
  }

  @media (min-width: 1400px) {
    height: 100%;
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