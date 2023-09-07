import styled from 'styled-components';


export const WrapperExit = styled.div`
  position: absolute;
  top: 6px;
  right: 12px;

  svg {
    cursor: pointer;
  }
`

export const ContainerInputSearch = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
`

export const Input = styled.input`
  padding: 7px 10px;
  width: 100%;
  border: none;
  border-radius: 7px;
  background-color: #efefef;

  &:focus {
    outline: none;
  }
`

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

export const ContainerSuggestionForYou = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const P = styled.p`
  font-size: 14px;
  font-weight: 600;
`