import { useRef, useState, useEffect } from 'react';
import * as Styled from './styled';
import { useNavigate } from 'react-router-dom';
import SmallModalPerfil from '../SmallModalPerfil/SmallModalPerfil';
import { AllPost, User } from '../CardPost/CardPost';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay, faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';

interface PostCardProps {
  post: AllPost;
  userId: number;
  seeComments: boolean;
}

const PostCard = ({ post, userId, seeComments }: PostCardProps) => {
  // se você voltar aqui e se perguntar porque está funcionando ele entra na div e sair e tals nao se pergunte o eu de agora tbm nao entndeu oque ele fez mais funcionou
  const [showModalPerfil, setShowModalPerfil] = useState(false);
  const showModalTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [idUserPerfil, setIdUserPerfil] = useState<Number | undefined>(undefined);
  const [leaveDiv, setLeaveDiv] = useState(false);
  const [pause, setPause] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [sound, setSound] = useState(false);

  const refVideo = useRef<HTMLVideoElement | null>(null);
  const parentsVideo = useRef<HTMLDivElement | null>(null);

  const nav = useNavigate();
  const handleShowProfile = (postUser: User) => {
    if (postUser) {
      const { id: postCreatorId } = postUser;
      const profileAllPost = true;
      nav('/profile', { state: { postCreatorId, profileAllPost } });
    }
  };

  const handleMouseEnter = (postUser: User) => {
    if (idUserPerfil == undefined) {
      setIdUserPerfil(postUser.id);
    }
    setShowModalPerfil(true);
    setLeaveDiv(false);

    if (showModalTimeoutRef.current) {
      clearTimeout(showModalTimeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    setLeaveDiv(true);

    if (showModalTimeoutRef.current) {
      clearTimeout(showModalTimeoutRef.current);
    }

    if (leaveDiv) return;
    showModalTimeoutRef.current = setTimeout(() => {
      setShowModalPerfil(false);
    }, 400);
  };

  useEffect(() => {
    if (!showModalPerfil) {
      if (showModalTimeoutRef.current) {
        clearTimeout(showModalTimeoutRef.current);
      }
    }
  }, [showModalTimeoutRef, showModalPerfil]);

  useEffect(() => {
    if (parentsVideo.current) {
      parentsVideo.current.addEventListener('mousedown', handleMouseDown);

      // parentsVideo.current.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      if (parentsVideo.current) {
        parentsVideo.current.removeEventListener('mousedown', handleMouseDown);
      }
    };
  }, [parentsVideo]);

  useEffect(() => {
    if (seeComments) {
      if (refVideo.current) {
        if (!refVideo.current.paused) {
          refVideo.current.pause();
          setPause(true);
          return;
        }
      }
    }
  }, [seeComments]);

  const handleMouseDown = () => {
    if (refVideo.current) {
      if (!refVideo.current.paused) {
        refVideo.current.pause();
        setPause(true);
        return;
      } else {
        refVideo.current.play();
        setPause(false);
        return;
      }
    }
  };

  const handleSoundOn = () => {
    setSound(false);
    if (refVideo.current) {
      if (!refVideo.current.paused) {
        refVideo.current.volume = 0;
      } else {
        refVideo.current.volume = 0;
      }
    }
  };

  const handleSoundFalse = () => {
    setSound(true);
    setIsMuted(false);
  };

  useEffect(() => {
    if (sound && refVideo.current && !refVideo.current.paused) {
      refVideo.current.volume = 1;
    }
  }, [pause, sound]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!pause) {
        if (e.code === 'ArrowLeft') {
          if (refVideo.current) {
            refVideo.current.currentTime = refVideo.current.currentTime - 3;
          }
        }

        if (e.code === 'ArrowRight') {
          if (refVideo.current) {
            refVideo.current.currentTime += 1;
          }
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [pause]);

  return (
    <>
      <Styled.ContainerUserInfo>
        <Styled.ContainerImg
          onClick={() => handleShowProfile(post.user)}
          data-testid="img-container"
        >
          <Styled.ImgUser src={post.user.imagePerfil} alt={post.title + ' 1'} />
        </Styled.ContainerImg>
        <Styled.ContainerName
          onMouseEnter={() => handleMouseEnter(post.user)}
          onMouseLeave={handleMouseLeave}
        >
          <Styled.UserNameP onClick={() => handleShowProfile(post.user)}>
            {post.user.name}
          </Styled.UserNameP>
        </Styled.ContainerName>

        {post.user.id == idUserPerfil && showModalPerfil && (
          <SmallModalPerfil
            idUserPerfil={idUserPerfil}
            userId={userId}
            post={post}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
          />
        )}
      </Styled.ContainerUserInfo>
      <Styled.ContainerMainVideo>
        <Styled.ContainerVideo ref={parentsVideo} isimg={String(post.url.includes('image'))}>
          {post.isImagem == 1 && <Styled.ImgPost src={post.url} alt={post.title} />}

          {post.isImagem == 0 && (
            <Styled.Video autoPlay={false} muted={isMuted} ref={refVideo}>
              <Styled.Source src={post.url} type="video/mp4" />
            </Styled.Video>
          )}
          {pause ? (
            <Styled.WrapperSvgPauseTrue pause={String(pause)}>
              <FontAwesomeIcon icon={faPlay} />
            </Styled.WrapperSvgPauseTrue>
          ) : (
            <Styled.WrapperSvgPauseFalse pause={String(pause)}>
              <FontAwesomeIcon icon={faPause} />
            </Styled.WrapperSvgPauseFalse>
          )}
        </Styled.ContainerVideo>
        {post.isImagem == 0 && (
          <Styled.WrapperSound>
            {sound ? (
              <FontAwesomeIcon icon={faVolumeHigh} onClick={handleSoundOn} />
            ) : (
              <FontAwesomeIcon icon={faVolumeXmark} onClick={handleSoundFalse} />
            )}
          </Styled.WrapperSound>
        )}
      </Styled.ContainerMainVideo>
    </>
  );
};

export default PostCard;
