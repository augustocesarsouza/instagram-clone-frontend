import { useState, useEffect } from 'react';
import FormLogin from '../../components/FormLogin/FormLogin.tsx';
import * as Styled from './styled';
import Url from '../../Utils/Url.tsx';
import { useNavigate } from 'react-router-dom';

interface Data {
  userId: number;
  email: string;
  imagePerfil: string;
  token: string;
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  useEffect(() => {
    localStorage.removeItem('UserId');
    localStorage.removeItem('emailConnection');
  }, []);

  const handlerLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await fetch(`${Url}/user/login/${email}/${password}`);
    if (res.status == 200) {
      const json = await res.json();

      const { userId, email: emailUser } = json.data as Data;

      localStorage.setItem('Token', json.token);
      localStorage.setItem('UserId', userId.toString());
      localStorage.setItem('emailConnection', emailUser);

      if (json.isSucess == true) {
        nav('/AllPost', { state: { userId, emailUser } });
      }
    }
  };

  const handleCreateAccount = () => {
    nav('/CreateAccount');
  };

  return (
    <Styled.ContainerLoginMain>
      <FormLogin
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handlerLogin={handlerLogin}
      />
      <Styled.ContainerCreateAccount>
        <Styled.P>
          Não tem uma conta? <Styled.Span onClick={handleCreateAccount}>Cadastre-se</Styled.Span>
        </Styled.P>
      </Styled.ContainerCreateAccount>
    </Styled.ContainerLoginMain>
  );
};

export default Login;
