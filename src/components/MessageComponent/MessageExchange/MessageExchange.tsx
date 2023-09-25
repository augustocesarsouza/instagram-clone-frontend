import Url from '../../../Utils/Url';
import { DataMessages, Following } from '../../../templates/Message/Message';
import InfoUserMessage from '../InfoUserMessage/InfoUserMessage';
import * as Styled from './styled';
import { useState, useEffect, useRef } from 'react';
import * as signalR from '@microsoft/signalr';
import 'moment-timezone';
import ModalReelVideoInfo from '../ModalReelVideoInfo/ModalReelVideoInfo';
import SvgAudioIcon from '../SvgAudioIcon/SvgAudioIcon';
import SvgPlayIcon from '../SvgPlayIcon/SvgPlayIcon';
import SvgPauseIcon from '../SvgPauseIcon/SvgPauseIcon';
import SvgExitIcon from '../SvgExitIcon/SvgExitIcon';
import AudioRecordingSendToUser from '../AudioRecordingSendToUser/AudioRecordingSendToUser';

interface MessageExchangeProps {
  userMessage: Following | null;
  userId: number;
  myEmail: string | null;
  connection: signalR.HubConnection | null;
  setPagina: React.Dispatch<React.SetStateAction<number>>;
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

interface AudioCreateProps {
  id: number;
  senderId: number;
  recipientId: number;
  alreadySeeThisMessage: number;
  audioTimeCount: number;
  publicIdAudio: number;
  timestamp: string;
  urlAudio: string;
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
  const [hasValueTextarea, setHasValueTextarea] = useState<boolean>(false);
  const [urlAudio, stUrlAudio] = useState<string | null>(null);
  const [timeCount, setTimeCount] = useState(0);

  const messageContainerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLButtonElement>(null);
  const TextareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleText = () => {
    if (TextareaRef.current === null) return;

    if (TextareaRef.current.value.length > 0) {
      setHasValueTextarea(true);
    } else {
      setHasValueTextarea(false);
    }
  };

  const handleSendMessage = () => {
    if (TextareaRef.current === null) return;
    const text = TextareaRef.current.value;

    const currentTime = new Date();

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
        id: null,
        senderId: userId,
        recipientId: userMessage?.id,
        SenderEmail: myEmail,
        recipientEmail: userMessage.email,
        timestamp: currentTime.toString(),
        content: text,
        alreadySeeThisMessage: 0,
        reelId: null,
        urlFrameReel: null,
        nameUserCreateReel: null,
        imagePerfilUserCreateReel: null,
        urlAudio: null,
        publicIdAudio: null,
        audioTimeCount: null,
      };

      if (connection) {
        connection.invoke('SendMessage', jsonMessageSendHubConnection);

        setDataMessages((prevDataMessages) => [jsonMessageToReact, ...prevDataMessages]);

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
  };

  const [listTimeAudioCadaAudio, setListTimeAudioCadaAudio] = useState<{
    [id: number]: number;
  }>({});

