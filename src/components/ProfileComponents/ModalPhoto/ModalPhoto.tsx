import InfoUserShare from '../InfoUserShare/InfoUserShare';
import ModalDiscardPost from '../ModalDiscardPost/ModalDiscardPost';
import * as Styled from './styled';
import { ChangeEvent, useState, useRef, useEffect } from 'react';
import PostModalPhoto from '../PostModalPhoto/PostModalPhoto';
import { StoryProps } from '../InfoProfile/InfoProfile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBarsStaggered, faFont } from '@fortawesome/free-solid-svg-icons';
import FontsText from '../FontsText/FontsText';
import { ImgProcess } from '../ModalSharePhoto/ModalSharePhoto';
import { AllPost } from '../../HomePage/CardPost/CardPost';

interface ModalPhotoProps {
  selectedImagem: string | null;
  imgData: ImgProcess | undefined;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedVideo: React.Dispatch<React.SetStateAction<string | null>>;
  userId: number | null;
  createPost: boolean;
  setStory: React.Dispatch<React.SetStateAction<StoryProps[]>>;
  setNewStory: React.Dispatch<React.SetStateAction<boolean>>;
  setShowStoryCircle: React.Dispatch<React.SetStateAction<boolean>>;
  setCreateImgOrVideo: React.Dispatch<React.SetStateAction<AllPost | null>>;
}

