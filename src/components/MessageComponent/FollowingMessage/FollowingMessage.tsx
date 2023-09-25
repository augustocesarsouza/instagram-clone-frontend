import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DataMessages, DataUser, Following } from '../../../templates/Message/Message';
import * as Styled from './styled';
import { faPenToSquare, faCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle as faCircleOffline } from '@fortawesome/free-regular-svg-icons';

import { useEffect, useState } from 'react';
import { HubConnection } from '@microsoft/signalr';
import Url from '../../../Utils/Url';

interface FollowingMessageProps {
  userId: number;
  dataUser: DataUser | null;
  connection: HubConnection | null;
  fetchDataMessages: (value: Following) => void;
  myFollowing: Following[];
  setPagina: React.Dispatch<React.SetStateAction<number>>;
  setDataMessages: React.Dispatch<React.SetStateAction<DataMessages[]>>;
  setOpenMessageOffFriend: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LastmessageProps {
  senderId: number;
  RecipientId: number;
  alreadySeeThisMessage: number;
}

interface UsersNewMessageProps {
  alreadySeeThisMessage: number;
  senderId: number;
  recipientId: number;
}

const FollowingMessage = ({
  userId,
  dataUser,
  connection,
  fetchDataMessages,
  myFollowing,
  setPagina,
  setDataMessages,
  setOpenMessageOffFriend,
}: FollowingMessageProps) => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [userClickedLast, setUserClickedLast] = useState<Following>();

  const handleClick = (follo: Following) => {
    setOpenMessageOffFriend(true);
    if (userClickedLast?.id == follo.id) return;
    setActiveId(follo.id);
    setUserClickedLast(follo);
    fetchDataMessages(follo);
    setPagina(1);
    setDataMessages([]);
  };

  // const [newMessage, setNewMessage] = useState(false);
  // const [lastMessage, setLastMessage] = useState<LastmessageProps | null>(null);

  // useEffect(() => {
  //   if (connection === null) return;
  //   if (location.pathname !== '/Message') {
  //     connection.on('ReceiveMessage', (message) => {
  //       if (message.alreadySeeThisMessage == 0) {
  //         setNewMessage(true);
  //       }
  //     });
  //   }
  //   connection.on('AlreadySawMessage', (alreadySee) => {
  //     setNewMessage(!alreadySee);
  //   });
  // }, [connection]);

  // const fetchCheckLastMessage = async (userId: number) => {
  //   const res = await fetch(`${Url}/message/lastmessage/${userId}`);
  //   if (res.status === 200) {
  //     const json = await res.json();
  //     const data: LastmessageProps = json.data;

  //     setLastMessage(data);
  //     if (data.alreadySeeThisMessage == 0) {
  //       setNewMessage(true);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (userId === null) return;
  //   fetchCheckLastMessage(userId);
  // }, [userId]);

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

    connection.on('ReceiveAudio', (messageReceiveReels) => {
      console.log('count');
      setUsersNewMessage((prev) => [
        ...prev.map((cmt) =>
          cmt.senderId === messageReceiveReels.senderId
            ? { ...cmt, alreadySeeThisMessage: (cmt.alreadySeeThisMessage = 0) }
            : cmt
        ),
      ]);
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

    // return () => {
    //   if (connection === null) return;

    //   connection.off('ReceiveMessage');
    //   connection.off('AlreadySawMessage');
    // };
  }, [connection]);

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
    <Styled.ContainerFollowing>
      <Styled.ContainerUserMessage>
        {dataUser && <Styled.P $paragraph="1">{dataUser.name}</Styled.P>}
        <FontAwesomeIcon icon={faPenToSquare} />
      </Styled.ContainerUserMessage>
      <Styled.ContainerMessageSolicitation>
        <Styled.P $paragraph="2">Mensagens</Styled.P>
        <Styled.P $paragraph="3">Solicitações</Styled.P>
      </Styled.ContainerMessageSolicitation>
      {dataUser &&
        myFollowing.map((follo) => (
          <Styled.ContainerFollowingUser
            $active={activeId === follo.id ? 'true' : 'false'}
            key={follo.id}
            onClick={() => handleClick(follo)}
          >
            <Styled.WrapperImagemUser>
              <Styled.ImagemUser src={follo.imagePerfil} />
              {follo.isOnline && (
                <Styled.ContainerIsOnline>
                  <p></p>
                </Styled.ContainerIsOnline>
              )}
            </Styled.WrapperImagemUser>
            <Styled.WrapperNameUser>
              <Styled.P $paragraph="4">{follo.name}</Styled.P>
              {usersNewMessage &&
                usersNewMessage.map((userCmt) => (
                  <div key={userCmt.senderId}>
                    {userCmt.alreadySeeThisMessage == 0 && userCmt.senderId == follo.id && (
                      <Styled.P $paragraph="6">
                        {`${follo.name.charAt(0).toUpperCase()}${follo.name.slice(
                          1
                        )} send new message`}
                      </Styled.P>
                    )}
                  </div>
                ))}
              {follo.isOnline ? (
                <h2></h2>
              ) : (
                <Styled.ContainerIsOffline>
                  <Styled.P $paragraph="5">
                    Online há {follo.lastDisconnected} {follo.measureOfTime}
                  </Styled.P>
                </Styled.ContainerIsOffline>
              )}
            </Styled.WrapperNameUser>
          </Styled.ContainerFollowingUser>
        ))}
    </Styled.ContainerFollowing>
  );
};
export default FollowingMessage;
