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
  const [sendVideoToBack, setSendVideoToBack] = useState(false);

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

    if (ContainerRefImg.current === null) return;
    const containerRect = ContainerRefImg.current.getBoundingClientRect();

    const offsetX = e.clientX - containerRect.left;
    const offsetY = e.clientY - containerRect.top;

    setEixoX(offsetX - textArea.length * 4);
    setEixoY(offsetY - 10);
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
    if (widthTextValueRef.current === null) return;
    setWidthTextArea(widthTextValueRef.current.clientWidth);

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

  const [lastY, setLestY] = useState(0);
  const [lastX, setLestX] = useState(0);
  const [moveVideoY, setMoveVideoY] = useState(0);
  const [moveVideoX, setMoveVideoX] = useState(0);
  const [unlockMove, setUnlockMove] = useState(false);
  const [mouseIsInSon, setMouseIsInSon] = useState(false);
  const valueToSumAndSubtractXRef = useRef(0.3);
  const valueToSumAndSubtractYRef = useRef(0.7);

  const handleMouseDownClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setUnlockMove(true);
    setLestY(e.clientY);
    setLestX(e.clientX);
    setMouseIsInSon(true);
  };

  const handleMouseUpClick = () => {
    setUnlockMove(false);
    setMouseIsInSon(false);
    setMoveVideoY((prev) => (prev >= 255 ? 255 : prev <= -255 ? -255 : prev));
    setMoveVideoX((prev) => (prev >= 0 ? 0 : 0));
  };

  const handleMouseMoveClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!unlockMove) return;
    if (showShare) return;

    if (e.clientX < lastX) {
      // left
      setMoveVideoX((prev) => (prev <= -154 ? prev : prev - valueToSumAndSubtractXRef.current));

      setLestX(e.clientX);
    } else if (e.clientX > lastX) {
      // right
      setMoveVideoX((prev) => (prev <= 154 ? prev + valueToSumAndSubtractXRef.current : prev));
      setLestX(e.clientX);
    }

    if (e.clientY < lastY) {
      // Up
      setMoveVideoY((prev) => (prev <= -349 ? prev : prev - valueToSumAndSubtractYRef.current)); //Até 349px

      setLestY(e.clientY);
    } else if (e.clientY > lastY) {
      // Down

      setMoveVideoY((prev) => (prev <= 349 ? prev + valueToSumAndSubtractYRef.current : prev));

      setLestY(e.clientY);
    }
  };

  const [unlockParentMove, setUnlockParentMove] = useState(false);

  const handleMouseEnterSon = () => {
    setUnlockParentMove(false);
  };

  const handleMouseLeaveSon = () => {
    setUnlockParentMove(true);
  };

  const handleMouseUpClickParent = () => {
    setUnlockMove(false);
    setMouseIsInSon(false);
    setUnlockParentMove(false);

    setMoveVideoY((prev) => (prev >= 255 ? 255 : prev <= -255 ? -255 : prev));
    setMoveVideoX((prev) => (prev >= 0 ? 0 : 0));
  };

  const handleMouseMoveClickParent = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!unlockParentMove) return;
    if (!mouseIsInSon) return;
    if (showShare) return;

    if (e.clientX < lastX) {
      // left
      setMoveVideoX((prev) => (prev <= -154 ? prev : prev - valueToSumAndSubtractXRef.current));
      setLestX(e.clientX);
    } else if (e.clientX > lastX) {
      // right
      setMoveVideoX((prev) => (prev <= 154 ? prev + valueToSumAndSubtractXRef.current : prev));
      setLestX(e.clientX);
    }

    if (e.clientY < lastY) {
      // Up
      setMoveVideoY((prev) => (prev <= -349 ? prev : prev - valueToSumAndSubtractYRef.current)); //Até 349px

      setLestY(e.clientY);
    } else if (e.clientY > lastY) {
      // Down

      setMoveVideoY((prev) => (prev <= 349 ? prev + valueToSumAndSubtractYRef.current : prev));

      setLestY(e.clientY);
    }
  };

  return (
    <Styled.MainDeTodasTest
      $extende={String(showShare)}
      $createpost={String(createPost)}
      $mouseisinson={String(mouseIsInSon)}
      onMouseUp={handleMouseUpClickParent}
      onMouseMove={handleMouseMoveClickParent}
    >
      <PostModalVideo
        text={text}
        userId={userId}
        moveVideoY={moveVideoY}
        showShare={showShare}
        decreaseDiv={decreaseDiv}
        selectedVideo={selectedVideo}
        sendVideoToBack={sendVideoToBack}
        jsonPropertyText={jsonPropertyText}
        setStory={setStory}
        setNewStory={setNewStory}
        setShowShare={setShowShare}
        handlePublish={handlePublish}
        setDecreaseDiv={setDecreaseDiv}
        setSendVideoToBack={setSendVideoToBack}
        setShowStoryCircle={setShowStoryCircle}
        setCreateImgOrVideo={setCreateImgOrVideo}
        handleModalDiscardPost={handleModalDiscardPost}
      />
      <Styled.ContainerSelectImg
        $showshare={String(showShare)}
        $sendvideotoback={String(sendVideoToBack)}
      >
        <>
          {!showShare && (
            <Styled.ContainerParentsBorder>
              <Styled.ContainerBorder $position="1"></Styled.ContainerBorder>
              <Styled.ContainerBorder $position="2"></Styled.ContainerBorder>
              <Styled.ContainerBorder $position="3"></Styled.ContainerBorder>
              <Styled.ContainerBorder $position="4"></Styled.ContainerBorder>
              <Styled.ContainerBorder $position="5"></Styled.ContainerBorder>
              <Styled.ContainerBorder $position="6"></Styled.ContainerBorder>
              <Styled.ContainerBorder $position="7"></Styled.ContainerBorder>
              <Styled.ContainerBorder $position="8"></Styled.ContainerBorder>
              <Styled.ContainerBorder $position="9"></Styled.ContainerBorder>
            </Styled.ContainerParentsBorder>
          )}
          {!decreaseDiv && (
            <>
              <Styled.ContainerSelectedImageOutro
                $extende={String(showShare)}
                $createstory={String(!createPost)}
                onMouseMove={handleMouseMoveSelectedImg}
                onMouseDown={handleMouseDownSelectImg}
                onMouseEnter={handleMouseEnterSon}
                onMouseLeave={handleMouseLeaveSon}
                onMouseUp={handleMouseUp}
                ref={ContainerRefImg}
              >
                {selectedVideo && (
                  <>
                    {!decreaseDiv && (
                      <Styled.ContainerSelectedVideo
                        ref={parentsVideo}
                        $unlockmove={String(unlockMove)}
                        $movevideoy={moveVideoY}
                        $movevideox={moveVideoX}
                        $showshare={String(showShare)}
                        onMouseDown={handleMouseDownClick}
                        onMouseUp={handleMouseUpClick}
                        onMouseMove={handleMouseMoveClick}
                      >
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
                      </Styled.ContainerSelectedVideo>
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
                    {!createPost && (
                      <>
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
                                    <FontAwesomeIcon
                                      icon={faBarsStaggered}
                                      onClick={handleBarCenter}
                                    />
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
                      </>
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
        imgData={undefined}
        showModalDiscardPost={showModalDiscardPost}
        setSelectedVideo={setSelectedVideo}
        setSelectedImage={setSelectedImage}
        setShowModalDiscardPost={setShowModalDiscardPost}
      />
    </Styled.MainDeTodasTest>
  );
};

export default ModalVideo;