  const handleSendAudio = async () => {
    if (urlAudio === null || userMessage === null) return;
    const currentTime = new Date();

    const number = Math.floor(Math.random() * 100000);
    const arrayNumber: number[] = [];
    if (!arrayNumber.includes(number)) {
      arrayNumber.push(number);

      const jsonMessageAudio = {
        id: number,
        senderId: userId,
        recipientId: userMessage.id,
        SenderEmail: myEmail,
        recipientEmail: userMessage.email,
        content: undefined,
        timestamp: currentTime.toString(),
        alreadySeeThisMessage: 0,
        reelId: null,
        urlFrameReel: null,
        nameUserCreateReel: null,
        imagePerfilUserCreateReel: null,
        urlAudio: urlAudio,
        publicIdAudio: null,
        audioTimeCount: timeCount,
      };

      setListTimeAudioCadaAudio((prev) => {
        if (!prev[number]) {
          return { ...prev, [number]: timeCount };
        }
        return prev;
      });

      setDataMessages((prev) => [jsonMessageAudio, ...prev]);
      stUrlAudio(null);
      setIsRecording(false);
      setTimeCount(0);
    }

    const objCreate = {
      SenderId: userId,
      RecipientId: userMessage.id,
      AudioTimeCount: timeCount,
      UrlAudio: urlAudio,
    };

    const res = await fetch(`${Url}/message/create/audio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objCreate),
    });
    if (res.status === 200) {
      const json = await res.json();
      const data = json.data;

      const jsonMessageAudioHub = {
        id: data.id,
        SenderId: userId,
        RecipientId: userMessage.id,
        SenderEmail: myEmail,
        RecipientEmail: userMessage.email,
        Timestamp: data.timestamp,
        AlreadySeeThisMessage: 0,
        UrlAudio: data.urlAudio,
        PublicIdAudio: data.publicIdAudio,
        AudioTimeCount: timeCount,
      };

      if (connection) {
        connection.invoke('SendAudioMessage', jsonMessageAudioHub);
      }
    }
  };

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
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code == 'Enter' && ref.current !== null) {
      ref.current.click();
    }
  };

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

  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const WrapperSvgAudioRef = useRef<HTMLDivElement | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [startAudioTemp, setStartAudioTemp] = useState(false);
  const timeOutRef = useRef<NodeJS.Timeout | null>(null);
  const [changeTransitionRecord, setChangeTransitionRecord] = useState(false);

  const handleCaptureAudio = async () => {
    if (mediaRecorder && mediaRecorder.state === 'inactive') {
      StartMicrophone();
      setIsRecording(true);
      setStartAudioTemp(true);
      setChangeTransitionRecord(false);
    }
  };

  useEffect(() => {
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }
    if (startAudioTemp) {
      timeOutRef.current = setTimeout(() => {
        setTimeCount((prev) => prev + 1);
      }, 1000);
    }
  }, [startAudioTemp, timeCount]);

  useEffect(() => {
    const func = async () => {
      if (navigator.mediaDevices) {
        await navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then(function (stream) {
            setMediaRecorder(new MediaRecorder(stream));
          })
          .catch(function (error) {
            console.error('Erro ao capturar áudio:', error);
          });
      } else {
        console.error('Seu navegador não suporta a API getUserMedia.');
      }
    };
    func();
  }, []);

  const StartMicrophone = () => {
    if (mediaRecorder === null) return;
    let audioChunks: Blob[] = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/ogg' });

      const reader = new FileReader();

      reader.onload = async (e) => {
        const urlAudio = e.target?.result as string;

        stUrlAudio(urlAudio);
      };

      reader.readAsDataURL(audioBlob);

      audioChunks = [];
    };
    mediaRecorder.start();
  };

  const AudioRef = useRef<HTMLAudioElement | null>(null);
  const [progressAudio, setProgressAudio] = useState(0);
  const [progressPercentageAudio, setProgressPercentageAudio] = useState(-100);
  const [playAudio, setPlayAudio] = useState(false);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    const currentTime = e.currentTarget.currentTime;
    const duration = e.currentTarget.duration;

    var progress = Math.abs(Math.floor(currentTime - timeCount));
    var progressPercentage = Math.floor((currentTime / timeCount) * 100);

    if (progressPercentage <= 106) {
      setProgressPercentageAudio((prev) => {
        const valueSum = progressPercentage - 100;
        const menos = -valueSum;

        return -menos;
      });
    }

    if (progress == 0) {
      setPlayAudio(false);
    }

    setProgressAudio(progress);
  };

  const [timeAudioLessThan30, setTimeAudioLessThan30] = useState(false);

  useEffect(() => {
    if (timeCount <= 30) {
      setTimeAudioLessThan30(true);
    } else {
      setTimeAudioLessThan30(false);
    }

    if (timeCount <= 59) {
      const value = Math.floor((timeCount / 59) * 100);
      setProgressPercentageAudio((prev) => {
        const valueSum = value - 100;
        const menos = -valueSum;
        return -menos;
      });
    }
  }, [timeCount]);

  const handleDeleteAudio = () => {
    stUrlAudio(null);
    setIsRecording(false);
    setTimeCount(0);
  };

  const [listRefAudio, setListRefAudio] = useState<{
    [id: number]: React.RefObject<HTMLAudioElement>;
  }>({});

  const [listTimeAudio, setListTimeAudio] = useState<{
    [id: number]: number;
  }>({});

  const [lastTimePercentageEachAudio, setLastTimePercentageEachAudio] = useState<{
    [id: number]: number;
  }>({});

  const [playAudioBank, setPlayAudioBank] = useState(false);
  const [progressPercentageAudioBank, setProgressPercentageAudioBank] = useState(-100);
  const [timeCountAudioBan, setTimeCountAudioBank] = useState<number | null>(null);
  const [audioIdClick, setAudioIdClick] = useState<number | null>(null);

  const handlePlayAudio = (id: number | null) => {
    if (id === null) return;

    const audio = document.getElementById(`${id}`);

    const audioClick = listRefAudio[id];

    setAudioIdClick(id);
    if (audio === null) return;

    setPlayAudioBank(true);
    audio.play();
  };

  useEffect(() => {
    // console.log(listTimeAudioCadaAudio);
    console.log(lastTimePercentageEachAudio);
  }, [listTimeAudioCadaAudio, timeCountAudioBan, listTimeAudio, lastTimePercentageEachAudio]);

  const handlePauseAudio = (id: number | null) => {
    setListTimeAudioCadaAudio((prev) => {
      if (id) {
        return { ...prev, [id]: timeCountAudioBan };
      }
      return prev;
    });

    setLastTimePercentageEachAudio((prev) => {
      if (id) {
        return { ...prev, [id]: progressPercentageAudioBank };
      }
      return prev;
    });

    if (id === null) return;
    const audio = document.getElementById(`${id}`);
    if (audio === null) return;

    const audioClick = listRefAudio[id];
    setAudioIdClick(id);
    // if (audioClick.current === null) return;

    setPlayAudioBank(false);
    audio.pause();
  };

  const handleTimeUpdateAudioBank = (
    e: React.SyntheticEvent<HTMLAudioElement, Event>,
    id: number | null
  ) => {
    if (id === null) return;

    const currentTime = e.currentTarget.currentTime;

    const timeNumber = listTimeAudio[id];
    const timeOut = currentTime;

    const timeMenos = Math.ceil(timeNumber - timeOut);

    setTimeCountAudioBank(timeMenos);

    var progress = Math.abs(Math.floor(currentTime - timeNumber));
    var progressPercentage = Math.floor((currentTime / timeNumber) * 100);

    if (progressPercentage) {
      setProgressPercentageAudioBank((prev) => {
        const valueSum = progressPercentage - 100;
        const menos = -valueSum;

        return -menos;
      });
    }

    if (timeMenos == 0) {
      setPlayAudio(false);
      setListTimeAudioCadaAudio((prev) => {
        if (prev[id]) {
          return { ...prev, [id]: timeNumber };
        }
        return prev;
      });
    }

    setProgressAudio(progress);
  };

  useEffect(() => {
    dataMessages.forEach((ms) => {
      if (ms.urlAudio && ms.urlAudio.length > 0) {
        // const ref: React.RefObject<HTMLAudioElement> = createRef();
        // setListRefAudio((prev) => {
        //   if (ms.id) {
        //     if (!prev[ms.id]) {
        //       return { ...prev, [ms.id]: ref };
        //     }
        //   }
        //   return prev;
        // });

        setListTimeAudio((prev) => {
          if (ms.audioTimeCount && ms.id) {
            if (!prev[ms.id]) {
              return { ...prev, [ms.id]: ms.audioTimeCount };
            }
          }
          return prev;
        });
      }
    });
  }, [dataMessages]);

  useEffect(() => {
    if (timeCountAudioBan === 0) {
      setTimeout(() => {
        setPlayAudioBank(false);
        setProgressPercentageAudioBank(-100);
      }, 300);
    }
  }, [timeCountAudioBan]);

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
                    <Styled.AdjustPositionAudio
                      $mymessage={mes.senderId == userId ? 'true' : 'false'}
                    >
                      <Styled.WrapperAudio $mymessage={mes.senderId == userId ? 'true' : 'false'}>
                        {mes.id == audioIdClick ? (
                          <Styled.WrapperProgressAudio
                            $progressaudio={progressPercentageAudioBank}
                            $mymessage={mes.senderId == userId ? 'true' : 'false'}
                          ></Styled.WrapperProgressAudio>
                        ) : (
                          <Styled.WrapperProgressAudio
                            $progressaudio={lastTimePercentageEachAudio[mes.id]}
                            $mymessage={mes.senderId == userId ? 'true' : 'false'}
                          ></Styled.WrapperProgressAudio>
                        )}

                        {playAudioBank && mes.id == audioIdClick ? (
                          <Styled.WrapperSvgPlay onClick={() => handlePauseAudio(mes.id)}>
                            <SvgPauseIcon />
                          </Styled.WrapperSvgPlay>
                        ) : (
                          <Styled.WrapperSvgPlay onClick={(e) => handlePlayAudio(mes.id)}>
                            <SvgPlayIcon />
                          </Styled.WrapperSvgPlay>
                        )}

                        {playAudioBank && mes.id && mes.id == audioIdClick ? (
                          <Styled.ContainerSeconds>
                            {timeCountAudioBan == null ? (
                              <Styled.PSeconds>
                                {listTimeAudio[mes.id] &&
                                listTimeAudio[mes.id].toString().length == 1
                                  ? `0:0${listTimeAudio[mes.id]}`
                                  : `0:${listTimeAudio[mes.id]}`}
                              </Styled.PSeconds>
                            ) : (
                              <Styled.PSeconds>
                                {timeCountAudioBan && timeCountAudioBan.toString().length == 1
                                  ? `0:0${timeCountAudioBan}`
                                  : `0:${timeCountAudioBan}`}
                              </Styled.PSeconds>
                            )}
                          </Styled.ContainerSeconds>
                        ) : (
                          <>
                            {timeCountAudioBan == null ? (
                              <Styled.ContainerSeconds>
                                {mes.id && (
                                  <Styled.PSeconds>
                                    {listTimeAudio[mes.id] &&
                                    listTimeAudio[mes.id].toString().length == 1
                                      ? `0:0${listTimeAudio[mes.id]}`
                                      : `0:${listTimeAudio[mes.id]}`}
                                  </Styled.PSeconds>
                                )}
                              </Styled.ContainerSeconds>
                            ) : (
                              <Styled.ContainerSeconds>
                                {mes.id && (
                                  <>
                                    {listTimeAudioCadaAudio[mes.id] !== undefined ? (
                                      <Styled.PSeconds>
                                        {listTimeAudioCadaAudio[mes.id] &&
                                        listTimeAudioCadaAudio[mes.id].toString().length == 1
                                          ? `0:0${listTimeAudioCadaAudio[mes.id]}`
                                          : `0:${listTimeAudioCadaAudio[mes.id]}`}
                                      </Styled.PSeconds>
                                    ) : (
                                      <Styled.PSeconds>
                                        {listTimeAudio[mes.id] &&
                                        listTimeAudio[mes.id].toString().length == 1
                                          ? `0:0${listTimeAudio[mes.id]}`
                                          : `0:${listTimeAudio[mes.id]}`}
                                      </Styled.PSeconds>
                                    )}
                                  </>
                                )}
                              </Styled.ContainerSeconds>
                            )}
                          </>
                        )}
                      </Styled.WrapperAudio>
                      <>
                        {mes.urlAudio && mes.urlAudio.length > 0 && (
                          <div style={{ display: 'none' }}>
                            <audio
                              id={String(mes.id)}
                              controls
                              ref={listRefAudio[mes.id]}
                              onTimeUpdate={(e) => handleTimeUpdateAudioBank(e, mes.id)}
                              preload="auto"
                            >
                              <Styled.Source src={mes.urlAudio} type="audio/ogg" />
                            </audio>
                          </div>
                        )}
                      </>
                    </Styled.AdjustPositionAudio>
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
        {urlAudio && (
          <>
            <div style={{ display: 'none' }}>
              <audio
                controls
                ref={AudioRef}
                onTimeUpdate={(e) => handleTimeUpdate(e)}
                preload="auto"
              >
                <Styled.Source src={urlAudio} type="audio/ogg" />
              </audio>
            </div>
          </>
        )}

        <Styled.ContainerMainText>
          {userMessage && (
            <Styled.WrapperTextarea>
              {isRecording && (
                <Styled.ContainerSvgX onClick={handleDeleteAudio}>
                  <SvgExitIcon />
                </Styled.ContainerSvgX>
              )}
              {isRecording ? (
                <AudioRecordingSendToUser
                  mediaRecorder={mediaRecorder}
                  AudioRef={AudioRef}
                  changeTransitionRecord={changeTransitionRecord}
                  progressPercentageAudio={progressPercentageAudio}
                  playAudio={playAudio}
                  timeAudioLessThan30={timeAudioLessThan30}
                  startAudioTemp={startAudioTemp}
                  progressAudio={progressAudio}
                  timeCount={timeCount}
                  setChangeTransitionRecord={setChangeTransitionRecord}
                  setStartAudioTemp={setStartAudioTemp}
                  setProgressPercentageAudio={setProgressPercentageAudio}
                  setPlayAudio={setPlayAudio}
                />
              ) : (
                <Styled.Textarea
                  ref={TextareaRef}
                  placeholder="Mensagem..."
                  onChange={handleText}
                ></Styled.Textarea>
              )}

              <Styled.WrapperButton>
                {hasValueTextarea || isRecording ? (
                  <>
                    {hasValueTextarea && (
                      <Styled.ButtonSend ref={ref} onClick={handleSendMessage}>
                        Enviar
                      </Styled.ButtonSend>
                    )}

                    {isRecording && (
                      <Styled.ButtonSend ref={ref} onClick={handleSendAudio}>
                        Enviar
                      </Styled.ButtonSend>
                    )}
                  </>
                ) : (
                  <Styled.WrapperSvgAudio onClick={handleCaptureAudio} ref={WrapperSvgAudioRef}>
                    <SvgAudioIcon />
                  </Styled.WrapperSvgAudio>
                )}
              </Styled.WrapperButton>
            </Styled.WrapperTextarea>
          )}
        </Styled.ContainerMainText>

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
