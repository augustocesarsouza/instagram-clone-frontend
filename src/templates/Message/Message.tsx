import { useLocation } from 'react-router-dom';
import * as Styled from './styled';
import { useEffect, useState } from 'react';
import FollowingMessage from '../../components/MessageComponent/FollowingMessage/FollowingMessage';
import MessageExchange from '../../components/MessageComponent/MessageExchange/MessageExchange';

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
  senderId: number;
  recipientId: number;
  recipientEmail: string;
  timestamp: string;
  content: string | undefined;
  reelId: number | null;
  urlFrameReel: string | null;
  publicIdFrameReel: string | null;
}

const Message = ({ myEmail, dataUser, connection, myFollowing }: MessageProps) => {
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
        myFollowing={myFollowing}
        setPagina={setPagina}
        setDataMessages={setDataMessages}
      />
      <MessageExchange
        userMessage={userMessage}
        userId={userId}
        myEmail={myEmail}
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
