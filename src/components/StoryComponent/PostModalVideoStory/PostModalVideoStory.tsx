import * as Styled from './styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useContext } from 'react';
import Url from '../../../Utils/Url';
import {
  ContextModalSharePhoto,
  ContextModalSharePhotoProps,
} from '../ModalShareStory/ModalShareStory';
import { StoryProps, jsonPropertyTextProps } from '../../ProfileComponents/InfoProfile/InfoProfile';

interface PostModalVideoStoryProps {
  userId: number | null;
  showShare: boolean;
  decreaseDiv: boolean;
  selectedVideo: string | null;
  jsonPropertyText: jsonPropertyTextProps | {};
  setStory: React.Dispatch<React.SetStateAction<StoryProps[]>>;
  setNewStory: React.Dispatch<React.SetStateAction<boolean>>;
  setShowShare: React.Dispatch<React.SetStateAction<boolean>>;
  setDecreaseDiv: React.Dispatch<React.SetStateAction<boolean>>;
  handlePublish: (value: boolean) => void;
  setShowStoryCircle: React.Dispatch<React.SetStateAction<boolean>>;
  handleModalDiscardPost: () => void;
}

const PostModalVideoStory = ({
  userId,
  showShare,
  decreaseDiv,
  selectedVideo,
  jsonPropertyText,
  setStory,
  setNewStory,
  setShowShare,
  handlePublish,
  setDecreaseDiv,
  setShowStoryCircle,
  handleModalDiscardPost,
}: PostModalVideoStoryProps) => {
  const [showIconSuccess, setShowIconSuccess] = useState(false);

  const contextModalSharePhoto = useContext<ContextModalSharePhotoProps | null>(
    ContextModalSharePhoto
  );
  const { setCreateNewStory, createPost } = contextModalSharePhoto;

  const handleShareStory = async () => {
    const createStory = {
      Url: selectedVideo,
      AuthorId: userId,
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
      const storyIdRet: number = json.data.id;

      setStory((prev) => [...prev, { ...json.data, propertyText: jsonPropertyText }]);
      setShowIconSuccess(true);
      // setShowModalShare(false);
      setShowStoryCircle(true);
      setNewStory(true);
      fetchCreatePropertyText(storyIdRet);
      setCreateNewStory(false);
    }
  };

  const fetchCreatePropertyText = async (storyId: number) => {
    if (storyId > 0) {
      const res = await fetch(`${Url}/createpropstory/${storyId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonPropertyText),
      });

      if (res.status === 200) {
        const json = await res.json();

        setStory((prev) =>
          prev !== null
            ? prev.map((sto) =>
                sto.id == storyId ? { ...sto, propertyText: { ...json.data } } : sto
              )
            : prev
        );
      }
    }
  };

  return (
    <Styled.ContainerContentAdvanced>
      <Styled.ContainerCreatePost>
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
            <Styled.ContainerSharedPost>
              <Styled.PShared>Seu Story foi Criado.</Styled.PShared>
            </Styled.ContainerSharedPost>
          )}
        </Styled.BallWrapper>
      )}
    </Styled.ContainerContentAdvanced>
  );
};

export default PostModalVideoStory;
