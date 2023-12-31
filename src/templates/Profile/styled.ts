import styled from 'styled-components';

export const ContainerMain = styled.div`
  width: 90%;

  @media (max-width: 750px) {
    width: 100%;
    height: 100vh;
  }

  @media (max-width: 838px) {
    width: 100%;
    overflow-y: auto;
  }
  overflow-y: auto;
`

export const ContainerAdjust = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ContainerSubMain = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 60rem;
  height: 13rem;
  padding: 10px 20px 0;

  @media (max-width: 750px) {
    justify-content: space-between;
    padding: 20px 0;
  }

  @media (max-width: 575px) {
    width: 100vw;
    justify-content: space-evenly;
  }
`

