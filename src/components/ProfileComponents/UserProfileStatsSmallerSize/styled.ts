import styled from 'styled-components';

export const ContainerMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px  5px;
  border-top: 1px solid #cfcfcf;
`

export const ContainerStatusUser = styled.div`
  display: flex;
  width: 100vw;
  align-items: center;
  justify-content: center;
`

export const Ul = styled.ul`
  display: flex;
  gap: 10px;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  font-family: "Poppins";
`

export const li = styled.li`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const span = styled.span`
  display: flex;
  font-size: 11px;
  font-weight: 400;
`

export const link = styled.a`
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const PNumber = styled.p`
  font-weight: 600;
  margin-right: 4px;
  font-size: 15px;
`
