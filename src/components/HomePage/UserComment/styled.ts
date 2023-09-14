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

`

export const ContainerUserComment = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  font-family: "Poppins";
`