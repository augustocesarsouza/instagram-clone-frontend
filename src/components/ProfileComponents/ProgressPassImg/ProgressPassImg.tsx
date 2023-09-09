import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LastStorySeenProps, StoryProps, jsonPropertyTextProps } from '../InfoProfile/InfoProfile';
import * as Styled from './styled';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  faArrowRight,
  faEllipsis,
  faPause,
  faPlay,
  faVolumeHigh,
  faVolumeXmark,
} from '@fortawesome/free-solid-svg-icons';
import { DataUserOnlyProps } from '../../../templates/Profile/Profile';
import Url from '../../../Utils/Url';

interface ProgressPassImgProps {
  userId: number | null;
  story: StoryProps[];
  pause: boolean;
  jaVerificou: boolean;
  dataUserOnly: DataUserOnlyProps | null;
  lastStorySeen: LastStorySeenProps | undefined;
  progressBar: number;
  countPixelFill: number;
  completedIndexes: number[] | null;
  currentPhotoIndex: number;
  setPause: React.Dispatch<React.SetStateAction<boolean>>;
  setCountPixelFill: React.Dispatch<React.SetStateAction<number>>;
  setProgressBar: React.Dispatch<React.SetStateAction<number>>;
  setCompleteIndexes: React.Dispatch<React.SetStateAction<number[] | null>>;
  setCurrentPhotoIndex: React.Dispatch<React.SetStateAction<number>>;
  setChoiceStory: React.Dispatch<React.SetStateAction<boolean>>;
  setJaVerificou: React.Dispatch<React.SetStateAction<boolean>>;
  setSeeStories: React.Dispatch<React.SetStateAction<boolean>>;
  setLastStorySeen: React.Dispatch<React.SetStateAction<LastStorySeenProps | undefined>>;

  // fetchAlreadyVisualized: (index: number) => Promise<void>;
}

