import styled from "styled-components";

interface ContainerMainProps {
  $pathnamecurrent: string;
  $seefollowersorfollowing: string;
}

export const ContainerMain = styled.div<ContainerMainProps>`
  display: flex;
  position: relative;
  width: 100%;

  justify-content: ${props => props.$pathnamecurrent === "message" ? "none" : "center"};

  height: ${props => props.$pathnamecurrent === "profile" && "100vh"};
    overflow-y: ${props => props.$seefollowersorfollowing === "true" ? "hidden" : "hidden"};
`

export const ContainerMain2 = styled.div``