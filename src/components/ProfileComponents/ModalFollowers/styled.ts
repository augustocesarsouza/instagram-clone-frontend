import styled from "styled-components";

export const ContainerModal = styled.div`
  position: absolute;
  bottom: 0;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 11;
  font-family: "Poppins";
`

export const ModalContent = styled.div`
  background-color: white;
  width: 24rem;
  height: 24rem;
  border-radius: 10px;
`

export const ContainerFollowers = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #d1d1d1;
`

export const WrapperP = styled.div`
  width: 22rem;
  display: flex;
  justify-content: center;
`

export const PFollowers = styled.p`
  font-weight: 600;
  font-size: 15px;
`

export const WrapperExit = styled.div`
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

export const ContainerInfoFollower = styled.div`
  padding: 6px 15px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 18.1rem;
  max-height: 18.1rem;
  overflow-y: auto;
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
  border-radius: 10px;
  
  background-color: #f3f3f3;
  :hover {
    background-color: #d9d9d9;
  }
`

export const Button = styled.button`
  width: 5rem;
  height: 2rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 13px;
  font-family: "Poppins";
`

export const ContainerSuggestionForYou = styled.div``

export const P = styled.p`
  font-size: 14px;
  font-weight: 600;
`