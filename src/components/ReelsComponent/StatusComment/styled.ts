import styled from 'styled-components';

export const ContainerGlobalMain = styled.div``

export const WrapperImgAndNameAndCommentLike = styled.div` 
  display: flex;
  justify-content: space-between;
`

export const WrapperImgAndNameAndComment = styled.div`
  display: flex;
`

export const WrapperImg = styled.div` // 
  width: 30px;
  height: 30px;
`

export const Img = styled.img` // 
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`

export const ContainerNameAndComment = styled.div` // 
  font-family: 'Roboto';
  width: 147px;
`

export const ContainerNameUser = styled.div` //
  margin-left: 5px;
  height: 16px;
`

export const P = styled.p` // 
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  height: 100%;
`

export const ContainerComment = styled.div` // 
  margin-left: 5px;
  max-width: 140px;
  
`

export const PText = styled.span` // 
  font-size: 13px;
  font-weight: 400;
  word-wrap: break-word;
  word-break: break-all;
  line-height: 10px;
  max-width: 50px;
  height: 20px;
`

export const WrapperButton = styled.div`
  display: flex;
`

export const WrapperKeyButton  = styled.div``

export const ButtonSvg = styled.button`
  cursor: pointer;
  background: none;
  border: none;
`

export const SvgHeartRed = styled.svg`
  color: red;
  width: 100%;
  height: 100%;
`

export const SvgHeartBorderBlack = styled.svg`
  color: black;
  width: 100%;
  height: 100%;
`


export const Container__Like__Response = styled.div`
  height: 27px;
  margin-top: 5px;
  margin-left: 34px;
  display: flex;
  gap: 20px;
  align-items: center;
`

export const Button = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  color: #838383;
`

export const Wrapper__Button = styled.div`
  display: flex;
  align-items: center;
`

export const ModalOverlay = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ContainerChooseOptionsComment = styled.div`
  width: 300px;
  background: white;
  height: 120;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
`

interface ButtonChooseProps {
  button: string;
}

export const ButtonChoose = styled.button<ButtonChooseProps>`
  border: none;
  background: none;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
  width: 100%;
  /* padding: 9px; */
  padding: 12px 0px;
  color: ${props => props.button === "denunciar" &&  "#ed4956"};
  color: ${props => props.button === "excluir" &&  "#ed4956"};
  font-weight: bolder;
  border-bottom: ${props => props.button === "denunciar" &&  "1px solid #00000052"};
  border-bottom: ${props => props.button === "excluir" &&  "1px solid #00000052"};
`