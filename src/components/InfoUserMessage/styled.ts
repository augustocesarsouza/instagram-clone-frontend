import styled from "styled-components";

interface P {
  paragraph: string;
}

export const ContainerInfoUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #c5c5c5;
`

export const WrapperUserMessage = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`

export const WrapperImageUser = styled.div`
  width: 50px;
  height: 50px;
  position: relative;
`

export const ImgUser = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`

export const WrapperNameUser = styled.div`
  margin-left: 10px;
`

export const PUser = styled.p<P>`
  font-family: 'Poppins';
  font-weight: ${props => props.paragraph === 'p1' ? "600" : "200"};
  font-size: ${props => props.paragraph === 'p1' ? "16px" : "11px"};
  font-size: ${props => props.paragraph === 'typing' && "11px"};
  
`

export const ContainerIsOnline = styled.div`
  background-color: #1cd14f;
  border-radius: 50%;
  width: 13px;
  height: 13px;
  border: 2px solid white;
  position: absolute;
  top: 36px;
  left: 36px;
`

export const ContainerIsOffline = styled.div`
`

export const WrapperIcons = styled.div`
  display: flex;
  width: 7rem;
  gap: 13px;

  svg {
    cursor: pointer;
  }
`