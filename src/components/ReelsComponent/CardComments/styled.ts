import styled from 'styled-components';


export const ContainerCommentMain = styled.div` //
  height: 415px;
  display: flex;
  flex-direction: column;
  
`

export const ContainerCommentFromUsers = styled.div` // 
  /* margin-top: 20px; */
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  padding-left: 25px;
  padding-right: 25px;
`

export const ContainerInfoUser = styled.div` // 
  display: flex;
  margin-bottom: 35px;
  width: 100%;
  justify-content: space-between;
  flex-direction: column;
`

export const WrapperButton = styled.div`
  display: flex;
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


export const Container__Like__Response = styled.div`
  height: 27px;
  margin-top: 5px;
  margin-left: 34px;
`

export const SpanLikeResponse = styled.span`
  display: flex;
  gap: 20px;
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

// export const Button = styled.button`
//   border: none;
//   background: none;
//   color: grey;
//   cursor: pointer;
// `

export const WrapperSubComment = styled.div`
  display: flex;
  width: 100%;
`
export const ContainerImgUserComment = styled.div`
  width: 27px;
  height: 27px;
`

export const ImgUserComment = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`

export const WrapperUserInfoSubComment = styled.div`
  margin-left: 10px;
  width: 80%;
`

export const PSub = styled.p`
  font-family: 'Quicksand';
  font-size: 13px;
  font-weight: 500;
  /* text-align: justify; */
  font-weight: 600;
  margin-right: 5px;
  font-size: 13px;
  word-wrap: break-word;
`

export const Span = styled.span`
  margin-left: 10px;
  font-weight: 500;
`

export const ContainerMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 20px;
  margin-left: 34px;
`

export const ContainerRisco = styled.div`
  border-top: 1px solid #00000057;
  width: 20px;
  margin-right: 10px;
  margin-bottom: 3px;
`