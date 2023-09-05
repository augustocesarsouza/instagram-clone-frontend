import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Styled from './styled';
import { faPlay, faVolumeHigh, faVolumeXmark, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Comments } from '../PhotoUser/PhotoUser';
import { DataPost } from '../ProfileComponents/Publications/Publications';
import ImgComment from '../HomePage/ImgComment/ImgComment';
import PostComments from '../HomePage/PostComments/PostComments';
import { useRef, useEffect, useState, useContext } from 'react';
import { ContextProfile, ContextProfileProps } from '../../templates/Profile/Profile';
import * as signalR from '@microsoft/signalr';

interface CommentPhotoUserProps {
  showModalComment: boolean;
  setShowModalComment: React.Dispatch<React.SetStateAction<boolean>>;
  dataComments: Comments[];
  dataPhotoComments: DataPost | null;
  userId: number | null;
  callFetchMethod: (value: {}) => void;
  setDataPhotoComments: React.Dispatch<React.SetStateAction<DataPost | null>>;
}

const CommentPhotoUser = ({
  showModalComment,
  setShowModalComment,
  dataComments,
  dataPhotoComments,
  callFetchMethod,
  userId,
  setDataPhotoComments,
}: CommentPhotoUserProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const [pause, setPause] = useState(false);
  const [sound, setSound] = useState(false);
  const [connectionHub, setConnectionHub] = useState<signalR.HubConnection | null>(null);

  const useContextProfile = useContext<ContextProfileProps | null>(ContextProfile);

  const parentRef = useRef<HTMLDivElement | null>(null);
  const VideoRef = useRef<HTMLVideoElement | null>(null);

  const [videoLoaded, setVideoLoaded] = useState(false);
  const [mouseEnterAndLeave, setMouseEnterAndLeave] = useState(false);

  useEffect(() => {
    if (useContextProfile !== null) {
      const { connection } = useContextProfile;
      if (connection !== null) {
        setConnectionHub(connection);
      }
    }
  }, [useContextProfile]);

  const closeModal = () => {
    setDataPhotoComments(null);
    setShowModalComment(false);
    enableBodyScroll();
    setIsMuted(true);
    setPause(false);
    setVideoLoaded(false);
    VideoRef.current = null;
    document.body.style.overflow = '';
  };

  const disableBodyScroll = () => {
    document.body.style.overflow = 'hidden';
  };

  const enableBodyScroll = () => {
    document.body.style.overflow = '';
  };

  useEffect(() => {
    if (dataPhotoComments) {
      document.body.style.overflow = 'hidden';
    }
    if (parentRef.current === null) return;
    if (mouseEnterAndLeave === true) return;

    parentRef.current.addEventListener('mousedown', handleMouseDown);

    return () => {
      if (parentRef.current === null) return;
      parentRef.current.removeEventListener('mousedown', handleMouseDown);
    };
  }, [parentRef, videoLoaded, mouseEnterAndLeave, dataPhotoComments]);

  const handleOnLoadedMetadata = () => {
    setVideoLoaded(true);
  };

  const handleMouseDown = () => {
    if (VideoRef.current === null) return;

    if (!VideoRef.current.paused) {
      VideoRef.current.pause();
      setPause(true);
      return;
    } else {
      VideoRef.current.play();
      setPause(false);
      return;
    }
  };

  const handleSoundOn = () => {
    setSound(false);
    if (VideoRef.current === null) return;

    if (!VideoRef.current.paused) {
      VideoRef.current.volume = 0;
    } else {
      VideoRef.current.volume = 0;
    }
  };

  const handleSoundFalse = () => {
    setSound(true);
    setIsMuted(false);
  };

  useEffect(() => {
    if (VideoRef.current === null) return;

    if (sound && !VideoRef.current.paused) {
      VideoRef.current.volume = 1;
    }
  }, [sound, pause]);

  const handleMouseEnter = () => {
    setMouseEnterAndLeave(true);
  };

  const handleMouseLeave = () => {
    setMouseEnterAndLeave(false);
  };

  return (
    <Styled.ContainerMain>
      {dataPhotoComments && (
        <Styled.ContainerOptionsPosition>
          <Styled.ModalOverlay>
            <Styled.ContainerSvgExit>
              <FontAwesomeIcon icon={faXmark} onClick={closeModal} />
            </Styled.ContainerSvgExit>
            <Styled.ModalContent $isvideo={String(dataPhotoComments.isImagem == 0)}>
              {dataPhotoComments && dataPhotoComments.isImagem == 1 && (
                <ImgComment url={dataPhotoComments.url} />
              )}
              {dataPhotoComments && dataPhotoComments.isImagem == 0 && (
                <Styled.WrapperVideo ref={parentRef}>
                  <Styled.Video
                    autoPlay
                    muted={isMuted}
                    ref={VideoRef}
                    onLoadedMetadata={handleOnLoadedMetadata}
                    id="video-reference"
                  >
                    <Styled.Source src={dataPhotoComments.url} />
                  </Styled.Video>
                  <Styled.ContainerForAdjustIcon>
                    {pause && (
                      <Styled.WrapperVideoIcon $pause={String(pause)}>
                        <FontAwesomeIcon icon={faPlay} />
                      </Styled.WrapperVideoIcon>
                    )}
                  </Styled.ContainerForAdjustIcon>

                  <Styled.WrapperSound
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {sound ? (
                      <FontAwesomeIcon icon={faVolumeHigh} onClick={handleSoundOn} />
                    ) : (
                      <FontAwesomeIcon icon={faVolumeXmark} onClick={handleSoundFalse} />
                    )}
                  </Styled.WrapperSound>
                </Styled.WrapperVideo>
              )}
              <PostComments
                dataPost={dataPhotoComments}
                showModalComment={showModalComment}
                dataComments={dataComments}
                userId={userId}
                connection={connectionHub}
              />
            </Styled.ModalContent>
          </Styled.ModalOverlay>
        </Styled.ContainerOptionsPosition>
      )}
    </Styled.ContainerMain>
  );
};

export default CommentPhotoUser;