const ModalPhoto = ({
  userId,
  imgData,
  createPost,
  selectedImagem,
  setSelectedImage,
  setSelectedVideo,
  setStory,
  setNewStory,
  setShowStoryCircle,
  setCreateImgOrVideo,
}: ModalPhotoProps) => {
  const [showModalDiscardPost, setShowModalDiscardPost] = useState(false);
  const [text, setText] = useState('');
  const [decreaseDiv, setDecreaseDiv] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const ContainerRefImg = useRef<HTMLDivElement | null>(null);
  const [newa, setNewa] = useState<string>('');
  const [textAreaValue, setTextAreaValue] = useState<string>('');
  const [openTextStory, setOpenTextStory] = useState(false);

  const [barRight, setBarRight] = useState(false);
  const [barCenterOrLeft, setBarCenterOrLeft] = useState(true);
  const [eixoX, setEixoX] = useState(0);
  const [eixoY, setEixoY] = useState(0);
  const [positionLCR, setPositionLCR] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length <= 2200) {
      setText(event.target.value);
    }
  };

  const handleModalDiscardPost = () => {
    setShowModalDiscardPost(true);
  };

  const handlePublish = () => {
    setShowShare(true);
  };

  const handleOpenText = () => {
    setEixoX(489.5);
    setEixoY(410);
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
  const [valueCentral, setValueCentral] = useState<number>(0);
  const [lastClickX, setLastClickX] = useState<number>(0);
  const [colorChosen, setColorChosen] = useState('white');
  const [isOnMoveMouse, setIsOnMoveMouse] = useState(false);
  const [fontChosen, setFontChosen] = useState('Arial');
  const [rectangleHeight, setRectangleHeight] = useState<number>(0);
  const [lastClickY, setLastClickY] = useState<number>(0);

  useEffect(() => {
    const handlePublisha = () => {
      if (selectedImagem && !createPost) {
        const img = new Image();
        img.src = selectedImagem;

        img.onload = async (e) => {
          const canvas = document.createElement('canvas');
          if (ContainerRefImg.current.clientWidth === undefined) return;

          canvas.width = ContainerRefImg.current.clientWidth;
          canvas.height = ContainerRefImg.current.clientHeight;

          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);

            if (textAreaValue && !openTextStory) {
              const textBackgroundColor = colorChosen;

              const textX = Math.abs(eixoX - 175 * 1.35);
              const textY = eixoY - 35 * 1.3;

              setLastClickX(eixoX);
              setLastClickY(textY);

              ctx.fillStyle = textBackgroundColor;
              ctx.beginPath();

              const textAreaLength = textAreaValue.length;

              var valueMudVez = 10;
              var valueMudSum = 8.8;

              const leftMargin = 4;
              const topMargin = 17;
              const rectangleWidth = valueMudVez + valueMudSum * textAreaLength;

              const rectangleHeight = 23;
              const borderRadius = 7;

              setValueCentral(rectangleWidth);

              setRectangleHeight(rectangleHeight);

              ctx.moveTo(textX - leftMargin + borderRadius, textY - topMargin);
              ctx.lineTo(textX - leftMargin + rectangleWidth - borderRadius, textY - topMargin);
              ctx.quadraticCurveTo(
                textX - leftMargin + rectangleWidth,
                textY - topMargin,
                textX - leftMargin + rectangleWidth,
                textY - topMargin + borderRadius
              );

              ctx.lineTo(
                textX - leftMargin + rectangleWidth,
                textY - topMargin + rectangleHeight - borderRadius
              );
              ctx.quadraticCurveTo(
                textX - leftMargin + rectangleWidth,
                textY - topMargin + rectangleHeight,
                textX - leftMargin + rectangleWidth - borderRadius,
                textY - topMargin + rectangleHeight
              );

              ctx.lineTo(textX - leftMargin + borderRadius, textY - topMargin + rectangleHeight);
              ctx.quadraticCurveTo(
                textX - leftMargin,
                textY - topMargin + rectangleHeight,
                textX - leftMargin,
                textY - topMargin + rectangleHeight - borderRadius
              );

              ctx.lineTo(textX - leftMargin, textY - topMargin + borderRadius);
              ctx.quadraticCurveTo(
                textX - leftMargin,
                textY - topMargin,
                textX - leftMargin + borderRadius,
                textY - topMargin
              );

              ctx.closePath();
              ctx.fill();

              ctx.fillStyle = 'black';
              ctx.font = `17px ${fontChosen}`;

              ctx.fillText(textAreaValue, textX, textY);
            }

            const dataURL = canvas.toDataURL();

            setNewa(dataURL);
          }
        };
      }
    };
    handlePublisha();
  }, [
    selectedImagem,
    textAreaValue,
    unlock,
    eixoX,
    eixoY,
    openTextStory,
    colorChosen,
    fontChosen,
    isOnMoveMouse,
    positionLCR,
  ]);

  const holdTimeout = useRef<NodeJS.Timeout | null>(null);
  const [openColors, setOpenColors] = useState(false);
  const [choseColorOrFont, setChooseColorOrFont] = useState<boolean>(true);
  const [libery, setLibery] = useState(false);

  const handleMouseUp = () => {
    setIsOnMoveMouse(false);
    setLibery(false);
    if (holdTimeout.current === null) return;
    clearTimeout(holdTimeout.current);
    setOpenColors(false);
    if (!unlock) {
      setOpenTextStory(true);
      setTextAreaValue('');
    }
    setUnlock(false);
  };

  const handleMouseMoveSelectedImg = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!unlock) return;

    const mouseX = e.clientX - valueCentral / 2;

    const divCanvas = valueCentral / 2.5;

    const minX = lastClickX - divCanvas;
    const maxX = lastClickX + divCanvas;

    if (libery) {
      if (mouseX >= minX - 110 && mouseX <= maxX + 110) {
        setIsOnMoveMouse(true);
        const mouseX = e.clientX - valueCentral / 2;
        const mouseY = e.clientY - 7 * 1.3;

        setEixoX(mouseX);
        setEixoY(mouseY);
      }
    }
  };

  const handleMouseDownSelectImg = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setUnlock(true);

    const mouseX = e.clientX - valueCentral / 2;

    const divCanvas = valueCentral / 2.5;

    const minX = lastClickX - divCanvas;
    const maxX = lastClickX + divCanvas;

    if (mouseX >= minX - 20 && mouseX <= maxX + 20) {
      setLibery(true);
    }

    holdTimeout.current = setTimeout(() => {
      setUnlock(true);
    }, 100);
  };

  const handleChangeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextArea(e.target.value);
  };

  useEffect(() => {
    if (textRef.current?.clientWidth === undefined) return;

    textRef.current?.setSelectionRange(textArea.length, textArea.length);
  }, [textRef.current, openTextStory]);

  const handleOpenColors = () => {
    setOpenColors(true);
  };

  const handleColor = (color: string) => {
    setColorChosen(color);
  };

  const handleFont = () => {
    setChooseColorOrFont(true);
    setOpenColors(false);
  };

  const handleFontSelected = (font: string) => {
    setFontChosen(font);
  };

  const [isImg] = useState(true);

  return (
    <Styled.MainDeTodasTest $extende={String(showShare)} $isImg={String(isImg)}>
      <PostModalPhoto
        text={text}
        imgData={imgData}
        selectedImagem={selectedImagem}
        userId={userId}
        newa={newa}
        showShare={showShare}
        decreaseDiv={decreaseDiv}
        createPost={createPost}
        setShowShare={setShowShare}
        setDecreaseDiv={setDecreaseDiv}
        handlePublish={handlePublish}
        handleModalDiscardPost={handleModalDiscardPost}
        setStory={setStory}
        setNewStory={setNewStory}
        setShowStoryCircle={setShowStoryCircle}
        setCreateImgOrVideo={setCreateImgOrVideo}
      />
      <Styled.ContainerSelectImg>
        <>
          {!decreaseDiv && (
            <>
              {/* <Styled.ContainerSelectedImage ref={ContainerRefImg}>
                {selectedImagem && <Styled.ImgSelected src={selectedImagem} alt="selected image" />}
              </Styled.ContainerSelectedImage> */}

              <Styled.ContainerSelectedImage
                ref={ContainerRefImg}
                onMouseMove={handleMouseMoveSelectedImg}
                onMouseDown={handleMouseDownSelectImg}
                onMouseUp={handleMouseUp}
                $extende={String(showShare)}
                $createstory={String(!createPost)}
              >
                {createPost
                  ? selectedImagem && (
                      <Styled.ImgSelected src={selectedImagem} alt="selected image" />
                    )
                  : newa && <Styled.ImgSelected src={newa} alt="selected image" />}
              </Styled.ContainerSelectedImage>
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
                    $colorchosen={colorChosen}
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
        </>
        <InfoUserShare
          userId={userId}
          text={text}
          isImg={isImg}
          handleChange={handleChange}
          showShare={showShare}
          decreaseDiv={decreaseDiv}
          createPost={createPost}
        />
      </Styled.ContainerSelectImg>
      <ModalDiscardPost
        imgData={imgData}
        showModalDiscardPost={showModalDiscardPost}
        setSelectedVideo={setSelectedVideo}
        setSelectedImage={setSelectedImage}
        setShowModalDiscardPost={setShowModalDiscardPost}
      />
    </Styled.MainDeTodasTest>
  );
};

export default ModalPhoto;
