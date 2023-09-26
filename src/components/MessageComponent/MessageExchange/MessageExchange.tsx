import Url from '../../../Utils/Url';
import { DataMessages, Following } from '../../../templates/Message/Message';
import InfoUserMessage from '../InfoUserMessage/InfoUserMessage';
import * as Styled from './styled';
import { useState, useEffect, useRef } from 'react';
import * as signalR from '@microsoft/signalr';
import 'moment-timezone';
import ModalReelVideoInfo from '../ModalReelVideoInfo/ModalReelVideoInfo';
import SvgPlayIcon from '../SvgPlayIcon/SvgPlayIcon';
import SvgPauseIcon from '../SvgPauseIcon/SvgPauseIcon';
import SendMessageAndAudio from '../SendMessageAndAudio/SendMessageAndAudio';
import AudioController from '../AudioController/AudioController';

interface MessageExchangeProps {
  userMessage: Following | null;
  userId: number;
  myEmail: string | null;
  connection: signalR.HubConnection | null;
  setPagina: React.Dispatch<React.SetStateAction<number>>;
  setDataMessages: React.Dispatch<React.SetStateAction<DataMessages[]>>;
  dataMessages: DataMessages[];
}

export interface VideoObjReelProps {
  id: number;
  imgFrameVideoUrl: string;
  user: User;
}

interface User {
  id: number;
  imagePerfil: string;
  name: string;
}

export interface listAudioInfoProps {
  id: number;
  timeTotalAudio: number;
  lastTimeAudio: number | null;
  percentageAudio: number;
}

