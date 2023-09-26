import { useEffect, useRef, useState } from 'react';
import AudioRecordingSendToUser from '../AudioRecordingSendToUser/AudioRecordingSendToUser';
import SvgAudioIcon from '../SvgAudioIcon/SvgAudioIcon';
import SvgExitIcon from '../SvgExitIcon/SvgExitIcon';
import * as Styled from './styled';
import Url from '../../../Utils/Url';
import { DataMessages, Following } from '../../../templates/Message/Message';
import { listAudioInfoProps } from '../MessageExchange/MessageExchange';

interface SendMessageAndAudioProps {
  userMessage: Following | null;
  myEmail: string | null;
  userId: number;
  connection: signalR.HubConnection | null;
  dataMessages: DataMessages[];
  messageContainerRef: React.RefObject<HTMLDivElement>;
  setDataMessages: React.Dispatch<React.SetStateAction<DataMessages[]>>;
  setListAudioInfo: React.Dispatch<React.SetStateAction<listAudioInfoProps[]>>;
}

const SendMessageAndAudio = ({
  userMessage,
  myEmail,
  userId,
  connection,
  dataMessages,
  messageContainerRef,
  setDataMessages,
  setListAudioInfo,
}: SendMessageAndAudioProps) => {
  const AudioRef = useRef<HTMLAudioElement | null>(null);
  const [progressAudio, setProgressAudio] = useState(0);
  const [progressPercentageAudio, setProgressPercentageAudio] = useState(-100);
  const [playAudio, setPlayAudio] = useState(false);
  const TextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [urlAudio, stUrlAudio] = useState<string | null>(null);
  const [timeCount, setTimeCount] = useState(0);
  const ref = useRef<HTMLButtonElement>(null);
  const [isRecording, setIsRecording] = useState(false);

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

  const handleSendAudio = async () => {
    if (urlAudio === null || userMessage === null) return;
    const currentTime = new Date();

    const id = dataMessages[0].id;
    if (id === null) return;

    const jsonMessageAudio = {
      id: id + 1,
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

    const obj = {
      id: jsonMessageAudio.id,
      timeTotalAudio: jsonMessageAudio.audioTimeCount,
      lastTimeAudio: null,
      percentageAudio: -100,
    };

    setListAudioInfo((prev) => [obj, ...prev]);
    setDataMessages((prev) => [jsonMessageAudio, ...prev]);
    stUrlAudio(null);
    setIsRecording(false);
    setTimeCount(0);

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

  const [hasValueTextarea, setHasValueTextarea] = useState<boolean>(false);
  const handleText = () => {
    if (TextareaRef.current === null) return;

    if (TextareaRef.current.value.length > 0) {
      setHasValueTextarea(true);
    } else {
      setHasValueTextarea(false);
    }
  };

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
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
    }
    stUrlAudio(null);
    setIsRecording(false);
    setStartAudioTemp(false);
    setTimeCount(0);
  };

  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const WrapperSvgAudioRef = useRef<HTMLDivElement | null>(null);

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

    if (connection && userMessage) {
      const email = userMessage.email;

      connection.invoke('RecordingAudio', email, startAudioTemp);
    }

    if (startAudioTemp) {
      timeOutRef.current = setTimeout(() => {
        setTimeCount((prev) => prev + 1);
      }, 1000);
    } else {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }
    }
  }, [startAudioTemp, timeCount, connection, userMessage]);

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

  return (
    <>
      {urlAudio && (
        <>
          <div style={{ display: 'none' }}>
            <audio controls ref={AudioRef} onTimeUpdate={(e) => handleTimeUpdate(e)} preload="auto">
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
    </>
  );
};

export default SendMessageAndAudio;