const ProgressPassImg = ({
  userId,
  story,
  pause,
  jaVerificou,
  dataUserOnly,
  progressBar,
  lastStorySeen,
  countPixelFill,
  completedIndexes,
  currentPhotoIndex,
  setPause,
  setSeeStories,
  setProgressBar,
  setChoiceStory,
  setJaVerificou,
  setLastStorySeen,
  setCountPixelFill,
  setCompleteIndexes,
  setCurrentPhotoIndex,
}: //fetchAlreadyVisualized,
ProgressPassImgProps) => {
  const [sound, setSound] = useState(false);
  const [widthDivProgressBar, setWidthDivProgressBar] = useState<number>(9999);
  const [isImgOrVideo, setIsImgOrVideo] = useState<number>(story[currentPhotoIndex].isImagem);

  const ref = useRef<HTMLDivElement | null>(null);
  const timeOutRef = useRef<NodeJS.Timeout | null>(null);
  const refDivLength = useRef<HTMLDivElement | null>(null);
  const refVideo = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (refDivLength.current) {
      setWidthDivProgressBar(refDivLength.current.clientWidth);
    }
  }, [refDivLength, story]);

  useEffect(() => {
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }
    if (story[currentPhotoIndex]?.isImagem == 1) {
      if (countPixelFill <= widthDivProgressBar) {
        if (pause) {
          return;
        } else {
          timeOutRef.current = setTimeout(() => {
            setCountPixelFill((prev) => prev + 1);
          }, 60);
        }
      }

      if (countPixelFill === widthDivProgressBar) {
        setCurrentPhotoIndex((prevIndex) => {
          setCompleteIndexes((prev) => (prev !== null ? [...prev, story[prevIndex].id] : prev));

          const newIndex = prevIndex + 1;

          if (newIndex >= story.length) {
            setChoiceStory(false);
            setSeeStories(false);
            setCompleteIndexes(null);
            setCountPixelFill(1);
            setCurrentPhotoIndex(0);

            fetchAlreadyVisualized(newIndex - 1);

            return 0;
          } else {
            fetchAlreadyVisualized(prevIndex);

            return newIndex;
          }
        });

        setCountPixelFill(1);
      }
    } else {
      if (pause) {
        return;
      }

      if (progressBar === 100) {
        setCurrentPhotoIndex((prevIndex) => {
          setCompleteIndexes((prev) => (prev !== null ? [...prev, story[prevIndex].id] : prev));

          const newIndex = prevIndex + 1;

          if (newIndex >= story.length) {
            setChoiceStory(false);
            setSeeStories(false);
            setCompleteIndexes(null);
            // setCountPixelFill(1);
            setProgressBar(0);
            setCurrentPhotoIndex(0);

            fetchAlreadyVisualized(newIndex - 1);

            return 0;
          } else {
            fetchAlreadyVisualized(prevIndex);

            return newIndex;
          }
        });

        // setCountPixelFill(1);
        setProgressBar(0);
      }
    }
  }, [
    countPixelFill,
    pause,
    refDivLength,
    story,
    isImgOrVideo,
    jaVerificou,
    currentPhotoIndex,
    progressBar,
  ]);

  let isRequestInProgress = false;

  const fetchAlreadyVisualized = async (index: number) => {
    if (isRequestInProgress) return;

    if (story[currentPhotoIndex]?.id == lastStorySeen?.storyId) return;

    const lastStory = story[story.length - 1];

    if (lastStorySeen?.storyId == story[index].id) return;

    if (lastStory.id == lastStorySeen?.storyId) return;

    if (dataUserOnly) {
      const idStory = story[index].id;

      const connectionVisualized = {
        UserViewedId: userId,
        UserCreatedPostId: dataUserOnly.id,
        StoryId: idStory,
      };

      isRequestInProgress = true;

      try {
        const res = await fetch(`${Url}/storycreate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(connectionVisualized),
        });
        if (res.status === 200) {
          const json = await res.json();
          const newVisualized = json.data;
          setLastStorySeen((prev) =>
            prev !== undefined ? { ...prev, ...newVisualized } : newVisualized
          );
          setJaVerificou(false);
        }
      } catch (erro) {
        console.error('Erro na requisição:', erro);
      } finally {
        isRequestInProgress = false;
      }
    }
  };

  useEffect(() => {
    if (story && story.length > 0) {
      const lastStory = story[story.length - 1];
      if (lastStory.id == lastStorySeen?.storyId) {
        setCurrentPhotoIndex(0);
        setJaVerificou(true);
        return;
      }

      var lastIndexVisu = 0;
      for (let i = 0; i <= story.length; i++) {
        if (lastStorySeen == undefined) {
          setCurrentPhotoIndex(0);
          setJaVerificou(true);
          break;
        } else {
          setCompleteIndexes((prev) => (prev !== null ? [...prev, story[i].id] : prev));
          if (story[i].id === lastStorySeen.storyId) {
            lastIndexVisu = i;
            lastIndexVisu++;
            break;
          }
        }
      }

      if (lastIndexVisu > 0) {
        setCurrentPhotoIndex(lastIndexVisu);
        setJaVerificou(true);
      }
    }
  }, [story]);

  useEffect(() => {
    if (jaVerificou) {
      fetchAlreadyVisualized(currentPhotoIndex);
    }
  }, [currentPhotoIndex, jaVerificou]);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('mousedown', handleMouseDown);
      ref.current.addEventListener('mouseup', handleMouseUp);
    }
  }, [ref.current]);

  const handleMouseDown = () => {
    setPause(true);
  };

  const handleMouseUp = () => {
    setPause(false);
  };

  useEffect(() => {
    if (pause) {
      if (refVideo.current && !refVideo.current.paused) {
        refVideo.current.pause();
      }
    } else {
      if (refVideo.current && refVideo.current.paused) {
        refVideo.current.play();
        refVideo.current.volume = 0;
      }
    }
  }, [refVideo, pause]);

  useLayoutEffect(() => {
    if (jaVerificou) {
      if (story[currentPhotoIndex]) {
        const storyVideoOrImg = story[currentPhotoIndex].isImagem;

        setIsImgOrVideo(storyVideoOrImg);
      }
    }
  }, [currentPhotoIndex, story, jaVerificou]);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    var currentTime = e.currentTarget.currentTime;
    var duration = e.currentTarget.duration;

    var progress = Math.floor((currentTime / duration) * 100);
    setProgressBar(progress);
  };

  const handleSoundOn = () => {
    setSound(false);
    if (refVideo.current) {
      if (!refVideo.current.paused) {
        refVideo.current.volume = 0;
      }
    }
  };

  const [isMute, setIsMuted] = useState(true);

  const handleSoundFalse = () => {
    setSound(true);
    setIsMuted(false);
  };

  useEffect(() => {
    if (sound && refVideo.current && !refVideo.current.paused) {
      refVideo.current.volume = 1;
    }
  }, [pause, sound]);

  const handlePauseOn = () => {
    setPause(false);
  };

  const handlePauseOff = () => {
    setPause(true);
  };

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
      {story && (
        <Styled.ContainerSee>
          <Styled.ContainerImgAndIcon>
            <Styled.Line>
              <Styled.ContainerProgressBar>
                {story.map((sto, index) => (
                  <Styled.ContainerBackgroundBlack key={sto.id} ref={refDivLength}>
                    <Styled.LineBlack
                      $imgorvideo={isImgOrVideo}
                      $progress={progressBar}
                      $countpx={countPixelFill}
                      $idphoto={sto.id}
                      $currentphotoindex={currentPhotoIndex}
                      $story={story}
                      $completedindexes={completedIndexes}
                      $widthdivprogressbar={widthDivProgressBar}
                    ></Styled.LineBlack>
                  </Styled.ContainerBackgroundBlack>
                ))}
              </Styled.ContainerProgressBar>

              <Styled.WrapperMainStatusInfoUser>
                {dataUserOnly && (
                  <Styled.WrapperMainInfoUser>
                    <Styled.WrapperImagem>
                      <Styled.WrapperImg src={dataUserOnly.imagePerfil} />
                    </Styled.WrapperImagem>
                    <Styled.WrapperInfoUser>
                      <Styled.P>{dataUserOnly.name}</Styled.P>
                    </Styled.WrapperInfoUser>
                  </Styled.WrapperMainInfoUser>
                )}
                <Styled.WrapperSvg>
                  {pause ? (
                    <FontAwesomeIcon icon={faPlay} onClick={handlePauseOn} />
                  ) : (
                    <FontAwesomeIcon icon={faPause} onClick={handlePauseOff} />
                  )}
                  {sound ? (
                    <FontAwesomeIcon icon={faVolumeHigh} onClick={handleSoundOn} />
                  ) : (
                    <FontAwesomeIcon icon={faVolumeXmark} onClick={handleSoundFalse} />
                  )}
                  <FontAwesomeIcon icon={faEllipsis} />
                </Styled.WrapperSvg>
              </Styled.WrapperMainStatusInfoUser>
            </Styled.Line>
            <Styled.ContainerTextArea>
              <Styled.ContainerOnlyTextarea>
                <Styled.Textarea placeholder="Responder a alanzoka..." />
              </Styled.ContainerOnlyTextarea>
            </Styled.ContainerTextArea>

            <Styled.ContainerImg ref={ref}>
              {story[currentPhotoIndex].isImagem == 1 ? (
                <>
                  <>
                    <Styled.ImgStory
                      key={story[currentPhotoIndex].id}
                      draggable="false"
                      src={story[currentPhotoIndex].url}
                    />
                  </>
                </>
              ) : (
                <>
                  {story[currentPhotoIndex].propertyText === undefined ? (
                    <>
                      <Styled.Video
                        onTimeUpdate={(e) => handleTimeUpdate(e)}
                        key={story[currentPhotoIndex].id}
                        autoPlay
                        muted={isMute}
                        ref={refVideo}
                      >
                        <Styled.Source src={story[currentPhotoIndex].url} />
                      </Styled.Video>
                    </>
                  ) : (
                    <>
                      <Styled.Video
                        onTimeUpdate={(e) => handleTimeUpdate(e)}
                        key={story[currentPhotoIndex].id}
                        autoPlay
                        muted={isMute}
                        ref={refVideo}
                      >
                        <Styled.Source src={story[currentPhotoIndex].url} />
                      </Styled.Video>

                      <Styled.ContainerTextValue
                        $colorchosenbackground={story[currentPhotoIndex].propertyText.background}
                        $fontChosen={story[currentPhotoIndex].propertyText.fontFamily}
                        $widthtext={story[currentPhotoIndex].propertyText.width}
                        $eixox={story[currentPhotoIndex].propertyText.left}
                        $eixoy={story[currentPhotoIndex].propertyText.top}
                      >
                        <Styled.Pvalue>{story[currentPhotoIndex].propertyText.text}</Styled.Pvalue>
                      </Styled.ContainerTextValue>
                    </>
                  )}
                </>
              )}
            </Styled.ContainerImg>
            <Styled.WrapperArrow $arrowdirection="right">
              <FontAwesomeIcon icon={faArrowRight} onClick={handlePassStory} />
            </Styled.WrapperArrow>
            {currentPhotoIndex > 0 && (
              <Styled.WrapperArrow $arrowdirection="left">
                <FontAwesomeIcon icon={faArrowRight} onClick={handleReturnStory} rotation={180} />
              </Styled.WrapperArrow>
            )}
          </Styled.ContainerImgAndIcon>
        </Styled.ContainerSee>
      )}
    </>
  );
};

export default React.memo(ProgressPassImg);