const MessageExchange = ({
  userMessage,
  userId,
  myEmail,
  connection,
  setPagina,
  setDataMessages,
  dataMessages,
}: MessageExchangeProps) => {
  const messageContainerRef = useRef<HTMLDivElement>(null);

  // const [hasValueTextarea, setHasValueTextarea] = useState<boolean>(false);
  // const handleText = () => {
  //   if (TextareaRef.current === null) return;

  //   if (TextareaRef.current.value.length > 0) {
  //     setHasValueTextarea(true);
  //   } else {
  //     setHasValueTextarea(false);
  //   }
  // };

  // const handleSendMessage = () => {
  //   if (TextareaRef.current === null) return;
  //   const text = TextareaRef.current.value;

  //   const currentTime = new Date();

  //   if (userMessage !== null && myEmail !== null) {
  //     const jsonMessageSendHubConnection = {
  //       senderId: userId,
  //       recipientId: userMessage?.id,
  //       SenderEmail: myEmail,
  //       recipientEmail: userMessage.email,
  //       timestamp: null,
  //       content: text,
  //       reelId: null,
  //       urlFrameReel: null,
  //       publicIdFrameReel: null,
  //     };

  //     const jsonMessageToReact = {
  //       id: null,
  //       senderId: userId,
  //       recipientId: userMessage?.id,
  //       SenderEmail: myEmail,
  //       recipientEmail: userMessage.email,
  //       timestamp: currentTime.toString(),
  //       content: text,
  //       alreadySeeThisMessage: 0,
  //       reelId: null,
  //       urlFrameReel: null,
  //       nameUserCreateReel: null,
  //       imagePerfilUserCreateReel: null,
  //       urlAudio: null,
  //       publicIdAudio: null,
  //       audioTimeCount: null,
  //     };

  //     if (connection) {
  //       connection.invoke('SendMessage', jsonMessageSendHubConnection);

  //       setDataMessages((prevDataMessages) => [jsonMessageToReact, ...prevDataMessages]);

  //       setTimeout(() => {
  //         if (messageContainerRef.current) {
  //           messageContainerRef.current.scrollTo({
  //             top: messageContainerRef.current.scrollHeight,
  //             behavior: 'auto',
  //           });
  //         }
  //       }, 50);
  //     }
  //   }
  // };

  // const handleSendAudio = async () => {
  //   if (urlAudio === null || userMessage === null) return;
  //   const currentTime = new Date();

  //   const id = dataMessages[0].id;
  //   if (id === null) return;

  //   const jsonMessageAudio = {
  //     id: id + 1,
  //     senderId: userId,
  //     recipientId: userMessage.id,
  //     SenderEmail: myEmail,
  //     recipientEmail: userMessage.email,
  //     content: undefined,
  //     timestamp: currentTime.toString(),
  //     alreadySeeThisMessage: 0,
  //     reelId: null,
  //     urlFrameReel: null,
  //     nameUserCreateReel: null,
  //     imagePerfilUserCreateReel: null,
  //     urlAudio: urlAudio,
  //     publicIdAudio: null,
  //     audioTimeCount: timeCount,
  //   };

  //   // setListTimeAudioCadaAudio((prev) => {
  //   //   if (!prev[number]) {
  //   //     return { ...prev, [number]: timeCount };
  //   //   }
  //   //   return prev;
  //   // });

  //   setDataMessages((prev) => [jsonMessageAudio, ...prev]);
  //   stUrlAudio(null);
  //   setIsRecording(false);
  //   setTimeCount(0);

  //   const objCreate = {
  //     SenderId: userId,
  //     RecipientId: userMessage.id,
  //     AudioTimeCount: timeCount,
  //     UrlAudio: urlAudio,
  //   };

  //   const res = await fetch(`${Url}/message/create/audio`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(objCreate),
  //   });
  //   if (res.status === 200) {
  //     const json = await res.json();
  //     const data = json.data;

  //     const jsonMessageAudioHub = {
  //       id: data.id,
  //       SenderId: userId,
  //       RecipientId: userMessage.id,
  //       SenderEmail: myEmail,
  //       RecipientEmail: userMessage.email,
  //       Timestamp: data.timestamp,
  //       AlreadySeeThisMessage: 0,
  //       UrlAudio: data.urlAudio,
  //       PublicIdAudio: data.publicIdAudio,
  //       AudioTimeCount: timeCount,
  //     };

  //     if (connection) {
  //       connection.invoke('SendAudioMessage', jsonMessageAudioHub);
  //     }
  //   }
  // };

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

  const fetchUpdateMessageViewed = async (messa: DataMessages) => {
    const res = await fetch(`${Url}/message/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messa),
    });

    if (res.status === 200) {
      const json = await res.json();
      const data: DataMessages = json.data;

      setDataMessages((prev) => {
        if (prev.length === 0) {
          return prev;
        }

        const firstMessage = {
          ...prev[0],
          alreadySeeThisMessage: prev[0].alreadySeeThisMessage + 1,
        };

        const messageUpdate = [firstMessage, ...prev.slice(1)];

        return messageUpdate;
      });

      if (connection === null || data === undefined) return;

      connection.invoke('ConfirmAlreadySeeMessage', data);
    }
  };

  useEffect(() => {
    if (dataMessages.length <= 0) return;

    if (userId !== dataMessages[0].senderId) {
      if (dataMessages[0].alreadySeeThisMessage == 0) {
        fetchUpdateMessageViewed(dataMessages[0]);
        return;
      }
    }
  }, [dataMessages]);

  const handleGetDayOfWeek = (mes: DataMessages): string => {
    const dateTimeNew = new Date(mes.timestamp);
    switch (dateTimeNew.getDay()) {
      case 0:
        return 'Dom, ';
      case 1:
        return 'Seg, ';
      case 2:
        return 'Ter, ';
      case 3:
        return 'Qua, ';
      case 4:
        return 'Qui, ';
      case 5:
        return 'Sex, ';
      case 6:
        return 'Sab, ';
      default:
        break;
    }
    return 'NA';
  };

  const [listAudioInfo, setListAudioInfo] = useState<listAudioInfoProps[]>([]);

  return (
    <Styled.ContainerMessage>
      <InfoUserMessage
        userMessage={userMessage}
        connection={connection}
        setDataMessages={setDataMessages}
        setListAudioInfo={setListAudioInfo}
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
                      {handleGetDayOfWeek(mes)}
                      {new Date(mes.timestamp).getHours()}:{handleFixMinutes(mes)}
                    </Styled.PTime>
                  </Styled.WrapperTimeMessage>

                  {mes.content && mes.content.length > 0 && (
                    <Styled.WrapperPMessage $mymessage={mes.senderId === userId ? 'true' : 'false'}>
                      {mes.senderId === userMessage.id && (
                        <Styled.WrapperImgUserCreateComment>
                          <Styled.ImgUserCreateComment src={userMessage.imagePerfil} />
                        </Styled.WrapperImgUserCreateComment>
                      )}
                      <Styled.P $mymessage={mes.senderId === userId ? 'true' : 'false'}>
                        {mes.content}
                      </Styled.P>
                    </Styled.WrapperPMessage>
                  )}

                  {mes.urlAudio && mes.urlAudio.length > 0 ? (
                    <AudioController
                      mes={mes}
                      userId={userId}
                      listAudioInfo={listAudioInfo}
                      dataMessages={dataMessages}
                      setListAudioInfo={setListAudioInfo}
                    />
                  ) : (
                    <></>
                  )}

                  <>
                    {mes.reelId && mes.reelId > 0 ? (
                      <Styled.ContainerAdjustPositionMessage
                        $mymessage={mes.senderId === userId ? 'true' : 'false'}
                      >
                        <Styled.WrapperMainCreateComment>
                          {mes.senderId === userMessage.id && (
                            <Styled.WrapperImgUserCreateComment>
                              <Styled.ImgUserCreateComment src={userMessage.imagePerfil} />
                            </Styled.WrapperImgUserCreateComment>
                          )}
                        </Styled.WrapperMainCreateComment>
                        <Styled.WrapperImg onClick={() => handleRedirectToVideo(mes)}>
                          <Styled.Img src={mes.urlFrameReel} />
                          {mes.imagePerfilUserCreateReel !== null &&
                            mes.nameUserCreateReel !== null && (
                              <Styled.ContainerInfoUserFrame key={index}>
                                <>
                                  <Styled.WrapperImgUserFrame>
                                    <Styled.ImgUserFrame src={mes.imagePerfilUserCreateReel} />
                                  </Styled.WrapperImgUserFrame>
                                  <Styled.ContainerNameUser>
                                    <Styled.PName>{mes.nameUserCreateReel}</Styled.PName>
                                  </Styled.ContainerNameUser>
                                </>
                              </Styled.ContainerInfoUserFrame>
                            )}
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
                      </Styled.ContainerAdjustPositionMessage>
                    ) : (
                      <></>
                    )}
                  </>
                </Styled.WrapperAllParagraph>
              </Styled.WrapperMessage>
            ))}
        </Styled.ContainerMainMessage>

        <SendMessageAndAudio
          userMessage={userMessage}
          myEmail={myEmail}
          userId={userId}
          connection={connection}
          dataMessages={dataMessages}
          messageContainerRef={messageContainerRef}
          setDataMessages={setDataMessages}
          setListAudioInfo={setListAudioInfo}
        />

        <ModalReelVideoInfo
          userId={userId}
          connection={connection}
          dataReelClicked={dataReelClicked}
          setDataReelClicked={setDataReelClicked}
        />
      </Styled.ContainerMainMessageAndTextarea>
    </Styled.ContainerMessage>
  );
};

export default MessageExchange;
