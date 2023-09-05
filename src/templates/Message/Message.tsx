import { useLocation } from 'react-router-dom';
import Url from '../../Utils/Url';
import * as Styled from './styled';
import { useEffect, useState } from 'react';
import FollowingMessage from '../../components/FollowingMessage/FollowingMessage';
import MessageExchange from '../../components/MessageExchange/MessageExchange';

interface MessageProps {
  dataUser: DataUser | null;
  myFollowing: Following[];
  connection: signalR.HubConnection | null;
}

export interface DataUser {
  id: number;
  name: string;
  imagePerfil: string;
  email: string;
  follower: Follower[];
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
  lastDisconnected: number;
  lastDisconnectedTime: number;
  measureOfTime: string;
}

export interface DataMessages {
  senderId: number;
  recipientId: number;
  recipientEmail: string;
  timestamp: string;
  content: string | undefined;
}

const Message = ({ dataUser, connection, myFollowing }: MessageProps) => {
  const [userMessage, setUserMessage] = useState<Following | null>(null);
  const [pagina, setPagina] = useState(1);
  const [dataMessages, setDataMessages] = useState<DataMessages[]>([]);

  const location = useLocation();
  const { userId, emailUser, emailConnection } = location.state ? location.state : '';

  useEffect(() => {
    document.body.style.overflowY = 'hidden';
  }, []);

  const fetchDataMessages = async (userMessage: Following) => {
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

  return (
    <Styled.ContainerMain>
      <FollowingMessage
        dataUser={dataUser}
        fetchDataMessages={fetchDataMessages}
        userId={userId}
        myFollowing={myFollowing}
        setPagina={setPagina}
        setDataMessages={setDataMessages}
      />
      <MessageExchange
        userMessage={userMessage}
        userId={userId}
        connection={connection}
        setPagina={setPagina}
        pagina={pagina}
        setDataMessages={setDataMessages}
        dataMessages={dataMessages}
      />
    </Styled.ContainerMain>
  );
};

export default Message;
