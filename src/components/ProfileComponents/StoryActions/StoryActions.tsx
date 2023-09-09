import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Styled from './styled';
import React, { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { faArrowRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import { LastStorySeenProps, StoryProps, jsonPropertyTextProps } from '../InfoProfile/InfoProfile';
import ProgressPassImg from '../ProgressPassImg/ProgressPassImg';
import { DataUserOnlyProps } from '../../../templates/Profile/Profile';

interface StoryActionsProps {
  story: StoryProps[];
  userId: number | null;
  seeStories: boolean;
  dataUserOnly: DataUserOnlyProps | null;
  lastStorySeen: LastStorySeenProps | undefined;
  setSeeStories: React.Dispatch<React.SetStateAction<boolean>>;
  setChoiceStory: React.Dispatch<React.SetStateAction<boolean>>;
  setLastStorySeen: React.Dispatch<React.SetStateAction<LastStorySeenProps | undefined>>;
}

const StoryActions = ({
  story,
  userId,
  seeStories,

  dataUserOnly,
  lastStorySeen,
  setSeeStories,
  setChoiceStory,
  setLastStorySeen,
}: StoryActionsProps) => {
  const [countPixelFill, setCountPixelFill] = useState(1);
  const [progressBar, setProgressBar] = useState<number>(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [completedIndexes, setCompleteIndexes] = useState<number[] | null>([] || null);
  const [pause, setPause] = useState(false);

  useLayoutEffect(() => {
    setCompleteIndexes([]);
    if (lastStorySeen) {
      const index = story.findIndex((x) => x.id == lastStorySeen.storyId);

      setCurrentPhotoIndex(index + 1);
    }
  }, []);

  const handleCloseStories = () => {
    setCurrentPhotoIndex(0);
    setSeeStories((prev) => !prev);
    setCountPixelFill(0);
    setProgressBar(0);
    setCompleteIndexes(null);
  };

  const [jaVerificou, setJaVerificou] = useState(false);

  // let isRequestInProgress = false;

  // const fetchAlreadyVisualized = async (index: number) => {
  //   if (isRequestInProgress) return;

  //   if (story[currentPhotoIndex].id == lastStorySeen?.storyId) return;

  //   const lastStory = story[story.length - 1];

  //   if (lastStorySeen?.storyId == story[index].id) return;

  //   if (lastStory.id == lastStorySeen?.storyId) return;

  //   if (dataUserOnly) {
  //     const idStory = story[index].id;

  //     const connectionVisualized = {
  //       UserViewedId: userId,
  //       UserCreatedPostId: dataUserOnly.id,
  //       StoryId: idStory,
  //     };

  //     isRequestInProgress = true;

  //     try {
  //       const res = await fetch(`${Url}/storycreate`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(connectionVisualized),
  //       });
  //       if (res.status === 200) {
  //         const json = await res.json();
  //         const newVisualized = json.data;
  //         setLastStorySeen((prev) =>
  //           prev !== undefined ? { ...prev, ...newVisualized } : newVisualized
  //         );
  //         setJaVerificou(false);
  //       }
  //     } catch (erro) {
  //       console.error('Erro na requisição:', erro);
  //     } finally {
  //       isRequestInProgress = false;
  //     }
  //   }
  // };

  const handlePassStory = () => {
    setJaVerificou(true);
    setPause(false);
    if (story && story.length > 0) {
      setCurrentPhotoIndex((prevIndex) => {
        const newIndex = prevIndex + 1;

        if (newIndex >= story.length) {
          setChoiceStory(false);
          setSeeStories(false);
          setCompleteIndexes(null);
          setProgressBar(0);
          setCountPixelFill(0);

          // fetchAlreadyVisualized(newIndex - 1);

          return 0;
        } else {
          setProgressBar(0);
          setCountPixelFill(0);
          setCompleteIndexes((prev) =>
            prev !== null && !prev.includes(story[prevIndex].id)
              ? [...prev, story[prevIndex].id]
              : prev
          );

          // fetchAlreadyVisualized(prevIndex);

          return newIndex;
        }
      });
    }
  };

  const handleReturnStory = () => {
    setPause(false);
    if (story && story.length > 0) {
      setProgressBar(0);
      setCountPixelFill(0);
      setCompleteIndexes((prev) =>
        prev !== null
          ? [...prev.filter((index) => index !== story[currentPhotoIndex - 1].id)]
          : prev
      );
      setCurrentPhotoIndex((prevIndex) => {
        if (prevIndex > 0) {
          return prevIndex - 1;
        }
        return prevIndex;
      });
      setProgressBar(0);
      setCountPixelFill(0);
    }
  };

  return (
    <>
      {seeStories && (
        <Styled.ContainerSeeStoriesBackground>
          <Styled.ContainerSubStoriesSee>
            <Styled.ContainerInstagram>
              <Styled.ImgInsta src="https://res.cloudinary.com/dyqsqg7pk/image/upload/v1690543788/Instagram_logoWhite.svg_hnx1mk_sz05th.png" />
            </Styled.ContainerInstagram>
            <Styled.SvgIconExit onClick={handleCloseStories}>
              <FontAwesomeIcon icon={faXmark} className="icon-exit" />
            </Styled.SvgIconExit>

            <ProgressPassImg
              userId={userId}
              story={story}
              pause={pause}
              progressBar={progressBar}
              jaVerificou={jaVerificou}
              dataUserOnly={dataUserOnly}
              lastStorySeen={lastStorySeen}
              countPixelFill={countPixelFill}
              completedIndexes={completedIndexes}
              currentPhotoIndex={currentPhotoIndex}
              setPause={setPause}
              setSeeStories={setSeeStories}
              setJaVerificou={setJaVerificou}
              setChoiceStory={setChoiceStory}
              setLastStorySeen={setLastStorySeen}
              setCountPixelFill={setCountPixelFill}
              setProgressBar={setProgressBar}
              setCompleteIndexes={setCompleteIndexes}
              setCurrentPhotoIndex={setCurrentPhotoIndex}
              //fetchAlreadyVisualized={fetchAlreadyVisualized}
            />

            {/* <Styled.WrapperArrow $arrowdirection="right">
              <FontAwesomeIcon icon={faArrowRight} onClick={handlePassStory} />
            </Styled.WrapperArrow>
            {currentPhotoIndex > 0 && (
              <Styled.WrapperArrow $arrowdirection="left">
                <FontAwesomeIcon icon={faArrowRight} onClick={handleReturnStory} rotation={180} />
              </Styled.WrapperArrow>
            )} */}
          </Styled.ContainerSubStoriesSee>
        </Styled.ContainerSeeStoriesBackground>
      )}
    </>
  );
};

export default React.memo(StoryActions);
