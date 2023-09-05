import styled from "styled-components";

interface ContainerMain {
  index: number
}

export const ContainerMain = styled.div<ContainerMain>`
  margin-top: ${props => props.index === 0 ? '5rem' : '0px'};
`;


export const ContainerInteraction = styled.div`
  display: flex;
  gap: 15px;
`

export const ContainerMessage = styled.div`
svg {
    cursor: pointer;
    font-size: 24px;
  }
`

export const LikeCountSection = styled.section`
  margin-top: 10px;
`

export const SpanLikes = styled.span`
  font-family: 'Nunito Sans', sans-serif;
  font-size: 14px;
`

export const AllCommentsDiv = styled.div``

export const AllCommentsP = styled.p`
  cursor: pointer;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 14px;
`