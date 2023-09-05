import styled from "styled-components";

interface ContainerInfoUserProps{
  $fetchuserlogged: string;
}

interface WrapperButtonFollowProps {
  $button: string;
}

interface ButtonFollowProps{
  $button: string;
}

interface ContainerAddProps {
  $container: string;
}

export const ContainerInfoUser = styled.div<ContainerInfoUserProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  /* width: ${props => props.$fetchuserlogged == 'true' ? "100%" : "26rem"}; */
  width: 27rem;
`

export const P = styled.p`
  font-family: 'Nunito Sans', sans-serif;
`

export const WrapperButtonFollow = styled.div<WrapperButtonFollowProps>``

export const ButtonFollow = styled.button<ButtonFollowProps>`
  border: none;
  color: ${props => props.$button == "follow" ? "#fffafd" : "black"};
  background-color: ${props => props.$button == "follow" ? "#22a8ff" : "#efefef"};
  padding: 7px;
  width: 4.8rem;
  border-radius: 6px;
  font-weight: 500;
  font-family: 'Nunito Sans', sans-serif;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.$button == "follow" ? "#2196F3" : "#dfdfdf"};
  }
`

export const ContainerButton = styled.div`
`

export const Button = styled.button`
  border: none;
  background-color: #efefef;
  padding: 7px;
  width: 6.3rem;
  border-radius: 6px;
  font-weight: 500;
  font-family: 'Nunito Sans', sans-serif;
  cursor: pointer;
  &:hover {
    background-color: #dfdfdf;
  }
`

export const ContainerSvgSettings = styled.div`
`

export const SvgSettings = styled.svg`
cursor: pointer;
`

export const ContainerAdd = styled.div<ContainerAddProps>`
  display: flex;
  position: relative;
  justify-content: space-around;
  align-items: center;
  background-color: #1b74e4;
  padding: 8px;
  border-radius: 6px;
  width: ${props => props.$container === "friend-request" ? "12.7rem": "7rem" };
  width: ${props => props.$container === "add-friend" && "8rem" };
  width: ${props => props.$container === "pending" && "9rem" };
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #1665c9;
  }

  svg{
    cursor: pointer;
  }
`

export const ButtonAdd = styled.button`
  background: none;
  border: none;
  font-weight: 500;
  font-family: 'Nunito Sans',sans-serif;
  color: white;
  cursor: pointer;
  width: 150px;
`

export const ContainerCounterFriend = styled.div`
  position: absolute;
  right: -3px;
  bottom: -3px;
  background: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const PCountFriend = styled.p`
  color: #ff1100;
  font-size: 13px;
  font-weight: bolder;
  font-family: 'Nunito Sans',sans-serif;
`

export const ContainerFriendship = styled.div`
  position: relative;
`