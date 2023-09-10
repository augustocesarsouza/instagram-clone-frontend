import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DataMessages, DataUser, Following } from '../../templates/Message/Message';
import * as Styled from './styled';
import { faPenToSquare, faCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle as faCircleOffline } from '@fortawesome/free-regular-svg-icons';

import { useEffect, useState } from 'react';

interface FollowingMessageProps {
  dataUser: DataUser | null;
  fetchDataMessages: (value: Following) => void;
  myFollowing: Following[];
  setPagina: React.Dispatch<React.SetStateAction<number>>;
  setDataMessages: React.Dispatch<React.SetStateAction<DataMessages[]>>;
}

const FollowingMessage = ({
  dataUser,
  fetchDataMessages,
  myFollowing,
  setPagina,
  setDataMessages,
}: FollowingMessageProps) => {
  const [activeId, setActiveId] = useState<number | null>(null);

  const handleClick = (follo: Following) => {
    setActiveId(follo.id);
    fetchDataMessages(follo);
    setPagina(1);
    setDataMessages([]);
  };

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
