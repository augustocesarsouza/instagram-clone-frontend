import styled from "styled-components";

export const ContainerInfoComment = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40%;

  height: 100%; 
  /* height: calc(0.48 * 100vw); */

  /* @media (max-width: 800px) {
    height: 75%;
  } */
  /*
  @media (max-width: 840px) {
    height: 96%;
  } */
`

export const ContainerGeneral = styled.div`
  height: 100%;
  background-color: white;
  height: calc(0.3 * 100vw);
  

  /* @media (max-width: 1448px) {
     //height: 79%;
    height: 65%;
  } */

  /* @media (max-width: 800px) {
    height: 91%;
  } */
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