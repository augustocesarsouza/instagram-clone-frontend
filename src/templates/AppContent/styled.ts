import styled from "styled-components";

interface ContainerMainProps {
  $pathnamecurrent: string;
  $seefollowersorfollowing: string;
}

export const ContainerMain = styled.div<ContainerMainProps>`
  display: flex;
  position: relative;
  width: 100%;


  @media (max-width: 750px) {
    align-items: center;
    justify-content: center;
    /* overflow: auto; */
  }

  @media (max-width: 838px) {
    justify-content: center;
  }

  height: ${props => props.$pathnamecurrent === "profile" && "100vh"};
    overflow-y: ${props => props.$seefollowersorfollowing === "true" ? "hidden" : "hidden"};
`

export const ContainerMain2 = styled.div``