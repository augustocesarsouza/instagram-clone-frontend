import * as Styled from './styled';
import { useEffect, useState, useLayoutEffect } from 'react';
import { faHouse, faMessage, faPlus } from '@fortawesome/free-solid-svg-icons';

import { useLocation, useNavigate } from 'react-router-dom';
import Url from '../../Utils/Url';

import SvgLogoReels from './InstagramReelsIcon/InstagramReelsIcon';
import { ThemeProvider } from 'styled-components';

interface MenuProps {
  userId: number | null;
  base64ImgChange: string;
  emailConnection: string | null;
  setImgUserLogged: React.Dispatch<React.SetStateAction<string>>;
  callOpenModalCreatePublication: (value: boolean) => void;
  setCreatePost: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface DataUserOnlyProps {
  id: number;
  name: string;
  email: string;
  imagePerfil: string;
}

const Menu = ({
  userId,
  base64ImgChange,
  emailConnection,
  setImgUserLogged,
  callOpenModalCreatePublication,
  setCreatePost,
}: MenuProps) => {
  const [activeButton, setActiveButton] = useState('');
  const [dataUserOnly, setDataUserOnly] = useState<DataUserOnlyProps | null>(null);

  const theme = {
    activeButton: activeButton,
  };

  useEffect(() => {
    const fetchUserDataOnly = async () => {
      const res = await fetch(`${Url}/user/data/${userId}`);
      if (res.status === 200) {
        const json = await res.json();
        setDataUserOnly(json.data as DataUserOnlyProps);
      }
    };
    fetchUserDataOnly();
  }, [userId]);

  useEffect(() => {
    if (base64ImgChange.length > 0) {
      setDataUserOnly((prev) => (prev !== null ? { ...prev, imagePerfil: base64ImgChange } : prev));
    }
  }, [base64ImgChange]);

  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/profile') {
      setActiveButton('profile');
    }

    if (location.pathname === '/Message') {
      setActiveButton('message');
    }
  }, [location, activeButton]);

  useEffect(() => {
    if (dataUserOnly) {
      setImgUserLogged(dataUserOnly.imagePerfil);
    }
  }, [dataUserOnly]);

  const nav = useNavigate();

  const handleHomePage = (buttonName: string) => {
    setActiveButton(buttonName);
    nav('/AllPost', { state: { userId } });
  };

  const handleMessage = (buttonName: string) => {
    setActiveButton(buttonName);
    nav('/Message', { state: { userId, emailConnection } });
  };

  const handleProfile = (buttonName: string) => {
    setActiveButton(buttonName);
    const profileTrue = true;
    nav('/profile', { state: { userId, profileTrue } });
  };

  const handleCreate = (buttonName: string) => {
    setActiveButton(buttonName);
    callOpenModalCreatePublication(true);
    // nav('/create', { state: { userId } });
    setCreatePost(true);
  };

  const handleReels = (buttonName: string) => {
    setActiveButton(buttonName);
    nav('/reels', { state: { userId } });
  };

  return (
    <ThemeProvider theme={theme}>
      <Styled.Container>
        <Styled.ContainerMain>
          <Styled.ContainerInstagramSvg>
            <Styled.SvgImg
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png"
              alt="img-instagram"
            />
          </Styled.ContainerInstagramSvg>
          <Styled.ContainerNav>
            <Styled.ContainerAwesomeButton
              onClick={() => handleHomePage('home-page')}
              $active={activeButton === 'home-page' ? 'true' : 'false'}
            >
              <Styled.AnimatedSvg icon={faHouse} />
              <Styled.ButtonNav>Página inicial</Styled.ButtonNav>
            </Styled.ContainerAwesomeButton>
            <Styled.ContainerAwesomeButton
              onClick={() => handleReels('reels')}
              $active={activeButton === 'reels' ? 'true' : 'false'}
            >
              <SvgLogoReels />
              <Styled.ButtonNav>Reels</Styled.ButtonNav>
            </Styled.ContainerAwesomeButton>
            <Styled.ContainerAwesomeButton
              onClick={() => handleMessage('message')}
              $active={activeButton === 'message' ? 'true' : 'false'}
            >
              <Styled.AnimatedSvg icon={faMessage} />
              <Styled.ButtonNav>Mensagens</Styled.ButtonNav>
            </Styled.ContainerAwesomeButton>
            <Styled.ContainerAwesomeButton
              onClick={() => handleCreate('create')}
              $active={activeButton === 'create' ? 'true' : 'false'}
            >
              <Styled.AnimatedSvg icon={faPlus} />
              <Styled.ButtonNav>Criar</Styled.ButtonNav>
            </Styled.ContainerAwesomeButton>
            <Styled.ContainerAwesomeButton
              onClick={() => handleProfile('profile')}
              $active={activeButton === 'profile' ? 'true' : 'false'}
            >
              {dataUserOnly && (
                <Styled.WrapperImg>
                  <Styled.ImgProfile src={dataUserOnly.imagePerfil} alt={dataUserOnly.name} />
                </Styled.WrapperImg>
              )}
              <Styled.ButtonNav>Perfil</Styled.ButtonNav>
            </Styled.ContainerAwesomeButton>
          </Styled.ContainerNav>
        </Styled.ContainerMain>
      </Styled.Container>
    </ThemeProvider>
  );
};

export default Menu;
