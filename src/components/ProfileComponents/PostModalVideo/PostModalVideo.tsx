import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Styled from './styled';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useState, useContext } from 'react';
import Url from '../../../Utils/Url';
import {
  ContextModalSharePhoto,
  ContextModalSharePhotoProps,
} from '../ModalSharePhoto/ModalSharePhoto';
import { useLocation } from 'react-router-dom';

interface PostModalVideoProps {
  text: string;
  userId: number | null;
  showShare: boolean;
  moveVideoY: number;
  decreaseDiv: boolean;
  selectedVideo: string | null;
  sendVideoToBack: boolean;
  setShowShare: React.Dispatch<React.SetStateAction<boolean>>;
  handlePublish: (value: boolean) => void;
  setDecreaseDiv: React.Dispatch<React.SetStateAction<boolean>>;
  setSendVideoToBack: React.Dispatch<React.SetStateAction<boolean>>;
  handleModalDiscardPost: () => void;
  handleGenerateImgVideoFrame: () => string | undefined;
}
interface ReturnPostCreateVideo {
  id: number;
  url: string;
  imgFrameVideoUrl: string | null;
  isImagem: number;
}

interface ReturnPostCreateVideoToHomePage {
  id: number;
  title: string;
  url: string;
  isImagem: number;
  user: User;
  postLikesCounts: number;
  commentsLikes: number;
  postLikes: PostLikes[];
}

interface PostLikes {
  id: number;
  postId: number;
  authorId: number;
}

export interface User {
  id: number;
  name: string;
  imagePerfil: string;
}

const PostModalVideo = ({
  text,
  userId,
  showShare,
  moveVideoY,
  decreaseDiv,
  selectedVideo,
  sendVideoToBack,
  setShowShare,
  handlePublish,
  setDecreaseDiv,
  setSendVideoToBack,
  handleModalDiscardPost,
  handleGenerateImgVideoFrame,
}: PostModalVideoProps) => {
  const [showIconSuccess, setShowIconSuccess] = useState(false);

  const contextModalSharePhoto = useContext<ContextModalSharePhotoProps | null>(
    ContextModalSharePhoto
  );
  const { createPost } = contextModalSharePhoto;
  const location = useLocation();

  const handleShare = async () => {
    const imageGeneratedByCanvasBase64 = handleGenerateImgVideoFrame();
    if (imageGeneratedByCanvasBase64 === undefined || contextModalSharePhoto === null) return;

    const { setCreateImgOrVideoForAllPost, setCreateImgOrVideoForProfile } = contextModalSharePhoto;
    var isProfile = false;
    if (location.pathname === '/profile') {
      isProfile = true;
    }

    setShowShare(true);
    setSendVideoToBack(true);
    const JsonPost = {
      Title: text,
      Url: selectedVideo,
      AuthorId: userId,
      ImgFrameVideoUrl: imageGeneratedByCanvasBase64,
    };
    setDecreaseDiv(true);
    // setShowShare(false);

    const res = await fetch(`${Url}/post/create/video/${Math.floor(moveVideoY)}/${isProfile}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(JsonPost),
    });

    if (res.status === 200) {
      const json = await res.json();

      if (isProfile) {
        const data: ReturnPostCreateVideo = json.data;
        setCreateImgOrVideoForProfile(data);
      } else {
        const data: ReturnPostCreateVideoToHomePage = json.data;

        setCreateImgOrVideoForAllPost(data);
      }

      setShowIconSuccess(true);
      // setShowModalShare(false);
      document.body.style.overflow = '';
    }
  };

  return (
    <Styled.ContainerContentAdvanced
      $extende={String(showShare)}
      $decrease={String(decreaseDiv)}
      $sendvideotoback={String(sendVideoToBack)}
      $createstory={String(!createPost)} // quando falso estou criando um story
    >
      <Styled.ContainerCreatePost
        $decrease={String(decreaseDiv)}
        $sendvideotoback={String(sendVideoToBack)}
      >
        {showIconSuccess ? (
          <Styled.P $paragr="p1">Publicação compartilhada</Styled.P>
        ) : decreaseDiv ? (
          <Styled.P $paragr="p1">Compartilhando</Styled.P>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              fill="currentColor"
              viewBox="0 0 16 16"
              onClick={handleModalDiscardPost}
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
            {!createPost ? (
              <Styled.P $paragr="p1"></Styled.P>
            ) : (
              <Styled.P $paragr="p1">Corta</Styled.P>
            )}
          </>
        )}
        {decreaseDiv ? (
          <></>
        ) : (
          <>
            {showShare ? (
              <Styled.buttonGo onClick={handleShare}>Compartilhar</Styled.buttonGo>
            ) : (
              <Styled.buttonGo onClick={() => handlePublish(!createPost)}>Avançar</Styled.buttonGo>
            )}
          </>
        )}
      </Styled.ContainerCreatePost>

      {decreaseDiv && (
        <Styled.BallWrapper>
          <Styled.BouncingBorder $stopspin={String(showIconSuccess)} />
          <Styled.BallCenter>
            {showIconSuccess && <FontAwesomeIcon icon={faCheck} style={{ color: '#E91E63' }} />}
          </Styled.BallCenter>
          {showIconSuccess && (
            <Styled.ContainerSharedPost $createstory={String(!createPost)}>
              {!createPost ? (
                <Styled.PShared>Seu Story foi Criado.</Styled.PShared>
              ) : (
                <Styled.PShared>Sua publicação foi compartilhada.</Styled.PShared>
              )}
            </Styled.ContainerSharedPost>
          )}
        </Styled.BallWrapper>
      )}
    </Styled.ContainerContentAdvanced>
  );
};

export default PostModalVideo;
