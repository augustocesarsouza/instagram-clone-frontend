import styled from "styled-components";

export const WrapperMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const WrapperMainPublic = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const ContainerMain = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  width: 58.5rem;
  gap: 10px;

  @media (max-width: 1145px){ 
    width: calc(.79 * 100vw);
    grid-template-columns: repeat(auto-fill, minmax(219px, 1fr));

  }

   @media (max-width: 856px){ 
    width: calc(.79 * 100vw);
    grid-template-columns: repeat(auto-fill, minmax(163px, 1fr));

  }
  
  @media (max-width: 750px){ 
    width: calc(.999* 100vw);
    grid-template-columns: repeat(auto-fill, minmax(182px, 1fr));
  }

  @media (max-width: 566px){ 
    width: calc(.999* 100vw);
    grid-template-columns: repeat(auto-fill, minmax(135px, 1fr));
  }
`

export const ContainerImgAndVideo = styled.div`
  width: 19rem;
  height: 19rem;

  @media (max-width: 1145px) {
    width: calc(.5356 * 48vw);
    height: calc(.5356 * 48vw);
  }

  @media (max-width: 750px) {
    width: calc(.5356 * 61vw);
    height: calc(.5356 * 61vw);
  }
`

export const ContainerImg = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  
`

export const WrapperVideo = styled.div`
  width: 19rem;
  height: 19rem;
  cursor: pointer;
  position: relative;

  @media (max-width: 1145px) {
    width: 100%;
    height: 100%;
  }
`

export const Video = styled.video`
  width: 100%;
  height: 100%;

  
`

export const Source = styled.source`

`

export const WrapperVideoIcon = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
`
