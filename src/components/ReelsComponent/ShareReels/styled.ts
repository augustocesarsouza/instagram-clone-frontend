import styled from 'styled-components';

interface WrapperImgProps {
  $wrapper: string;
}

export const WrapperImg = styled.div<WrapperImgProps>`
  width: ${props => props.$wrapper === "icon-share" && "28px"};
  height: ${props => props.$wrapper === "icon-share" && "28px"};
  margin-top: ${props => props.$wrapper === "icon-share" && "10px"};
  display: flex;

  svg {
    width: 100%;
    height: 100%;
    
    g > path {
      fill: black;
    }
  }
  
  cursor: pointer;

  width: ${props => props.$wrapper === "suggestion" && "50px"};
  height: ${props => props.$wrapper === "suggestion" && "50px"};
`

interface ImgProps {
  $img: string;
}

export const Img = styled.img<ImgProps>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${props => props.$img === "suggestion" && "50%"};
`

export const ContainerShareReels = styled.div`
  width: 343px;
  height: 610px;
  right: 24px;
  bottom: 36px;
  box-shadow: 0px 4px 20px 0px #0000002b;
  border-radius: 5px;
  position: absolute;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  z-index: 10;
  /* justify-content: space-between; */
  font-family: "Poppins";
`

export const ContainerMainShareAndSearch = styled.div`
  padding: 25px 30px 10px 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`

export const ContainerTop = styled.div`
  display: flex;
  /* padding: 20px; */
  align-items: center;
  justify-content: space-between;
`

export const ContainerP = styled.div`
  width: 14rem;
`

interface ParagraphProps {
  $paragraph: string;
}

export const P = styled.p<ParagraphProps>`
  font-size: 15px;
  font-weight: 500;
  
  font-weight: ${props => props.$paragraph === "suggestion" && "400"};
  font-size: ${props => props.$paragraph === "suggestion" && "14px"};;

  color: ${props => props.$paragraph === "usermarked" && "#0d9af6"};
  display: inline-block;

  &:hover{
    color: ${props => props.$paragraph === "usermarked" && "#2851A3"};
  }
  cursor: ${props => props.$paragraph === "usermarked" && "pointer"};
`

export const ContainerX = styled.div`
  display: flex;

  font-size: 23px;
`

interface ContainerFilterProps {
  $amountofchecked: number;
}

export const ContainerFilter = styled.div<ContainerFilterProps>`
  display: flex;
  align-items: ${props => props.$amountofchecked > 0 ? "none" : "center"};
`

interface ContainerSearchProps{
  $amountofchecked: number;
}

export const ContainerSearch = styled.div<ContainerSearchProps>`
  display: flex;
  flex-direction: column;
  margin-left: ${props => props.$amountofchecked > 0 ? "10px" : "0px"};
  gap: 10px;
  align-items: flex-start; 
`

interface ContainerUserMarkedProps {
  $name: string;
  $usermarkeddelete: string;
}

export const ContainerUserMarked = styled.div<ContainerUserMarkedProps>`
  border-radius: 15px;
  cursor: auto;
  max-width: 12rem;

  background: ${props => props.$name == props.$usermarkeddelete ? "#0095f6" : "#e0f1ff"};
  padding: 3px 14px;
  border-radius: 15px;

  svg {
    margin-left: 10px;
    color: ${props => props.$name == props.$usermarkeddelete ? "white" : "#0d9af6"};

    cursor: pointer;
  }
`

interface ParagraphUserMarkedProps {
  $name: string;
  $usermarkeddelete: string
}

export const ParagraphUserMarked = styled.p<ParagraphUserMarkedProps>`
  font-size: 15px;
  font-weight: 500;

  color: ${props => props.$name == props.$usermarkeddelete ? "white" : "#0d9af6"};
  display: inline-block;

  &:hover{
    color: ${props => props.$name == props.$usermarkeddelete ? "white" : "#2851A3"};

  }
  cursor: pointer;
`

export const ContainerNameUserMarked = styled.div``

export const Input = styled.input`
  border: none;
  margin-left: 10px;
  margin-top: 2px;

  &:focus {
    outline: none;
  }
`

export const Article = styled.article`
  border-top: 1px solid #0000003d;
  padding: 15px 30px 0px 30px;
  overflow-y: scroll;
  height: 70%;
  /* max-height: 20rem; */
`

export const ContainerSuggestion = styled.div`
  margin-bottom: 20px;
`

export const ContainerMainAllUsersSuggestion = styled.div`
  display: flex;
  flex-direction: column;
  
`

export const ContainerUserSuggestion = styled.div`
  display: grid;
  grid-template-columns: 1fr 42px;
  cursor: pointer;
  padding: 10px 5px;
  border-radius: 3px;

  &:hover {
    background-color: #80808014;
  }
`

export const ContainerMainInfoUser = styled.div`
 display: flex;
`

export const ContainerInfoUserSuggestion = styled.div`
  margin-left: 10px;
`

export const ContainerMainLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const WrapperInputCheckbox = styled.div`
  width: 30px;
  height: 30px;
`

interface LabelProps{
 $listofusermarked: {[key: string]: boolean};
 $nameuserlabel: string;
 $idclicked: number;
}

export const Label = styled.label<LabelProps>`
  width: 100%;
  height: 100%;
  border-radius: 50%;

  border: ${props =>  props.$listofusermarked[props.$nameuserlabel] === true ? "none" : "1px solid gray"};

  background-color: white;
  display: inline-block;
  cursor: pointer;

  

  &:before {
    content: '';
    display: ${props => props.$listofusermarked[props.$nameuserlabel] === true ? 'block' : 'none'};


    width: 100%;
    height: 100%;
    border-radius: 50%;

    background-image: ${props => props.$listofusermarked[props.$nameuserlabel] === true && 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' height=\'22px\' width=\'26px\' viewBox=\'0 0 448 512\'%3E%3C!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --%3E%3Cstyle%3Esvg%7Bfill:%23ffffff%7D%3C/style%3E%3Cpath d=\'M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z\'/%3E%3C/svg%3E")'};

    background-color: ${props =>  props.$listofusermarked[props.$nameuserlabel] === true && "#0095f6"};

    background-position: center;
  }
`

interface ContainerMainSendProps {
  $amountofchecked: string;
}

export const ContainerMainSend = styled.div<ContainerMainSendProps>`
  width: 100%;
  /* height: 13%; */
  /* height: ${props => props.$amountofchecked === "true" ? "#0095f6" : "#13%"}; */
  padding: 16px;
  border-top: 1px solid #0000003d;
  display: flex;
  flex-direction: column;
  align-items: center; 
   justify-content: center;
`

export const ContainerSendMessage = styled.div`
 width: 100%;
 padding: 4px 15px 12px 13px;
`

export const WrapperButton = styled.div`
  width: 90%;
  height: 100%;
`

interface ButtonProps {
  $amountofchecked: string;
}

export const Button = styled.button<ButtonProps>`
  width: 100%;
  height: 100%;
  padding: 10px;
  border-radius: 10px;
  border: none;
  color: #d5edfd;
  font-size: 14px;
  font-weight: 600;
  background-color: ${props => props.$amountofchecked === "true" ? "#0095f6" : "#b2dffc"};
  cursor: ${props => props.$amountofchecked === "true" ? "pointer" : "auto"};

  &:hover {
    background-color: ${props => props.$amountofchecked === "true" && "#1a73e8"};
  }
`