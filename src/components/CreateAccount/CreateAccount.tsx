import Url from '../../Utils/Url';
import * as Styled from './styled';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

interface DataInfoUser {
  id: null;
  name: string;
  email: string;
  imagePerfil: string;
  birthDate: string;
  password: string;
}

const CreateAccount = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [imgPerfil, setImgPerfil] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [disableButton, setDisableButton] = useState(false);
  const [deactivate, setDeactivate] = useState(true);
  const [dataInfoCreateUser, setDataInfoCreateUser] = useState<DataInfoUser | null>(null);
  const nav = useNavigate();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    setDisableButton(!email.includes('@gmail.com'));

    setDeactivate(name.length <= 3);

    const isValidForm = /^(\d{2})\/(\d{2})\/(\d{4})$/.test(birthDate);
    setDeactivate(!isValidForm);
  }, [email, name, birthDate]);

  const handleLoginBack = () => {
    nav('/');
  };

  const dataUserCreate = {
    Name: name,
    Email: email,
    ImagePerfil: imgPerfil,
    BirthDateString: birthDate,
  };

  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    const res = await fetch(`${Url}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataUserCreate),
    });
    if (res.status === 200) {
      const json = await res.json();
      setDataInfoCreateUser(json.data as DataInfoUser);
    } else if (res.status === 400) {
      const json = await res.json();
      setErrorMessage(json.message);
    }
  };

  return (
    <Styled.ContainerMain>
      <Styled.ContainerImgRegister>
        <Styled.ContainerImg>
          <Styled.Img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png"
            alt="img-instagram"
          />
          <Styled.P>Cadastre-se para ver fotos e vídeos dos seus amigos.</Styled.P>
        </Styled.ContainerImg>
        <Styled.DivSpan>
          <Styled.Span data-testid="meu-span" />
          <Styled.Span data-testid="meu-span" />
        </Styled.DivSpan>
        <Styled.ContainerInfoRegister>
          <Styled.Input placeholder="Nome" onChange={(e) => setName(e.target.value)} />
          <Styled.DivInputEmail>
            {disableButton && email && <FontAwesomeIcon icon={faCircleXmark} />}
            <Styled.Input placeholder="Email: @gmail.com" onChange={handleEmailChange} />
          </Styled.DivInputEmail>
          <Styled.Input
            placeholder="Imagem Perfil"
            onChange={(e) => setImgPerfil(e.target.value)}
          />
          <Styled.Input
            placeholder="Birth Date dd/MM/yyyy"
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </Styled.ContainerInfoRegister>
        <Styled.DivButtonRegister>
          <Styled.Button onClick={handleRegister} disabled={disableButton || deactivate}>
            Cadastre-se
          </Styled.Button>
        </Styled.DivButtonRegister>
      </Styled.ContainerImgRegister>
      <Styled.ContainerBackLogin>
        <Styled.PLogin>
          Tem uma conta?{' '}
          <Styled.SpanLogin data-testid="connect" onClick={handleLoginBack}>
            Conecte-se
          </Styled.SpanLogin>
        </Styled.PLogin>
      </Styled.ContainerBackLogin>
      <p>{errorMessage ? errorMessage : ''}</p>
      {dataInfoCreateUser && (
        <p>
          Cuidado com a senha ela só vai ser mostrada Dessa vez não tem como recuperar sem ela
          Password:{dataInfoCreateUser.password}
        </p>
      )}
    </Styled.ContainerMain>
  );
};

export default CreateAccount;
