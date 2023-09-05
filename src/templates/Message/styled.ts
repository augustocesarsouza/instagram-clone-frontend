import styled from "styled-components";

export const ContainerMain = styled.div`
  display: flex;
  justify-content: space-between;
  /* width: 51rem; esse aqui deve ser para tela menor 1200 */
  width: 96%;
  margin-left: 79px;

  @media (max-width: 750px) {
    width: 100%;
    margin-left: 0;
  }

`

