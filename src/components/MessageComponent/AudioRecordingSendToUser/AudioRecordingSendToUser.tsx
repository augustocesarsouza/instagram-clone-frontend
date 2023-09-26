import SvgAudioIcon from '../SvgAudioIcon/SvgAudioIcon';
import SvgExitIcon from '../SvgExitIcon/SvgExitIcon';
import SvgPauseIcon from '../SvgPauseIcon/SvgPauseIcon';
import SvgPlayIcon from '../SvgPlayIcon/SvgPlayIcon';
import SvgStopRecordIcon from '../SvgStopRecordIcon/SvgStopRecordIcon';
import * as Styled from './styled';

interface AudioRecordingSendToUserProps {
  mediaRecorder: MediaRecorder | null;
  AudioRef: React.MutableRefObject<HTMLAudioElement | null>;
  changeTransitionRecord: boolean;
  progressPercentageAudio: number;
  playAudio: boolean;
  timeAudioLessThan30: boolean;
  startAudioTemp: boolean;
  progressAudio: number;
  timeCount: number;
  setChangeTransitionRecord: React.Dispatch<React.SetStateAction<boolean>>;
  setStartAudioTemp: React.Dispatch<React.SetStateAction<boolean>>;
  setProgressPercentageAudio: React.Dispatch<React.SetStateAction<number>>;
  setPlayAudio: React.Dispatch<React.SetStateAction<boolean>>;
}

const AudioRecordingSendToUser = ({
  mediaRecorder,
  AudioRef,
  changeTransitionRecord,
  progressPercentageAudio,
  playAudio,
  timeAudioLessThan30,
  startAudioTemp,
  progressAudio,
  timeCount,
  setChangeTransitionRecord,
  setStartAudioTemp,
  setProgressPercentageAudio,
  setPlayAudio,
}: AudioRecordingSendToUserProps) => {
  const handleStopRecordAudio = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
    }
    setChangeTransitionRecord(true);
    setStartAudioTemp(false);
    setProgressPercentageAudio(-100);
  };

  const handlePlayAudio = () => {
    if (AudioRef.current === null) return;
    AudioRef.current.play();
    setPlayAudio(true);
  };

  const handlePauseAudio = () => {
    if (AudioRef.current === null) return;

    AudioRef.current.pause();
    setPlayAudio(false);
  };

  return (
    <>
      <Styled.ContainerAudioStarted>
        {changeTransitionRecord ? (
          <Styled.WrapperProgressAudioRecordTrue
            $progressaudio={progressPercentageAudio}
            $playaudio={String(playAudio)}
            $changetransitionrecord={String(changeTransitionRecord)}
            $timeaudiolessthan30={String(timeAudioLessThan30)}
          ></Styled.WrapperProgressAudioRecordTrue>
        ) : (
          <Styled.WrapperProgressAudio
            $progressaudio={progressPercentageAudio}
            $playaudio={String(playAudio)}
            $changetransitionrecord={String(changeTransitionRecord)}
            $timeaudiolessthan30={String(timeAudioLessThan30)}
          ></Styled.WrapperProgressAudio>
        )}

        {!startAudioTemp ? (
          <>
            {playAudio ? (
              <Styled.WrapperSvgPlay onClick={handlePauseAudio}>
                <SvgPauseIcon />
              </Styled.WrapperSvgPlay>
            ) : (
              <Styled.WrapperSvgPlay onClick={handlePlayAudio}>
                <SvgPlayIcon />
              </Styled.WrapperSvgPlay>
            )}
          </>
        ) : (
          <Styled.WrapperSvgPlay onClick={handleStopRecordAudio}>
            <SvgStopRecordIcon />
          </Styled.WrapperSvgPlay>
        )}

        <Styled.ContainerSeconds>
          {playAudio || progressAudio ? (
            <Styled.PSeconds>
              {progressAudio.toString().length == 1 ? `0:0${progressAudio}` : `0:${progressAudio}`}
            </Styled.PSeconds>
          ) : (
            <Styled.PSeconds>
              {timeCount.toString().length == 1 ? `0:0${timeCount}` : `0:${timeCount}`}
            </Styled.PSeconds>
          )}
        </Styled.ContainerSeconds>
      </Styled.ContainerAudioStarted>
    </>
  );
};

export default AudioRecordingSendToUser;
