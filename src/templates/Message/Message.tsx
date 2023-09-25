import { useLocation } from 'react-router-dom';
import * as Styled from './styled';
import { useEffect, useState } from 'react';
import FollowingMessage from '../../components/MessageComponent/FollowingMessage/FollowingMessage';
import MessageExchange from '../../components/MessageComponent/MessageExchange/MessageExchange';
import Url from '../../Utils/Url';

interface MessageProps {
  myEmail: string | null;
  dataUser: DataUser | null;
  myFollowing: Following[];
  connection: signalR.HubConnection | null;
}

export interface DataUser {
  // id: number;
  // name: string;
  // imagePerfil: string;
  // email: string;
  // follower: Follower[];
  id: number;
  name: string;
  imagePerfil: string;
  email: string;
}

export interface Follower {
  id: number;
  name: string;
  imagePerfil: string;
  email: string;
}

export interface Following {
  id: number;
  name: string;
  imagePerfil: string;
  email: string;
  isOnline: boolean;
  lastDisconnectedTime: number;
  lastDisconnected: number;
  lastDisconnectedTimeMinutes: number;
  measureOfTime: string;
}

export interface DataMessages {
  id: number | null;
  senderId: number;
  recipientId: number;
  recipientEmail: string;
  content: string | undefined;
  timestamp: string;
  alreadySeeThisMessage: number;

  reelId: number | null;
  urlFrameReel: string | null;
  nameUserCreateReel: string | null;
  imagePerfilUserCreateReel: string | null;

  urlAudio: string | null;
  publicIdAudio: string | null;
  audioTimeCount: number | null;
}

const Message = ({ myEmail, dataUser, connection, myFollowing }: MessageProps) => {
  const [userMessage, setUserMessage] = useState<Following | null>(null);
  const [pagina, setPagina] = useState(1);
  const [dataMessages, setDataMessages] = useState<DataMessages[]>([]);
  const [openMessageOfFriend, setOpenMessageOffFriend] = useState(false);

  const location = useLocation();
  const { userId, emailUser, emailConnection } = location.state ? location.state : '';

  useEffect(() => {
    document.body.style.overflowY = 'hidden';
  }, []);

  const fetchDataMessages = async (userMessage: Following) => {
    fetchDataMessagesPaginado(userMessage);
    setUserMessage(userMessage);
    setUserMessage((prevUser) => {
      myFollowing.forEach((f) => {
        if (prevUser?.email == f.email) {
          prevUser.isOnline = f.isOnline;
        }
      });

      return prevUser;
    });
  };

  const fetchDataMessagesPaginado = async (userMessage: Following) => {
    if (userMessage) {
      let registroPorPagina = 20;
      const res = await fetch(
        `${Url}/message/pagination/${userId}/${userMessage.id}/${pagina}/${registroPorPagina}`
      );
      if (res.status === 200) {
        const json = await res.json();

        setDataMessages((prevData) => [...prevData, ...json.data]);
      }
    }
  };

  return (
    <Styled.ContainerMain>
      <FollowingMessage
        userId={userId}
        dataUser={dataUser}
        connection={connection}
        fetchDataMessages={fetchDataMessages}
        myFollowing={myFollowing}
        setPagina={setPagina}
        setDataMessages={setDataMessages}
        setOpenMessageOffFriend={setOpenMessageOffFriend}
      />
      {openMessageOfFriend && (
        <MessageExchange
          userMessage={userMessage}
          userId={userId}
          myEmail={myEmail}
          connection={connection}
          setPagina={setPagina}
          setDataMessages={setDataMessages}
          dataMessages={dataMessages}
        />
      )}
    </Styled.ContainerMain>
  );
};

export default Message;
