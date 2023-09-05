import * as Styled from './styled';
const FormLogin = ({ email, password, setEmail, setPassword, handlerLogin }) => {
  return (
    <Styled.DivMainLogin>
      <Styled.H1>Faça Login</Styled.H1>
      <Styled.FormLoginContainer>
        <Styled.Label>
          <Styled.LabelSpan>Email</Styled.LabelSpan>
          <Styled.Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Styled.Label>
        <Styled.Label>
          <Styled.LabelSpan>Password</Styled.LabelSpan>
          <Styled.Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Styled.Label>
        <Styled.Button onClick={handlerLogin}>Login</Styled.Button>
      </Styled.FormLoginContainer>
    </Styled.DivMainLogin>
  );
};

export default FormLogin;
