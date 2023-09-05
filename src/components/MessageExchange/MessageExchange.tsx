import Url from '../../Utils/Url';
import { DataMessages, Following } from '../../templates/Message/Message';
import InfoUserMessage from '../InfoUserMessage/InfoUserMessage';
import * as Styled from './styled';
import { useState, useEffect, useRef, useCallback } from 'react';
import * as signalR from '@microsoft/signalr';
import moment from 'moment';
import 'moment-timezone';

interface MessageExchangeProps {
  userMessage: Following | null;
  userId: number;
  connection: signalR.HubConnection | null;
  setPagina: React.Dispatch<React.SetStateAction<number>>;
  pagina: number;
  setDataMessages: React.Dispatch<React.SetStateAction<DataMessages[]>>;
  dataMessages: DataMessages[];
}

const MessageExchange = ({
  userMessage,
  userId,
  connection,
  setPagina,
  pagina,
  setDataMessages,
  dataMessages,
}: MessageExchangeProps) => {
  const [text, setText] = useState<string | undefined>(undefined);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLButtonElement>(null);

  const handleText = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);
    },
    [setText]
  );

  const handleSendMessage = useCallback(() => {
    const currentTime = new Date();

    const formattedDate = currentTime.toString().slice(16, 21);

    if (userMessage) {
      const jsonMessage = {
        senderId: userId,
        recipientId: userMessage?.id,
        recipientEmail: userMessage.email,
        timestamp: formattedDate,
        content: text,
      };

      if (connection) {
        connection.invoke('SendMessage', jsonMessage);
        setDataMessages((prevDataMessages) => [jsonMessage, ...prevDataMessages]);
        setText('');

        setTimeout(() => {
          if (messageContainerRef.current) {
            messageContainerRef.current.scrollTo({
              top: messageContainerRef.current.scrollHeight,
              behavior: 'auto',
            });
          }
        }, 50);
      }
    }
  }, [userMessage, userId, connection, setDataMessages, text]);

  useEffect(() => {
    let registroPorPagina = 20;
    const fetchDataMessagesPaginado = async () => {
      if (userMessage) {
        const res = await fetch(
          `${Url}/messages/${userId}/${userMessage.id}/${pagina}/${registroPorPagina}`
        );
        if (res.status === 200) {
          const json = await res.json();
          setDataMessages((prevData) => [...prevData, ...json.data]);
        }
      }
    };
    fetchDataMessagesPaginado();
  }, [userMessage, userId, pagina]);

  const handleScroll = () => {
    const containerElement = messageContainerRef.current;
    if (containerElement) {
      const nearEndThreshold = 1;
      console.log(containerElement.scrollTop);

      let isNearEnd =
        containerElement.scrollHeight - Math.abs(containerElement.scrollTop) <=
        containerElement.clientHeight + nearEndThreshold;

      if (isNearEnd) {
        setPagina((prevPagina) => prevPagina + 1);
      }
    }
  };

  useEffect(() => {
    const containerElement = messageContainerRef.current;
    if (containerElement) {
      containerElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (containerElement) {
        containerElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.code == 'Enter' && ref.current !== null) {
        ref.current.click();
      }
    });
  }, [text]);

  return (
    <Styled.ContainerMessage>
      <InfoUserMessage
        userMessage={userMessage}
        connection={connection}
        setDataMessages={setDataMessages}
      />
      <Styled.ContainerMainMessageAndTextarea>
        <Styled.ContainerMainMessage ref={messageContainerRef}>
          {dataMessages &&
            userMessage &&
            dataMessages.map((mes, index) => (
              <Styled.WrapperMessage key={index}>
                <Styled.WrapperAllParagraph>
                  <Styled.WrapperTimeMessage>
                    <Styled.PTime>
                      {mes.timestamp.length < 6 ? mes.timestamp : mes.timestamp.slice(11, 16)}
                    </Styled.PTime>
                  </Styled.WrapperTimeMessage>
                  <Styled.WrapperPMessage mymessage={mes.senderId === userId ? 'true' : 'false'}>
                    <Styled.P mymessage={mes.senderId === userId ? 'true' : 'false'}>
                      {mes.content}
                    </Styled.P>
                  </Styled.WrapperPMessage>
                </Styled.WrapperAllParagraph>
              </Styled.WrapperMessage>
            ))}
        </Styled.ContainerMainMessage>
        <Styled.ContainerMainText>
          {userMessage && (
            <Styled.WrapperTextarea>
              <Styled.Textarea
                value={text}
                placeholder="Mensagem..."
                onChange={handleText}
              ></Styled.Textarea>
              <Styled.WrapperButton>
                {text && (
                  <Styled.ButtonSend ref={ref} onClick={handleSendMessage}>
                    Enviar
                  </Styled.ButtonSend>
                )}
              </Styled.WrapperButton>
            </Styled.WrapperTextarea>
          )}
        </Styled.ContainerMainText>
      </Styled.ContainerMainMessageAndTextarea>
    </Styled.ContainerMessage>
  );
};

export default MessageExchange;
