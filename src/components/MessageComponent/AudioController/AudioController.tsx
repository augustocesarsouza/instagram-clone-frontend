import { DataMessages } from '../../../templates/Message/Message';
import { listAudioInfoProps } from '../MessageExchange/MessageExchange';
import SvgPauseIcon from '../SvgPauseIcon/SvgPauseIcon';
import SvgPlayIcon from '../SvgPlayIcon/SvgPlayIcon';
import * as Styled from './styled';
import { useState, useEffect } from 'react';

interface AudioControllerProps {
  mes: DataMessages;
  userId: number;
  listAudioInfo: listAudioInfoProps[];
  dataMessages: DataMessages[];
  setListAudioInfo: React.Dispatch<React.SetStateAction<listAudioInfoProps[]>>;
}

const AudioController = ({
  mes,
  userId,
  listAudioInfo,
  dataMessages,
  setListAudioInfo,
}: AudioControllerProps) => {
  const [playAudioBank, setPlayAudioBank] = useState(false);
  const [progressPercentageAudioBank, setProgressPercentageAudioBank] = useState(-100);
  const [timeCountAudioBan, setTimeCountAudioBank] = useState<number | null>(null);
  const [audioIdClick, setAudioIdClick] = useState<number | null>(null);

  // const [listAudioInfo, setListAudioInfo] = useState<listAudioInfoProps[]>([]);

  const handlePlayAudio = (id: number | null) => {
    if (id === null) return;

    const audio = document.getElementById(`${id}`);

    setAudioIdClick(id);
    if (audio === null) return;

    setPlayAudioBank(true);
    audio.play();
  };

  const handlePauseAudio = (id: number | null) => {
    if (id === null || timeCountAudioBan === null) return;

    setListAudioInfo((prev) =>
      prev.map((aud) => (aud.id == id ? { ...aud, lastTimeAudio: timeCountAudioBan } : aud))
    );

    setListAudioInfo((prev) =>
      prev.map((aud) =>
        aud.id == id ? { ...aud, percentageAudio: progressPercentageAudioBank } : aud
      )
    );

    if (id === null) return;
    const audio = document.getElementById(`${id}`);
    if (audio === null) return;

    setAudioIdClick(id);

    setPlayAudioBank(false);
    audio.pause();
  };

  const handleTimeUpdateAudioBank = (
    e: React.SyntheticEvent<HTMLAudioElement, Event>,
    mesa: DataMessages
  ) => {
    const { id, audioTimeCount } = mesa;
    if (id === null || audioTimeCount === null) return;

    const currentTime = e.currentTarget.currentTime;

    const timeNumber = audioTimeCount;
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

    if (progressPercentage >= 100) {
      setListAudioInfo((prev) =>
        prev.map((aud) =>
          aud.id == id ? { ...aud, lastTimeAudio: null, percentageAudio: -100 } : aud
        )
      );
    }
  };

  useEffect(() => {
    if (listAudioInfo.length > 0) return;

    dataMessages.forEach((ms) => {
      if (ms.urlAudio && ms.urlAudio.length > 0 && ms.audioTimeCount !== null && ms.id !== null) {
        const obj = {
          id: ms.id,
          timeTotalAudio: ms.audioTimeCount,
          lastTimeAudio: null,
          percentageAudio: -100,
        };

        setListAudioInfo((prev) => {
          var array = prev;

          if (!array.find((x) => x.id == ms.id)) {
            return [obj, ...prev];
          }
          return array;
        });
      }
    });
  }, [dataMessages, listAudioInfo]);

  useEffect(() => {
    if (timeCountAudioBan === 0) {
      setTimeout(() => {
        setPlayAudioBank(false);
        setProgressPercentageAudioBank(-100);
      }, 300);
    }
  }, [timeCountAudioBan]);

  return (
    <>
      {listAudioInfo.map((lis) => (
        <Styled.AdjustPositionAudio
          key={lis.id}
          $mymessage={mes.senderId == userId ? 'true' : 'false'}
        >
          {lis.id == mes.id && (
            <Styled.WrapperAudio $mymessage={mes.senderId == userId ? 'true' : 'false'}>
              {mes.id == audioIdClick ? (
                <Styled.WrapperProgressAudio
                  $progressaudio={progressPercentageAudioBank}
                  $mymessage={mes.senderId == userId ? 'true' : 'false'}
                ></Styled.WrapperProgressAudio>
              ) : (
                <Styled.WrapperProgressAudio
                  $progressaudio={lis.percentageAudio}
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
                      {lis.timeTotalAudio.toString().length == 1
                        ? `0:0${lis.timeTotalAudio}`
                        : `0:${lis.timeTotalAudio}`}
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
                  <Styled.ContainerSeconds>
                    {mes.id && (
                      <>
                        {lis.lastTimeAudio !== null ? (
                          <Styled.PSeconds>
                            {lis.lastTimeAudio && lis.lastTimeAudio.toString().length == 1
                              ? `0:0${lis.lastTimeAudio}`
                              : `0:${lis.lastTimeAudio}`}
                          </Styled.PSeconds>
                        ) : (
                          <Styled.PSeconds>
                            {lis.timeTotalAudio.toString().length == 1
                              ? `0:0${lis.timeTotalAudio}`
                              : `0:${lis.timeTotalAudio}`}
                          </Styled.PSeconds>
                        )}
                      </>
                    )}
                  </Styled.ContainerSeconds>
                  {/* )} */}
                </>
              )}
              <>
                <div style={{ display: 'none' }}>
                  <audio
                    id={String(mes.id)}
                    controls
                    onTimeUpdate={(e) => handleTimeUpdateAudioBank(e, mes)}
                    preload="auto"
                  >
                    <Styled.Source src={mes.urlAudio} type="audio/ogg" />
                  </audio>
                </div>
              </>
            </Styled.WrapperAudio>
          )}
        </Styled.AdjustPositionAudio>
      ))}
    </>
  );
};

export default AudioController;
