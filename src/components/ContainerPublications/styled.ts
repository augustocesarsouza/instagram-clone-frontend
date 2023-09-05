import styled from "styled-components";

interface WrapperPublicationsMainProps {
  $widthfordiv: number;
}

export const WrapperPublicationsMain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
`

export const ContainerMainPublications = styled.div.attrs<WrapperPublicationsMainProps>(props => ({
  style: {
    width: `${props.$widthfordiv}px`,
},
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  
  border-top: 1px solid #cfcfcf;
`

export const WrapperPublications = styled.div`
  width: 6rem;
  border-top: 1px solid #999999;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ButtonPublications = styled.button`
  border: none;
  background: white;
  padding: 20px;
  cursor: pointer;
`