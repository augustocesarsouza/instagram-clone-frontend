import * as Styled from './styled';
import { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import Url from '../../Utils/Url';

import SvgLogoReels from './InstagramReelsIcon/InstagramReelsIcon';
import { ThemeProvider } from 'styled-components';
import InstagramMessageSvg from './InstagramMessageSvg/InstagramMessageSvg';
import InstagramCreateSvg from './InstagramCreateSvg/InstagramCreateSvg';
import InstagramHomePageSvg from './InstagramHomePageSvg/InstagramHomePageSvg';

interface MenuProps {
  userId: number | null;
  connection: signalR.HubConnection | null;
  base64ImgChange: string;
  emailConnection: string | null;
  setImgUserLogged: React.Dispatch<React.SetStateAction<string>>;
  callOpenModalCreatePublication: (value: boolean) => void;
  setCreatePost: React.Dispatch<React.SetStateAction<boolean>>;
}

interface UsersNewMessageProps {
  alreadySeeThisMessage: number;
  senderId: number;
  recipientId: number;
}

export interface DataUserOnlyProps {
  id: number;
  name: string;
  email: string;
  imagePerfil: string;
}

const Menu = ({
  userId,
  connection,
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

  const [usersNewMessage, setUsersNewMessage] = useState<UsersNewMessageProps[]>([]);

  useEffect(() => {
    if (connection === null) return;

    connection.on('ReceiveMessage', (message) => {
      if (message.alreadySeeThisMessage == 0) {
        setUsersNewMessage((prev) => [
          ...prev.map((cmt) =>
            cmt.senderId === message.senderId
              ? { ...cmt, alreadySeeThisMessage: (cmt.alreadySeeThisMessage = 0) }
              : cmt
          ),
        ]);
      }
    });

    connection.on('AlreadySawMessage', (usuarioQuejavi) => {
      setUsersNewMessage((prev) => [
        ...prev.map((cmt) =>
          cmt.senderId == usuarioQuejavi.senderId
            ? { ...cmt, alreadySeeThisMessage: (cmt.alreadySeeThisMessage = 1) }
            : cmt
        ),
      ]);
    });

    connection.on('ReceiveReels', (messageReceiveReels) => {
      setUsersNewMessage((prev) => [
        ...prev.map((cmt) =>
          cmt.senderId === messageReceiveReels.senderId
            ? { ...cmt, alreadySeeThisMessage: (cmt.alreadySeeThisMessage = 0) }
            : cmt
        ),
      ]);
    });

    connection.on('ReceiveAudio', (messageReceiveReels) => {
      setUsersNewMessage((prev) => [
        ...prev.map((cmt) =>
          cmt.senderId === messageReceiveReels.senderId
            ? { ...cmt, alreadySeeThisMessage: (cmt.alreadySeeThisMessage = 0) }
            : cmt
        ),
      ]);
    });

    return () => {
      if (connection === null) return;

      connection.off('ReceiveReels');
      // connection.off('AlreadySawMessage');
    };
  }, [connection, activeButton]);

  const fetchCheckLastMessage = async (userId: number) => {
    const res = await fetch(`${Url}/message/followers/last-message-each/${userId}`);
    if (res.status === 200) {
      const json = await res.json();
      const data = json.data;

      setUsersNewMessage(data);
    }
  };

  useEffect(() => {
    if (userId === null) return;
    fetchCheckLastMessage(userId);
  }, [userId]);

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
              <InstagramHomePageSvg />
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
              {usersNewMessage &&
                usersNewMessage.map((userCmt) => (
                  <div key={userCmt.senderId}>
                    {userCmt.alreadySeeThisMessage === 0 && (
                      <Styled.ContainerNewMessage>
                        <Styled.PNewMessage>1</Styled.PNewMessage>
                      </Styled.ContainerNewMessage>
                    )}
                  </div>
                ))}
              <InstagramMessageSvg />
              <Styled.ButtonNav>Mensagens</Styled.ButtonNav>
            </Styled.ContainerAwesomeButton>
            <Styled.ContainerAwesomeButton
              onClick={() => handleCreate('create')}
              $active={activeButton === 'create' ? 'true' : 'false'}
            >
              <InstagramCreateSvg />
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
