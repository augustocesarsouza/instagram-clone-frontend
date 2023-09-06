import { useEffect, useState } from 'react';
import { DataMessages, Following } from '../../templates/Message/Message';
import * as Styled from './styled';
import { useCallback } from 'react';

interface InfoUserMessageProps {
  userMessage: Following | null;
  connection: signalR.HubConnection | null;
  setDataMessages: React.Dispatch<React.SetStateAction<DataMessages[]>>;
}

interface MessageSendProps {
  senderId: number;
  recipientId: number;
  timestamp: string;
  content: string | undefined;
}

const InfoUserMessage = ({ userMessage, connection, setDataMessages }: InfoUserMessageProps) => {
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (connection !== null && userMessage !== null) {
      connection.invoke('TypingOrnNot', userMessage.email, isTyping);
    }
  }, [isTyping]);

  const handleKeyDown = useCallback(() => {
    setIsTyping(true);
  }, [setIsTyping]);

  useEffect(() => {
    var time: NodeJS.Timeout;

    const handleKeyUp = () => {
      clearTimeout(time);
      time = setTimeout(() => {
        setIsTyping(false);
      }, 2000);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const [friendTyping, setFriendTyping] = useState(Boolean);

  useEffect(() => {
    const initializeSignalRConnection = async () => {
      if (connection) {
        connection.on('ReceiveMessage', (messageSend: MessageSendProps, recipientEmail: string) => {
          const { senderId, recipientId, content, timestamp } = messageSend;
          const newMessage = {
            senderId,
            recipientId,
            content,
            timestamp,
            recipientEmail,
          };

          setDataMessages((prevDataMessages) => [newMessage, ...prevDataMessages]);
        });

        connection.on('TypeOrnNot', (isTyping: boolean) => {
          setFriendTyping(isTyping);
        });
      }
    };
    initializeSignalRConnection();

    return () => {
      connection?.off('ReceiveMessage');
    };
  }, [connection]);

  return (
    <>
      {userMessage && (
        <Styled.ContainerInfoUser>
          <Styled.WrapperUserMessage>
            <Styled.WrapperImageUser>
              <Styled.ImgUser src={userMessage?.imagePerfil} />
              {userMessage.isOnline && (
                <Styled.ContainerIsOnline>
                  <p></p>
                </Styled.ContainerIsOnline>
              )}
            </Styled.WrapperImageUser>
            <Styled.WrapperNameUser>
              <Styled.PUser $paragraph="p1">{userMessage?.name}</Styled.PUser>
              {friendTyping && <Styled.PUser $paragraph="typing">Digitando...</Styled.PUser>}

              {userMessage.isOnline ? (
                <Styled.PUser $paragraph="p2"></Styled.PUser>
              ) : (
                <Styled.ContainerIsOffline>
                  <Styled.PUser $paragraph="p2">
                    Online há {userMessage.lastDisconnected} {userMessage.measureOfTime}
                  </Styled.PUser>
                </Styled.ContainerIsOffline>
              )}
            </Styled.WrapperNameUser>
          </Styled.WrapperUserMessage>
          <Styled.WrapperIcons>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg>
          </Styled.WrapperIcons>
        </Styled.ContainerInfoUser>
      )}
    </>
  );
};

export default InfoUserMessage;
