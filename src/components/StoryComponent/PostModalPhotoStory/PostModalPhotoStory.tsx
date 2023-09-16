import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Styled from './styled';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useState, useContext } from 'react';
import Url from '../../../Utils/Url';
import { AllPost } from '../../HomePage/CardPost/CardPost';
import {
  ContextModalSharePhoto,
  ContextModalSharePhotoProps,
  ImgProcess,
} from '../ModalShareStory/ModalShareStory';
import { StoryProps } from '../../ProfileComponents/InfoProfile/InfoProfile';

interface PostModalPhotoStoryProps {
  imgData: ImgProcess | undefined;
  userId: number | null;
  imgGeneratedByCanvas: string;
  showShare: boolean;
  decreaseDiv: boolean;
  setShowShare: React.Dispatch<React.SetStateAction<boolean>>;
  setDecreaseDiv: React.Dispatch<React.SetStateAction<boolean>>;
  handlePublish: () => void;
  handleModalDiscardPost: () => void;
  setStory: React.Dispatch<React.SetStateAction<StoryProps[]>>;
  setNewStory: React.Dispatch<React.SetStateAction<boolean>>;
  setShowStoryCircle: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostModalPhotoStory = ({
  imgData,
  userId,
  imgGeneratedByCanvas,
  showShare,
  decreaseDiv,
  setShowShare,
  setDecreaseDiv,
  handlePublish,
  handleModalDiscardPost,
  setStory,
  setNewStory,
  setShowStoryCircle,
}: PostModalPhotoStoryProps) => {
  const [showIconSuccess, setShowIconSuccess] = useState(false);

  const contextModalSharePhoto = useContext<ContextModalSharePhotoProps | null>(
    ContextModalSharePhoto
  );
  const { setCreateNewStory, createPost } = contextModalSharePhoto;

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
          <Styled.P $paragr="p1">Story Publicado</Styled.P>
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
              <Styled.buttonGo onClick={handleShareStory}>Compartilhar Story</Styled.buttonGo>
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
              <Styled.PShared>Seu Story foi Criado.</Styled.PShared>
            </Styled.ContainerSharedPost>
          )}
        </Styled.BallWrapper>
      )}
    </Styled.ContainerContentAdvanced>
  );
};

export default PostModalPhotoStory;
