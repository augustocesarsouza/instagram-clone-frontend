import styled, { keyframes } from "styled-components";

interface WrapperSvgProps {
  $svg: string;
}

export const ContainerMain = styled.div`
  height: 890px;
  width: 79rem;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  overflow-x: hidden;
  align-items: center;

  @media (min-width: 1000px) {
    
  }
`

export const ContainerSecond = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 772px;
  margin-top: 25px;
`

export const ContainerForSvg = styled.div`
  width: 9%;
  height: 30px;
  position: absolute;
  right: 0;
  top: 4px;
  display: flex;
  justify-content: flex-end;
`;

const enterAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(0);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ContainerMainReelsAndStatusVideo = styled.div`
  display: flex;
`

export const ContainerReelsMain= styled.div`
  position: relative;
  
`

 export const ContainerClickButton = styled.div`
   position: absolute;
   left: 0;
   top: 0;
   width: 446px;
   height: 794px;
   cursor: pointer;
 `;

 export const WrapperSvg = styled.div<WrapperSvgProps>`
   display: flex;
   justify-content: center;
   align-items: center;
   z-index: ${props => props.$svg === "sound" && "20"};
   margin-right: ${props => props.$svg === "sound" && "6px"};
   margin-top: ${props => props.$svg === "sound" && "2px"};
   width: ${props => props.$svg === "sound" && "30px"};
   height: ${props => props.$svg === "sound" && "30px"};
   position: absolute;
   /* cursor: pointer; */

   svg {
     color: white;
   }
`;

export const ContainerStatusVideo = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: #ffffff;
  position: relative;
`