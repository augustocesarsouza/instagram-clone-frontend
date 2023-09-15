import Url from '../../../Utils/Url';
import { DataMessages, Following } from '../../../templates/Message/Message';
import InfoUserMessage from '../InfoUserMessage/InfoUserMessage';
import * as Styled from './styled';
import { useState, useEffect, useRef, useCallback } from 'react';
import * as signalR from '@microsoft/signalr';
import 'moment-timezone';
import ModalReelVideoInfo from '../ModalReelVideoInfo/ModalReelVideoInfo';

interface MessageExchangeProps {
  userMessage: Following | null;
  userId: number;
  myEmail: string | null;
  connection: signalR.HubConnection | null;
  setPagina: React.Dispatch<React.SetStateAction<number>>;
  pagina: number;
  setDataMessages: React.Dispatch<React.SetStateAction<DataMessages[]>>;
  dataMessages: DataMessages[];
}

interface InfoUserVideoFrame {
  id: number;
  user: UserInfo;
}

interface UserInfo {
  name: string;
  imagePerfil: string;
}

const MessageExchange = ({
  userMessage,
  userId,
  myEmail,
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

    // const formattedDate = currentTime.toString().slice(16, 21);

    if (userMessage !== null && myEmail !== null) {
      const jsonMessageSendHubConnection = {
        senderId: userId,
        recipientId: userMessage?.id,
        SenderEmail: myEmail,
        recipientEmail: userMessage.email,
        timestamp: null,
        content: text,
        reelId: null,
        urlFrameReel: null,
        publicIdFrameReel: null,
      };

      const jsonMessageToReact = {
        senderId: userId,
        recipientId: userMessage?.id,
        SenderEmail: myEmail,
        recipientEmail: userMessage.email,
        timestamp: currentTime.toString(),
        content: text,
        reelId: null,
        urlFrameReel: null,
        publicIdFrameReel: null,
      };

      if (connection) {
        connection.invoke('SendMessage', jsonMessageSendHubConnection);
        setDataMessages((prevDataMessages) => [jsonMessageToReact, ...prevDataMessages]);
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
          `${Url}/message/pagination/${userId}/${userMessage.id}/${pagina}/${registroPorPagina}`
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

  const [user, setUser] = useState<InfoUserVideoFrame[] | []>([]);

  useEffect(() => {
    dataMessages.forEach((ms) => {
      if (ms.reelId !== null && ms.reelId > 0) {
        // cuidado quando da ctrl + s, ele muda valor lá a mensagem aumenta
        const fetchUserCreateReel = async () => {
          const res = await fetch(`${Url}/post/data/to/message/${ms.reelId}`);

          if (res.status === 200) {
            const json = await res.json();
            const user: InfoUserVideoFrame = json.data;
            setUser((prev) => [user, ...prev]);
          }
        };
        fetchUserCreateReel();
      }
    });
  }, [dataMessages]);

  const [dataReelClicked, setDataReelClicked] = useState<DataMessages | null>(null);

  const handleRedirectToVideo = (message: DataMessages) => {
    setDataReelClicked(message);
  };

  const handleFixMinutes = (mes: DataMessages) => {
    const value =
      new Date(mes.timestamp).getMinutes().toString().length <= 1
        ? `0${new Date(mes.timestamp).getMinutes().toString()}`
        : new Date(mes.timestamp).getMinutes().toString();
    return value;
  };

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
                      {new Date(mes.timestamp).getHours()}:{handleFixMinutes(mes)}
                    </Styled.PTime>
                  </Styled.WrapperTimeMessage>
                  {mes.urlFrameReel == null ? (
                    <Styled.WrapperPMessage $mymessage={mes.senderId === userId ? 'true' : 'false'}>
                      <Styled.P $mymessage={mes.senderId === userId ? 'true' : 'false'}>
                        {mes.content}
                      </Styled.P>
                    </Styled.WrapperPMessage>
                  ) : (
                    <Styled.WrapperImg onClick={() => handleRedirectToVideo(mes)}>
                      <Styled.Img src={mes.urlFrameReel} />
                      {user.length > 0 &&
                        user.map((us, index) => (
                          <Styled.ContainerInfoUserFrame key={index}>
                            {us.id == mes.reelId && (
                              <>
                                <Styled.WrapperImgUserFrame>
                                  <Styled.ImgUserFrame src={us.user.imagePerfil} />
                                </Styled.WrapperImgUserFrame>
                                <Styled.ContainerNameUser>
                                  <Styled.PName>{us.user.name}</Styled.PName>
                                </Styled.ContainerNameUser>
                              </>
                            )}
                          </Styled.ContainerInfoUserFrame>
                        ))}
                      <Styled.Svg>
                        <svg
                          aria-label="Clipe"
                          color="rgb(255, 255, 255)"
                          fill="rgb(255, 255, 255)"
                          height="24"
                          role="img"
                          viewBox="0 0 24 24"
                          width="24"
                        >
                          <path
                            d="m12.823 1 2.974 5.002h-5.58l-2.65-4.971c.206-.013.419-.022.642-.027L8.55 1Zm2.327 0h.298c3.06 0 4.468.754 5.64 1.887a6.007 6.007 0 0 1 1.596 2.82l.07.295h-4.629L15.15 1Zm-9.667.377L7.95 6.002H1.244a6.01 6.01 0 0 1 3.942-4.53Zm9.735 12.834-4.545-2.624a.909.909 0 0 0-1.356.668l-.008.12v5.248a.91.91 0 0 0 1.255.84l.109-.053 4.545-2.624a.909.909 0 0 0 .1-1.507l-.1-.068-4.545-2.624Zm-14.2-6.209h21.964l.015.36.003.189v6.899c0 3.061-.755 4.469-1.888 5.64-1.151 1.114-2.5 1.856-5.33 1.909l-.334.003H8.551c-3.06 0-4.467-.755-5.64-1.889-1.114-1.15-1.854-2.498-1.908-5.33L1 15.45V8.551l.003-.189Z"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                      </Styled.Svg>
                    </Styled.WrapperImg>
                  )}
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

        <ModalReelVideoInfo
          userId={userId}
          connection={connection}
          dataReelClicked={dataReelClicked}
        />
      </Styled.ContainerMainMessageAndTextarea>
    </Styled.ContainerMessage>
  );
};

export default MessageExchange;
