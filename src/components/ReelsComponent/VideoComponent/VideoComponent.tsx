import * as Styled from './styled';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { ListReels, VideoObjReelProps } from '../../../templates/Reels/Reels';
import ShareReels from '../ShareReels/ShareReels';

interface VideoComponentProps {
  ree: ListReels;
  index: number;
  sound: boolean;
  isMuted: boolean;
  listReels: ListReels[] | null;
  ContainerRef: React.RefObject<HTMLDivElement | null>;
  mouseOn: React.RefObject<boolean>;
  userId: number | null;
  setShowShareReels: React.Dispatch<React.SetStateAction<boolean>>;
  showShareReels: boolean;
  videoReels: VideoObjReelProps | null;
}

const VideoComponent = ({
  ree,
  index,
  sound,
  isMuted,
  listReels,
  ContainerRef,
  mouseOn,
  userId,
  setShowShareReels,
  showShareReels,
  videoReels,
}: VideoComponentProps) => {
  const [pause, setPause] = useState(false);
  const [indexVideo, setIndexVideo] = useState(0);
  const [videoPaused, setVideoPaused] = useState<{ [key: number]: boolean } | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const y = useRef(0);
  const [isScrollBlocked, setIsScrollBlocked] = useState(true);
  const [isScrollBlockedUp, setIsScrollBlockedUp] = useState(true);
  const timeOutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    setPause(true);

    const scrollEvent = (e: WheelEvent) => {
      if (mouseOn.current) return;

      if (e.deltaY < 0) {
        if (!pause) {
          videoRef.current?.pause();
        }
        if (ContainerRef === null || ContainerRef.current === null) return;
        if (!isScrollBlocked) return;

        if (y.current == 0) {
          setIsScrollBlocked(true);
          return;
        }

        if (isScrollBlockedUp) {
          if (timeOutRef.current) {
            clearTimeout(timeOutRef.current);
          }

          y.current = y.current - 810;

          ContainerRef.current.scrollTo({
            top: y.current,
            behavior: 'smooth',
          });
          setIsScrollBlockedUp(false);
          timeOutRef.current = setTimeout(() => {
            setIsScrollBlockedUp(true);
          }, 500);

          setIndexVideo((prev) => (prev === 0 ? prev : prev - 1));
        }

        //Up
      } else if (e.deltaY > 0) {
        if (ContainerRef === null || ContainerRef.current === null || listReels === null) return;
        if (!isScrollBlocked || indexVideo === listReels.length - 1) return;

        if (!pause) {
          videoRef.current?.pause();
        }

        if (isScrollBlocked) {
          if (timeOutRef.current) {
            clearTimeout(timeOutRef.current);
          }

          if (indexVideo < listReels.length - 1) {
            y.current = y.current + 810; //810

            setIndexVideo((prev) => prev + 1);

            ContainerRef.current.scrollTo({
              top: y.current,
              behavior: 'smooth',
            });

            setIsScrollBlocked(false);
            timeOutRef.current = setTimeout(() => {
              setIsScrollBlocked(true);
              setIsScrollBlockedUp(true);
            }, 500);
          }
        }
        //Down
      }
    };
    if (ContainerRef === null || ContainerRef.current === null || listReels === null) return;
    ContainerRef.current.addEventListener('wheel', scrollEvent, { passive: true });

    return () => {
      if (ContainerRef === null || ContainerRef.current === null || listReels === null) return;
      ContainerRef.current.removeEventListener('wheel', scrollEvent);
    };
  }, [
    ContainerRef.current,
    listReels,
    y,
    indexVideo,
    timeOutRef,
    isScrollBlocked,
    isScrollBlockedUp,
    videoRef,
    pause,
  ]);

  const [mouseEnterDivShareReels, setMouseEnterDivShareReels] = useState(false);

  useEffect(() => {
    if (sound && videoRef.current && !videoRef.current.paused) {
      videoRef.current.volume = 1;
    }

    if (sound && videoRef.current && videoRef.current.paused) {
      videoRef.current.volume = 1;
    }

    if (!sound && videoRef.current && videoRef.current.paused) {
      videoRef.current.volume = 0;
    }
  }, [pause, sound]);

  const handlePauseVideo = () => {
    if (mouseEnterDivShareReels) return;

    if (pause) {
      setPause(false);
      setVideoPaused((prev) => ({
        ...(prev || {}),
        [indexVideo]: prev ? (prev[indexVideo] === undefined ? false : false) : false,
      }));
    } else {
      setPause(true);
      setVideoPaused((prev) => ({
        ...(prev || {}),
        [indexVideo]: prev ? (prev[indexVideo] === undefined ? true : true) : true,
      }));
    }
  };

  useEffect(() => {
    if (videoPaused && videoPaused[indexVideo]) {
      videoRef.current?.pause();

      setPause(true);
      return;
    } else {
      videoRef.current?.play();
      setPause(false);
    }

    if (pause) {
      if (videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
      }
    } else {
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.play();
      }
    }
  }, [videoRef, pause, indexVideo]);

  useEffect(() => {
    if (!sound && videoRef.current) {
      videoRef.current.volume = 0;
    }
  }, [videoRef, indexVideo, pause, sound]);

  return (
    <Styled.WrapperMainSvgVideo
      onClick={handlePauseVideo}
      $entereddivshare={String(mouseEnterDivShareReels)}
    >
      <Styled.WrapperVideo>
        {ree && (
          <Styled.Video id="video-get" ref={index === indexVideo ? videoRef : null} muted={isMuted}>
            <Styled.Source src={ree.url} type="video/mp4" />
          </Styled.Video>
        )}

        {indexVideo === index && (
          <Styled.ContainerClickButton>
            {pause && (
              <Styled.WrapperSvg $svg="pause" $pause={String(pause)}>
                <FontAwesomeIcon icon={faPlay} />
              </Styled.WrapperSvg>
            )}
          </Styled.ContainerClickButton>
        )}

        <Styled.ContainerMainInfoUser>
          <Styled.ContainerImgAndName>
            <Styled.ContainerImgUser>
              <Styled.Img src={ree.user.imagePerfil} />
            </Styled.ContainerImgUser>
            <Styled.Paragraph $para="name">{ree.user.name}</Styled.Paragraph>
          </Styled.ContainerImgAndName>
          <Styled.ContainerTitle>
            <Styled.Paragraph $para="title">{ree.title}</Styled.Paragraph>
          </Styled.ContainerTitle>
        </Styled.ContainerMainInfoUser>
      </Styled.WrapperVideo>
      <ShareReels
        userId={userId}
        reels={ree}
        videoReels={videoReels}
        showShareReels={showShareReels}
        videoRef={videoRef.current}
        setShowShareReels={setShowShareReels}
        setMouseEnterDivShareReels={setMouseEnterDivShareReels}
      />
    </Styled.WrapperMainSvgVideo>
  );
};

export default VideoComponent;
