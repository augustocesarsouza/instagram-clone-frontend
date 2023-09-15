import styled from 'styled-components';

export const DivMainLogin = styled.div`
  width: 100vw;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 30px;
  font-family: Arial, Helvetica, sans-serif;
`;

export const H1 = styled.h1`
  margin-bottom: 2rem;
`;

export const FormLoginContainer = styled.form`
  display: flex;
  gap: 20px;
  padding: 20px 27px;
  background-color: #f2f2f2;
  border-radius: 10px;
  width: 40rem;
  flex-wrap: wrap;
  justify-content: center;

  @media (min-width: 560px) and (max-width: 800px) {
    width: 37rem;
  }

  @media (min-width: 350px) and (max-width: 700px) {
    width: 15rem;
  }
`;

export const Label = styled.label`
  width: 100vw;
`;

export const LabelSpan = styled.span`
  margin-right: 10px;
  font-weight: bold;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

export const Button = styled.button`
  width: 100px;
  padding: 6px;
  border: 2px solid rgba(0, 0, 0, 0.391);
  cursor: pointer;
  color: black;
  background-color: #e6e6e6;
  border-radius: 5px;
  transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;

  &:hover {
    background-color: #d9d9d9;
    border-color: rgba(0, 0, 0, 0.5);
  }
`;
