import InfoUserShare from '../InfoUserShare/InfoUserShare';
import ModalDiscardPost from '../ModalDiscardPost/ModalDiscardPost';
import * as Styled from './styled';
import { ChangeEvent, useState, useRef, useEffect } from 'react';
import PostModalVideo from '../PostModalVideo/PostModalVideo';
import { StoryProps, jsonPropertyTextProps } from '../InfoProfile/InfoProfile';
import { faBars, faBarsStaggered, faFont } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FontsText from '../FontsText/FontsText';
import { AllPost } from '../../HomePage/CardPost/CardPost';
// import { handleVideoText } from './addTextToVideo';

interface ModalVideoProps {
  userId: number | null;
  choiceStory: boolean;
  createPost: boolean;
  selectedVideo: string | null;
  setStory: React.Dispatch<React.SetStateAction<StoryProps[]>>;
  setNewStory: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedVideo: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
  setShowStoryCircle: React.Dispatch<React.SetStateAction<boolean>>;
  setCreateImgOrVideo: React.Dispatch<React.SetStateAction<AllPost | null>>;
}

const ModalVideo = ({
  userId,
  choiceStory,
  createPost,
  selectedVideo,
  setStory,
  setNewStory,
  setSelectedVideo,
  setSelectedImage,
  setShowStoryCircle,
  setCreateImgOrVideo,
}: ModalVideoProps) => {
  const [showModalDiscardPost, setShowModalDiscardPost] = useState(false);
  const [text, setText] = useState('');
  const [decreaseDiv, setDecreaseDiv] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [pause, setPause] = useState(false);
  const refVideo = useRef<HTMLVideoElement | null>(null);
  const parentsVideo = useRef<HTMLDivElement | null>(null);

  const ContainerRefImg = useRef<HTMLDivElement | null>(null);
  const [barRight, setBarRight] = useState(false);
  const [barCenterOrLeft, setBarCenterOrLeft] = useState(true);
  const [eixoX, setEixoX] = useState(229.5);
  const [eixoY, setEixoY] = useState(373);
  const [positionLCR, setPositionLCR] = useState<string>('');
  const [textAreaValue, setTextAreaValue] = useState<string>('');
  const [openTextStory, setOpenTextStory] = useState(false);
  const textRef = useRef<HTMLTextAreaElement | null>(null);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length <= 2200) {
      setText(event.target.value);
    }
  };

  const handleModalDiscardPost = () => {
    setShowModalDiscardPost(true);
  };

  const handlePublish = (storyCreate: boolean) => {
    // if (storyCreate) {
    //   setShowShare(false);
    // } else {
    // }
    setShowShare(true);
  };

  const handleOpenText = () => {
    setEixoX(220);
    setEixoY(373);
    setPositionLCR('center');
    setOpenTextStory(true);
  };

  useEffect(() => {
    if (ContainerRefImg.current) {
      ContainerRefImg.current.addEventListener('mousedown', handleMouseDown);
    }

    return () => {
      if (ContainerRefImg.current) {
        ContainerRefImg.current.removeEventListener('mousedown', handleMouseDown);
      }
    };
  }, [ContainerRefImg.current]);

  const handleMouseDown = () => {
    if (textRef.current) {
      setTextAreaValue(textRef.current.value);
    }

    setOpenTextStory(false);
    setBarCenterOrLeft(true);
    setBarRight(false);
  };

  const handleVideoEnd = () => {
    if (refVideo.current) {
      refVideo.current.currentTime = 0;
      refVideo.current.play();
    }
  };

  useEffect(() => {
    if (textRef.current) {
      setTextAreaValue(textRef.current.value);
    }

    if (openTextStory && textRef.current) {
      textRef.current.focus();

      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      });

      textRef.current.dispatchEvent(clickEvent);
    }
  }, [textRef, openTextStory]);

  const handleBarLeft = () => {
    setBarCenterOrLeft(false);
    setPositionLCR('left');

    setEixoX(306.5);
    setEixoY(408);
  };

  const handleBarRight = () => {
    setBarRight(true);
    setPositionLCR('right');
    setEixoX(659.5);
    setEixoY(409);
  };

  const handleBarCenter = () => {
    setBarCenterOrLeft(true);
    setBarRight(false);
    setPositionLCR('center');
    setEixoX(489.5);
    setEixoY(410);
  };

  const [textArea, setTextArea] = useState('');
  const [unlock, setUnlock] = useState(false);
  const [colorChosenBackground, setColorChosenBackground] = useState('white');
  const [fontChosen, setFontChosen] = useState('Arial');
  const [openColors, setOpenColors] = useState(false);
  const [choseColorOrFont, setChooseColorOrFont] = useState<boolean>(true);
  const holdTimeout = useRef<NodeJS.Timeout | null>(null);
  const widthTextValueRef = useRef<HTMLDivElement | null>(null);

  const handleMouseUp = () => {
    if (holdTimeout.current === null) return;
    clearTimeout(holdTimeout.current);
    setOpenColors(false);
    setUnlock(false);
  };

  const handleMouseMoveSelectedImg = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!unlock) return;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    setEixoX(mouseX - 310);
    setEixoY(mouseY - 60);
  };

  const handleMouseDownSelectImg = () => {
    setOpenTextStory(false);
  };

  const handleMouseUpTextValue = () => {
    setUnlock(false);
  };

  const handleMouseDownTextValue = () => {
    setUnlock(true);
  };

  const handleChangeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextArea(e.target.value);
  };

  const [widthTextArea, setWidthTextArea] = useState(0);

  useEffect(() => {
    // setWidthTextArea(textRef.current?.clientWidth);
    setWidthTextArea(widthTextValueRef.current?.clientWidth);

    textRef.current?.setSelectionRange(textArea.length, textArea.length);
  }, [textRef, openTextStory, textAreaValue, widthTextValueRef]);

  const handleOpenColors = () => {
    setOpenColors(true);
  };

  const handleColor = (color: string) => {
    setColorChosenBackground(color);
  };

  const handleFont = () => {
    setChooseColorOrFont(true);
    setOpenColors(false);
  };

  const handleFontSelected = (font: string) => {
    setFontChosen(font);
  };

  const [jsonPropertyText, setJsonPropertyText] = useState<jsonPropertyTextProps | {}>({});

  useEffect(() => {
    if (widthTextValueRef.current === null) return;

    const jsonPropertyText = {
      Top: eixoY,
      Left: eixoX,
      Text: textAreaValue,
      Width: widthTextValueRef.current.clientWidth,
      Height: widthTextValueRef.current.clientHeight,
      Background: colorChosenBackground,
      FontFamily: fontChosen,
      StoryId: 0,
    };

    setJsonPropertyText(jsonPropertyText);
  }, [
    widthTextValueRef,
    textAreaValue,
    openTextStory,
    eixoX,
    eixoY,
    colorChosenBackground,
    fontChosen,
  ]);

  useEffect(() => {
    if (selectedVideo) {
      document.body.style.overflow = 'hidden';
    }
  }, [selectedVideo]);

  const [isImg] = useState(false);

  return (
    <Styled.MainDeTodasTest $extende={String(showShare)} $createpost={String(createPost)}>
      <PostModalVideo
        text={text}
        userId={userId}
        showShare={showShare}
        decreaseDiv={decreaseDiv}
        selectedVideo={selectedVideo}
        jsonPropertyText={jsonPropertyText}
        setStory={setStory}
        setNewStory={setNewStory}
        setShowShare={setShowShare}
        handlePublish={handlePublish}
        setDecreaseDiv={setDecreaseDiv}
        setShowStoryCircle={setShowStoryCircle}
        setCreateImgOrVideo={setCreateImgOrVideo}
        handleModalDiscardPost={handleModalDiscardPost}
      />
      <Styled.ContainerSelectImg
        onMouseMove={handleMouseMoveSelectedImg}
        onMouseDown={handleMouseDownSelectImg}
        onMouseUp={handleMouseUp}
        ref={ContainerRefImg}
      >
        <>
          {!decreaseDiv && (
            <>
              <Styled.ContainerSelectedImageOutro
                $extende={String(showShare)}
                $createstory={String(!createPost)}
              >
                {selectedVideo && (
                  <>
                    {!decreaseDiv && (
                      <Styled.ContainerSelectedImage ref={parentsVideo}>
                        {selectedVideo && (
                          <Styled.Video
                            autoPlay
                            muted={isMuted}
                            ref={refVideo}
                            onEnded={handleVideoEnd}
                          >
                            <Styled.Source src={selectedVideo} type="video/mp4" />
                          </Styled.Video>
                        )}
                      </Styled.ContainerSelectedImage>
                    )}
                  </>
                )}
                {choiceStory !== undefined && (
                  <>
                    {textAreaValue && !openTextStory && (
                      <Styled.ContainerTextValue
                        ref={widthTextValueRef}
                        $widthtext={widthTextArea}
                        $colorchosenbackground={colorChosenBackground}
                        $fontChosen={fontChosen}
                        $eixox={eixoX}
                        $eixoy={eixoY}
                        onMouseDown={handleMouseDownTextValue}
                        onMouseUp={handleMouseUpTextValue}
                      >
                        <Styled.Pvalue>{textAreaValue}</Styled.Pvalue>
                      </Styled.ContainerTextValue>
                    )}
                    {openTextStory ? (
                      <Styled.ContainerMainSvg>
                        {barCenterOrLeft ? (
                          <Styled.ContainerSvg $opentextstory={String(openTextStory)}>
                            <FontAwesomeIcon icon={faBars} onClick={handleBarLeft} />
                            {/* center */}
                          </Styled.ContainerSvg>
                        ) : (
                          <>
                            {barRight ? (
                              <Styled.ContainerSvg $opentextstory={String(openTextStory)}>
                                <FontAwesomeIcon icon={faBarsStaggered} onClick={handleBarCenter} />
                                {/* right */}
                              </Styled.ContainerSvg>
                            ) : (
                              <Styled.ContainerSvg $opentextstory={String(openTextStory)}>
                                <FontAwesomeIcon
                                  icon={faBarsStaggered}
                                  flip="horizontal"
                                  onClick={handleBarRight}
                                />{' '}
                                {/* left */}
                              </Styled.ContainerSvg>
                            )}
                          </>
                        )}
                        {choseColorOrFont ? (
                          <Styled.ContainerImgColor onClick={() => setChooseColorOrFont(false)}>
                            <Styled.ContainerImg
                              src="https://upload.wikimedia.org/wikipedia/commons/7/71/Gradient_color_wheel.png"
                              onClick={handleOpenColors}
                            />
                          </Styled.ContainerImgColor>
                        ) : (
                          <Styled.ContainerFontA onClick={handleFont}>
                            <FontAwesomeIcon icon={faFont} />
                          </Styled.ContainerFontA>
                        )}
                      </Styled.ContainerMainSvg>
                    ) : (
                      <Styled.ContainerSvg $opentextstory={String(openTextStory)}>
                        <FontAwesomeIcon icon={faFont} onClick={handleOpenText} />
                      </Styled.ContainerSvg>
                    )}

                    {openTextStory && (
                      <Styled.ContainerTextarea
                        $width={Math.max(50, 1 + textArea.length * 10)}
                        $positionlcr={positionLCR}
                      >
                        <Styled.Textarea
                          ref={textRef}
                          onChange={(e) => handleChangeTextarea(e)}
                          value={textArea}
                          $textvalue={textArea}
                          $colorchosenbackground={colorChosenBackground}
                          $fontChosen={fontChosen}
                        />
                      </Styled.ContainerTextarea>
                    )}

                    <FontsText
                      openColors={openColors}
                      openTextStory={openTextStory}
                      handleColor={handleColor}
                      handleFontSelected={handleFontSelected}
                    />
                  </>
                )}
              </Styled.ContainerSelectedImageOutro>
            </>
          )}
        </>
        <InfoUserShare
          text={text}
          isImg={isImg}
          userId={userId}
          showShare={showShare}
          createPost={createPost}
          decreaseDiv={decreaseDiv}
          handleChange={handleChange}
        />
      </Styled.ContainerSelectImg>
      <ModalDiscardPost
        showModalDiscardPost={showModalDiscardPost}
        setSelectedVideo={setSelectedVideo}
        setSelectedImage={setSelectedImage}
        setShowModalDiscardPost={setShowModalDiscardPost}
      />
    </Styled.MainDeTodasTest>
  );
};

export default ModalVideo;
