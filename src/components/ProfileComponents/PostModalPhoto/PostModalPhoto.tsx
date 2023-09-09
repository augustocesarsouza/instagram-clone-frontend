import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Styled from './styled';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useState, useContext } from 'react';
import Url from '../../../Utils/Url';
import { StoryProps } from '../InfoProfile/InfoProfile';
import {
  ContextModalSharePhoto,
  ContextModalSharePhotoProps,
  ImgProcess,
} from '../ModalSharePhoto/ModalSharePhoto';
import { AllPost } from '../../HomePage/CardPost/CardPost';

interface PostModalPhotoProps {
  text: string;
  imgData: ImgProcess | undefined;
  selectedImagem: string | null;
  userId: number | null;
  imgGeneratedByCanvas: string;
  showShare: boolean;
  decreaseDiv: boolean;
  //createPost: boolean;
  setShowShare: React.Dispatch<React.SetStateAction<boolean>>;
  setDecreaseDiv: React.Dispatch<React.SetStateAction<boolean>>;
  handlePublish: () => void;
  handleModalDiscardPost: () => void;
  setStory: React.Dispatch<React.SetStateAction<StoryProps[]>>;
  setNewStory: React.Dispatch<React.SetStateAction<boolean>>;
  setShowStoryCircle: React.Dispatch<React.SetStateAction<boolean>>;
  setCreateImgOrVideo: React.Dispatch<React.SetStateAction<AllPost | null>>;
}

const PostModalPhoto = ({
  text,
  imgData,
  selectedImagem,
  userId,
  imgGeneratedByCanvas,
  showShare,
  decreaseDiv,
  //createPost,
  setShowShare,
  setDecreaseDiv,
  handlePublish,
  handleModalDiscardPost,
  setStory,
  setNewStory,
  setShowStoryCircle,
  setCreateImgOrVideo,
}: PostModalPhotoProps) => {
  const [showIconSuccess, setShowIconSuccess] = useState(false);

  const contextModalSharePhoto = useContext<ContextModalSharePhotoProps | null>(
    ContextModalSharePhoto
  );
  const { setCreateNewStory, createPost } = contextModalSharePhoto;

  const handleShare = async () => {
    const JsonPost = {
      Title: text,
      Url: selectedImagem,
      AuthorId: userId,
    };

    setDecreaseDiv(true);
    setShowShare(false);

    const res = await fetch(`${Url}/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(JsonPost),
    });

    if (res.status === 200) {
      const json = await res.json();
      setCreateImgOrVideo(json.data);
      setShowIconSuccess(true);
      setCreateNewStory(false);
    }
  };

  const handleShareStory = async () => {
    if (imgData === undefined) return;
    const createStory = {
      Url: imgGeneratedByCanvas,
      AuthorId: userId,
      publicId: imgData.publicId,
      isImagem: imgData.isImagem,
    };

    setDecreaseDiv(true);
    setShowShare(false);

    const res = await fetch(`${Url}/story`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createStory),
    });

    if (res.status === 200) {
      const json = await res.json();
      setShowStoryCircle(true);
      setShowIconSuccess(true);
      setNewStory(true);
      setStory((prev) => [...prev, json.data]);
      setCreateNewStory(false);
    }
  };

  return (
    <Styled.ContainerContentAdvanced
      $extende={String(showShare)}
      $decrease={String(decreaseDiv)}
      $createstory={String(!createPost)}
    >
      <Styled.ContainerCreatePost $decrease={String(decreaseDiv)}>
        {showIconSuccess ? (
          !createPost ? (
            <Styled.P $paragr="p1">Story Publicado</Styled.P>
          ) : (
            <Styled.P $paragr="p1">Publicação compartilhada</Styled.P>
          )
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
              !createPost ? (
                <Styled.buttonGo onClick={handleShareStory}>Compartilhar Story</Styled.buttonGo>
              ) : (
                <Styled.buttonGo onClick={handleShare}>Compartilhar</Styled.buttonGo>
              )
            ) : (
              <Styled.buttonGo onClick={handlePublish}>Avançar</Styled.buttonGo>
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

export default PostModalPhoto;
