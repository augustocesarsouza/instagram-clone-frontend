import styled from "styled-components";

interface P {
  $paragraph: string;
}

export const ContainerSharePhotos = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35vh;
`

export const WrapperShare = styled.div`
  width: 20rem;
  height: 14rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`

export const WrapperCamera = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.3rem;
  height: 4.3rem;
  padding: 10px;
  border-radius: 100%;
  border: 2px solid #00000094;
  margin-top: 5px;
`

export const WrapperP = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  
`

export const P = styled.p<P>`
  font-family: 'Nunito Sans', sans-serif;
  text-align: center;
  margin-bottom: ${props => props.$paragraph === "p1" && "10px"}; 
  font-weight: ${props => props.$paragraph === "p1" && "bolder"};
  font-size: ${props => props.$paragraph === "p1" ? "26px" : "14px"};
`

export const ButtonShare = styled.button`
  margin-top: 15px;
  color: #2196F3;
  font-weight: 600;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    color: #064271;
  }
`