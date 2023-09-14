import styled from 'styled-components';

export const WrapperMain = styled.div`
  display: flex;
  justify-content: space-between;
`

export const ContainerUserInfo = styled.div`
  display: flex;
`

export const ContainerImgUserComment = styled.div`
  width: 30px;
  height: 30px;
`

export const ImgUserComment = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`

export const ContainerUserInfoComment = styled.div`
  margin-left: 10px;
  width: 18rem;

  @media (min-width: 840px) and (max-width: 1050px){ 
    width: 14rem;
  }

   @media (min-width: 735px) and (max-width: 839px){ 
    width: 11rem;
  }

  /*@media (min-width: 600px) and (max-width: 734px){ 
    width: 10rem;
  } */
`

export const P = styled.p`
  font-size: 13px;
  font-weight: 600;
  margin-right: 5px;
  font-size: 13px;
  text-align: justify;
  word-wrap: break-word;
`

export const Span = styled.span`
  margin-left: 10px;
  font-weight: 400;
  word-wrap: break-word;
`

export const Wrapper_P = styled.div`
  width: 15rem;
  height: 3rem;
`

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

export const WrapperKeyButton  = styled.div`
 display: flex;
`