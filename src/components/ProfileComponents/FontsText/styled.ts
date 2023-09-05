import styled from "styled-components";

interface ContainerWhiteProps {
  $coloropt: string;
}

interface ContainerColorProps {
  $coloropt: string;
}

interface H1FontProps {
  $fontchosen: string;
}


export const ContainerColorsMain = styled.div`
  position: absolute;
  left: 142px;
  top: 710px;
  width: 200px;
  height: 33px;
  display: flex;
  justify-content: space-around;
`

export const ContainerColors = styled.div`
  position: relative;
  width: 300px;
  height: 33px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
`

export const ContainerWhite = styled.div<ContainerWhiteProps>`
  /* position: absolute; */
  background: white;
  width: 31px;
  height: 31px;
  border-radius: 50%;
  left: ${props => props.$coloropt === "red" && "10px"};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

export const ContainerColor = styled.div<ContainerColorProps>`
  /* position: absolute; */
  background: ${props => props.$coloropt};
  width: 27px;
  height: 27px;
  
  border-radius: 50%;
`

export const ContainerFonts = styled.div`
  background: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

export const H1Font = styled.h1<H1FontProps>`
  color: black;
  font-size: 16px;
  height: 20px;
  /* width: 22px; */
  width: ${props => props.$fontchosen === 'Indie Flower' && "19px"};
  width: ${props => props.$fontchosen === 'Caveat' && "18px"};
  width: ${props => props.$fontchosen === 'Lobster' && "20px"};
  font-family: ${props => props.$fontchosen};
`