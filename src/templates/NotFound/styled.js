import styled from 'styled-components';

export const ContainerMain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

export const ContainerSub = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const H1 = styled.h1``;

export const Button = styled.button`
  padding: 10px;
  width: 10rem;
  border: none;
  border-radius: 7px;
  background: #e5e5e5;
  cursor: pointer;
  font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
  font-weight: 600;

  &:hover {
    background: #ededed;
  }
`;
