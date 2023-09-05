import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment,
  faPause,
  faPlay,
  faVolumeHigh,
  faVolumeXmark,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import * as Styled from './styled';
import { useState, useEffect, memo, useRef, createContext } from 'react';
import Url from '../../../Utils/Url';
import ImgComment from '../ImgComment/ImgComment';
import PostComments from '../PostComments/PostComments';
import ReactModal from 'react-modal';
import { AllPost, CommentsPost } from '../CardPost/CardPost';

interface CommentProps {
  postComments: AllPost | null;
  userId: number;
  setPostComments: React.Dispatch<React.SetStateAction<AllPost | null>>;
  connection: signalR.HubConnection | null;
  setAllPost: React.Dispatch<React.SetStateAction<AllPost[] | null>>;
  setSeeComments: React.Dispatch<React.SetStateAction<boolean>>;
  seeComments: boolean;
}

export interface Comments {
  id: number;
  text: string;
  createdAt: string;
  user: User;
  subCommentsCounts: number;
  subCommentsCountsMock: number;
  likeCommentsCounts: number;
  likeComments: likeCommentsProps[];
}

interface User {
  id: number;
  name: string;
  imagePerfil: string;
}

interface likeCommentsProps {
  authorId: number;
  commentId: number;
}

export interface contextGlobalPostProps {
  postId: number | null;
  seeComments: boolean;
}

export const contextGlobalPost = createContext<contextGlobalPostProps | null>(null);

const Comment = ({
  postComments,
  userId,
  setPostComments,
  connection,
  setAllPost,
  setSeeComments,
  seeComments,
}: CommentProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const [pause, setPause] = useState(false);
  const [sound, setSound] = useState(false);
  const [postId, setPostId] = useState<number | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const parentsVideo = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (postComments === null) return;
    setPostId(postComments.id);
  }, [postComments]);

  const closeModal = () => {
    console.log(window.innerWidth);
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
    setPostComments(null);
    setSeeComments(false);
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
    <Styled.ContainerMain>
      {postComments && (
        <Styled.ModalOverlay>
          <Styled.ContainerSvgX>
            <FontAwesomeIcon icon={faXmark} onClick={closeModal} />
          </Styled.ContainerSvgX>

          <Styled.ModalContent $isvideo={String(postComments.isImagem == 0)}>
            {postComments.isImagem == 1 && <ImgComment url={postComments.url} />}

            {postComments.isImagem == 0 && (
              <Styled.ContainerVideo ref={parentsVideo}>
                <Styled.Video
                  autoPlay
                  muted={isMuted}
                  ref={videoRef}
                  onLoadedDataCapture={handleLoadedDataCapture}
                >
                  <Styled.Source src={postComments.url} />
                </Styled.Video>

                <Styled.ContainerForAdjustIcon>
                  {pause ? (
                    <Styled.WrapperSvgPauseTrue pause={String(pause)}>
                      <FontAwesomeIcon icon={faPlay} />
                    </Styled.WrapperSvgPauseTrue>
                  ) : (
                    <Styled.WrapperSvgPauseFalse pause={String(pause)}>
                      <FontAwesomeIcon icon={faPause} />
                    </Styled.WrapperSvgPauseFalse>
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
              </Styled.ContainerVideo>
            )}

            <contextGlobalPost.Provider value={{ postId, seeComments }}>
              <PostComments
                dataPost={postComments}
                userId={userId}
                connection={connection}
                setAllPost={setAllPost}
                setPostComments={setPostComments}
              />
            </contextGlobalPost.Provider>
          </Styled.ModalContent>
        </Styled.ModalOverlay>
      )}
    </Styled.ContainerMain>
  );
};
export default Comment;
