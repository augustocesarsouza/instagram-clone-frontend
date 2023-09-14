import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Styled from './styled';
import { useEffect, useRef, useState } from 'react';
import {
  faPause,
  faPlay,
  faVolumeHigh,
  faVolumeXmark,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import ReelComments from '../ReelComments/ReelComments';
import Url from '../../../Utils/Url';
import { DataMessages } from '../../../templates/Message/Message';

interface ModalReelVideoInfoProps {
  userId: number;
  connection: signalR.HubConnection | null;
  dataReelClicked: DataMessages | null;
}

export interface DataReelVideoProps {
  id: number;
  title: string; // Não tem coloquei por causa do typescript
  url: string;
  user: UserReel;
  postLikes: PostLikes;
  postLikesCounts: number;
  commentsLikes: number;
}

export interface UserReel {
  id: number;
  name: string;
  imagePerfil: string;
}

interface PostLikes {
  PostId: number;
  AuthorId: number;
}

const ModalReelVideoInfo = ({ userId, connection, dataReelClicked }: ModalReelVideoInfoProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const [pause, setPause] = useState(false);
  const [sound, setSound] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const parentsVideo = useRef<HTMLDivElement | null>(null);
  const [showModalVideo, setShowModalVideo] = useState(false);
  const [dataReelVideo, setDataReelVideo] = useState<DataReelVideoProps | null>(null);
  const [seeComments, setSeeComments] = useState(false);

  useEffect(() => {
    if (dataReelClicked !== null) {
      const fetchTest = async () => {
        const res = await fetch(`${Url}/post/video/info/${dataReelClicked.reelId}`);

        if (res.status === 200) {
          const json = await res.json();
          const data = json.data;
          setDataReelVideo(data);
          setShowModalVideo(true);
        }
      };
      fetchTest();
    }
  }, [dataReelClicked]);

  const closeModal = () => {
    setShowModalVideo(false);
    const scroll = document.getElementById('container-scroll');

    if (window.innerWidth <= 750) {
      // document.body.style.overflow = 'hidden';
      // if (scroll) {
      //   scroll.style.overflowY = 'hidden';
      // }
      if (scroll) {
        scroll.style.overflowY = 'auto';
      }
    } else {
      if (scroll) {
        scroll.style.overflowY = 'auto';
      }
    }

    enableBodyScroll();
    // setPostComments(null);
    // setSeeComments(false);
  };

  const enableBodyScroll = () => {
    document.body.style.overflow = '';
  };

  const [videoLoaded, setVideoLoaded] = useState(false);
  const [mouseEnterAndLeave, setMouseEnterAndLeave] = useState(false);

  useEffect(() => {
    if (mouseEnterAndLeave) return;

    if (parentsVideo.current) {
      parentsVideo.current.addEventListener('mousedown', handleMouseDown);
    }

    return () => {
      if (parentsVideo.current) {
        parentsVideo.current.removeEventListener('mousedown', handleMouseDown);
      }
    };
  }, [parentsVideo, videoLoaded, mouseEnterAndLeave]);

  const handleLoadedDataCapture = () => {
    setVideoLoaded(true);
  };

  const handleMouseDown = () => {
    if (videoRef.current) {
      if (!videoRef.current.paused) {
        videoRef.current.pause();
        setPause(true);
        return;
      } else {
        videoRef.current.play();
        setPause(false);
        return;
      }
    }
  };

  const handleSoundOn = () => {
    setSound(false);
    if (videoRef.current) {
      if (!videoRef.current.paused) {
        videoRef.current.volume = 0;
      } else {
        videoRef.current.volume = 0;
      }
    }
  };

  const handleSoundFalse = () => {
    setSound(true);
    setIsMuted(false);
  };

  useEffect(() => {
    if (sound && videoRef.current && !videoRef.current.paused) {
      videoRef.current.volume = 1;
    }
  }, [pause, sound]);

  const handleMouseEnter = () => {
    setMouseEnterAndLeave(true);
  };

  const handleMouseLeave = () => {
    setMouseEnterAndLeave(false);
  };

  return (
    <>
      {showModalVideo && (
        <Styled.ModalOverlay>
          <Styled.ContainerSvgX>
            <FontAwesomeIcon icon={faXmark} onClick={closeModal} />
          </Styled.ContainerSvgX>

          <Styled.ModalContent $isvideo={'true'}>
            <Styled.ContainerVideo ref={parentsVideo}>
              <Styled.Video
                autoPlay
                muted={isMuted}
                ref={videoRef}
                onLoadedDataCapture={handleLoadedDataCapture}
              >
                <Styled.Source src={dataReelVideo?.url} />
              </Styled.Video>

              <Styled.ContainerForAdjustIcon>
                {pause ? (
                  <Styled.WrapperSvgPauseTrue $pause={String(pause)}>
                    <FontAwesomeIcon icon={faPlay} />
                  </Styled.WrapperSvgPauseTrue>
                ) : (
                  <Styled.WrapperSvgPauseFalse $pause={String(pause)}>
                    <FontAwesomeIcon icon={faPause} />
                  </Styled.WrapperSvgPauseFalse>
                )}
              </Styled.ContainerForAdjustIcon>

              <Styled.WrapperSound onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {sound ? (
                  <FontAwesomeIcon icon={faVolumeHigh} onClick={handleSoundOn} />
                ) : (
                  <FontAwesomeIcon icon={faVolumeXmark} onClick={handleSoundFalse} />
                )}
              </Styled.WrapperSound>
            </Styled.ContainerVideo>

            <ReelComments
              userId={userId}
              dataReelVideo={dataReelVideo}
              connection={connection}
              seeComments={seeComments}
              setSeeComments={setSeeComments}
              setDataReelVideo={setDataReelVideo}
            />
          </Styled.ModalContent>
        </Styled.ModalOverlay>
      )}
    </>
  );
};

export default ModalReelVideoInfo;
