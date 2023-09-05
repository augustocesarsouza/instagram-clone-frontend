import styled from "styled-components";

export const ContainerCommentPost = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100%;

  &::-webkit-scrollbar {
    width: 2px;
  }

  /* @media (min-width: 1400px) {
    height: 690px;

    @media (min-height: 875px) {
      height: 649px;
    }
  }

  @media (min-width: 1300px) and (max-width: 1399px){ 
    height: 529px;

    @media (min-height: 875px) {
      height: 498px;
    }
  }

  
  @media (min-width: 1201px) and (max-width: 1299px){ 
    height: 421px;

    @media (min-height: 875px) {
      height: 385px;
    }
  }

  @media (min-width: 840px) and (max-width: 1200px){ 
    height: 341px;

    @media (min-height: 875px) {
      height: 309px;
    }
  }

  @media (min-width: 736px) and (max-width: 837px){ 
    height: 309px;
  }

  @media (min-width: 600px) and (max-width: 734px){ 
    height: 318px;
  } */
`

export const ContainerUserComment = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`