import styled from 'styled-components';

export const ContainerFollower = styled.div`
  display: flex;
  justify-content: space-between;
`

export const WrapperOnlyImgAndName = styled.div`
  display: flex;
`

export const WrapperImgFollower = styled.div`
  width: 3rem;
  height: 3rem;
`

export const ImgFollower = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`

export const WrapperInfoFollower = styled.div`
  margin-left: 10px;
`

export const NamePFollower = styled.p`
  font-weight: 500;
  font-size: 14px;
`

export const WrapperButton = styled.div`
  width: 5rem;
  height: 2rem;
  border: none;
`

interface Button {
  $follow: string;
}

export const Button = styled.button<Button>`
  width: 5rem;
  height: 2rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 500;
  font-size: 14px;
  background-color: ${props => props.$follow === "button-follow" ? '#68bcff' : '#f3f3f3'};
  color: ${props => props.$follow === "button-follow" && "white" };
  font-size: ${props => props.$follow === "button-follow" && "15px" };
  &:hover {
    background-color: #d9d9d9;
    background-color: ${props => props.$follow === "button-follow" ? '#5fa6df' : '#d9d9d9'};
  }
`

interface ButtonProps {
  $follow: string;
}

export const ButtonFo = styled.button<ButtonProps>`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 13px;
  font-family: "Poppins";
  background-color: ${props => props.$follow === 'Seguir' ? "#0095f6" : "#f3f3f3"};
  color: ${props => props.$follow === "Seguir" && "white"};
  &:hover {
    background-color: ${props => props.$follow === 'Seguir' ? "#1877f2" : "#d9d9d9"};
  }
`