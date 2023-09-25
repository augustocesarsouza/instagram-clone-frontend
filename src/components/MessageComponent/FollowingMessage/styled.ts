import styled from "styled-components";

interface P {
  $paragraph: string;
}

interface ContainerFollowingUserProps {
  $active: string;
}

export const ContainerFollowing = styled.div`
  width: 398px;
  border-right: 1px solid #c5c5c5;
  height: 100vh;

  @media (max-width: 901px) {
    width: 108px;
  }

  @media (max-width: 750px) {
    width: 108px;
  }
`

export const ContainerUserMessage = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 19px;
  width: 360px;

  @media (max-width: 901px) {
    width: 56px;
    justify-content: center;
    align-items: center;
    margin: 27px 30px;
  }

  svg {
    height: 1.5rem;
  }
`

export const P = styled.p<P>`
  font-family: 'Poppins';
  font-weight: bolder;
  font-size: ${props => props.$paragraph === "1" ? "22px" : "15px"};
  color: ${props => props.$paragraph === "3" && "#919191"};

  font-size: ${props => props.$paragraph === "4" && "15px" };
  font-weight: ${props => props.$paragraph === "4" && "400"};

  font-size: ${props => props.$paragraph === "6" && "13px"};
  font-weight: ${props => props.$paragraph === "6" && "600"};

  font-size: ${props => props.$paragraph === "5" && "11px" };
  font-weight: ${props => props.$paragraph === "5" && "100"};

  @media (max-width: 901px) {
    display: ${props => props.$paragraph === "1" && "none"};
  }

`

export const ContainerMessageSolicitation = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 20px;

  @media (max-width: 901px) {
    display: none;
  }
`

export const ContainerFollowingUser = styled.div<ContainerFollowingUserProps>`
  display: flex;
  margin-top: 10px;
  cursor: pointer;
  padding: 10px 5px;
  background-color:${props => props.$active === "true" && "#efefef"};

  @media (max-width: 901px) {
    width: 107px;
  }

`

export const WrapperImagemUser = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  margin: 0 20px;
  position: relative;
`

export const ImagemUser = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`

export const WrapperNameUser = styled.div`

  @media (max-width: 901px) {
    display: none;
  }
`

export const ContainerIsOnline = styled.div`
  background-color: #1cd14f;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  border: 2px solid white;
  position: absolute;
  top: 39px;
  left: 40px;
`

export const ContainerIsOffline = styled.div`
  
`