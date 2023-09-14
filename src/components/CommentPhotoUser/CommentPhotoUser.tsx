import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Styled from './styled';
import { faPlay, faVolumeHigh, faVolumeXmark, faXmark } from '@fortawesome/free-solid-svg-icons';
import { DataPost } from '../ProfileComponents/Publications/Publications';
import ImgComment from '../HomePage/ImgComment/ImgComment';
import { useRef, useEffect, useState, useContext } from 'react';
import { ContextProfile, ContextProfileProps } from '../../templates/Profile/Profile';
import * as signalR from '@microsoft/signalr';
import ProfileComments from '../ProfileComments/ProfileComments';
import Url from '../../Utils/Url';

interface CommentPhotoUserProps {
  dataPhotoComments: DataPost | null;
  userId: number | null;
  setDataPhotoComments: React.Dispatch<React.SetStateAction<DataPost | null>>;
}

export interface DataInfoPublicationsProps {
  id: number;
  title: string; // Não tem coloquei por causa do typescript
  url: string;
  user: User;
  postLikes: PostLikes;
  postLikesCounts: number;
  commentsLikes: number;
}

export interface User {
  id: number;
  name: string;
  imagePerfil: string;
}

interface PostLikes {
  PostId: number;
  AuthorId: number;
}

const CommentPhotoUser = ({
  dataPhotoComments,
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

  // const [dataComments, setDataComments] = useState<Comments[]>([]);
  const [showModalComment, setShowModalComment] = useState(false);
  const [dataInfoPublications, setDataInfoPublications] =
    useState<DataInfoPublicationsProps | null>(null);

  useEffect(() => {
    if (dataPhotoComments !== null) {
      const fetchTest = async () => {
        const res = await fetch(`${Url}/post/video/info/${dataPhotoComments.id}`);

        if (res.status === 200) {
          const json = await res.json();
          const data = json.data;
          setDataInfoPublications(data);
          // setShowModalVideo(true);
        }
      };
      fetchTest();
    }
  }, [dataPhotoComments]);

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
              {userId && (
                <ProfileComments
                  userId={userId}
                  dataInfoPublications={dataInfoPublications}
                  connectionHub={connectionHub}
                  showModalComment={showModalComment}
                  setShowModalComment={setShowModalComment}
                  setDataInfoPublications={setDataInfoPublications}
                />
              )}
            </Styled.ModalContent>
          </Styled.ModalOverlay>
        </Styled.ContainerOptionsPosition>
      )}
    </Styled.ContainerMain>
  );
};

export default CommentPhotoUser;
