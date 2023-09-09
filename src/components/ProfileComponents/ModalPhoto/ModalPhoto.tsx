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
  setShowShare: React.Dispatch<React.SetStateAction<boolean>>;
  showShare: boolean;
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
  setShowShare,
  showShare,
}: ModalPhotoProps) => {
  const [showModalDiscardPost, setShowModalDiscardPost] = useState(false);
  const [text, setText] = useState('');
  const [decreaseDiv, setDecreaseDiv] = useState(false);
  // const [showShare, setShowShare] = useState(false);
  const textRef = useRef<HTMLTextAreaElement | null>(null);

  const [imgGeneratedByCanvas, setImgGeneratedByCanvas] = useState<string>('');
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
    setEixoX(294.5);
    setEixoY(311.5);
    setPositionLCR('center');
    setOpenTextStory(true); //
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

  const [colorChosen, setColorChosen] = useState('white');
  const [fontChosen, setFontChosen] = useState('Arial');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const handlePublishh = () => {
      if (selectedImagem && !createPost) {
        const img = new Image();
        img.src = selectedImagem;

        img.onload = async (e) => {
          if (canvasRef.current === null) return;

          canvasRef.current.width = img.width;
          canvasRef.current.height = img.height;

          const ctx = canvasRef.current.getContext('2d');
          if (ctx) {
            ctx.imageSmoothingEnabled = false;

            ctx.drawImage(img, 0, 0, img.width, img.height);

            if (textAreaValue && !openTextStory) {
              const textBackgroundColor = colorChosen;

              const textX = eixoX - textAreaValue.length * 4.5;
              const textY = eixoY;

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

            const dataURL = canvasRef.current.toDataURL('image/jpeg', 1);
            setImgGeneratedByCanvas(dataURL);
          }
        };
      }
    };
    handlePublishh();
  }, [
    selectedImagem,
    textAreaValue,
    eixoX,
    eixoY,
    openTextStory,
    colorChosen,
    fontChosen,
    positionLCR,
    canvasRef,
    createPost,
  ]);

  const [openColors, setOpenColors] = useState(false);
  const [choseColorOrFont, setChooseColorOrFont] = useState<boolean>(true);
  const [unlock, setUnlock] = useState(false);
  const ContainerRefImg = useRef<HTMLDivElement | null>(null);

  const [mouseEnterIconsInteractionTopAndBottom, setMouseEnterIconsInteractionTopAndBottom] =
    useState(false);

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setUnlock(false);

    setOpenColors(false);
  };

  const handleMouseMoveSelectedImg = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!unlock) return;

    if (ContainerRefImg.current === null) return;
    const containerRect = ContainerRefImg.current.getBoundingClientRect();

    const offsetX = e.clientX - containerRect.left;
    const offsetY = e.clientY - containerRect.top;

    setEixoX(offsetX);
    setEixoY(offsetY);
  };

  const handleMouseDownSelectImg = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setUnlock(true);

    if (mouseEnterIconsInteractionTopAndBottom) return;
    if (ContainerRefImg.current === null) return;
    setOpenTextStory(false);
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

  const handleMouseEnterIconsAll = () => {
    setMouseEnterIconsInteractionTopAndBottom(true);
  };

  const handleMouseLeaveIconsAll = () => {
    setMouseEnterIconsInteractionTopAndBottom(false);
  };

  return (
    <Styled.MainDeTodasTest $extende={String(showShare)} $createpost={String(createPost)}>
      <PostModalPhoto
        text={text}
        imgData={imgData}
        selectedImagem={selectedImagem}
        userId={userId}
        imgGeneratedByCanvas={imgGeneratedByCanvas} //Só mandar para banco quando enviar
        showShare={showShare}
        decreaseDiv={decreaseDiv}
        setShowShare={setShowShare}
        setDecreaseDiv={setDecreaseDiv}
        handlePublish={handlePublish}
        handleModalDiscardPost={handleModalDiscardPost}
        setStory={setStory}
        setNewStory={setNewStory}
        setShowStoryCircle={setShowStoryCircle}
        setCreateImgOrVideo={setCreateImgOrVideo}
      />
      <Styled.ContainerImgAndLegendShare>
        {!decreaseDiv && (
          <>
            <Styled.ContainerSelectedImage
              ref={ContainerRefImg}
              onMouseMove={handleMouseMoveSelectedImg}
              onMouseDown={handleMouseDownSelectImg}
              onMouseUp={handleMouseUp}
              $extende={String(showShare)}
              $createstory={String(!createPost)}
            >
              {createPost ? (
                selectedImagem && <Styled.ImgSelected src={selectedImagem} alt="selected image" />
              ) : (
                <canvas style={{ width: '480px', height: '750px' }} ref={canvasRef} />
              )}

              {!createPost && (
                <>
                  {openTextStory ? (
                    <Styled.ContainerMainSvg
                      onMouseEnter={handleMouseEnterIconsAll}
                      onMouseLeave={handleMouseLeaveIconsAll}
                    >
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
                      <FontsText
                        openColors={openColors}
                        openTextStory={openTextStory}
                        handleColor={handleColor}
                        handleFontSelected={handleFontSelected}
                      />
                    </Styled.ContainerMainSvg>
                  ) : (
                    <Styled.ContainerSvg $opentextstory={String(openTextStory)}>
                      <FontAwesomeIcon icon={faFont} onClick={handleOpenText} />
                    </Styled.ContainerSvg>
                  )}
                </>
              )}

              {!createPost && (
                <>
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
                </>
              )}
            </Styled.ContainerSelectedImage>
          </>
        )}
        <InfoUserShare
          userId={userId}
          text={text}
          isImg={isImg}
          handleChange={handleChange}
          showShare={showShare}
          decreaseDiv={decreaseDiv}
          createPost={createPost}
        />
      </Styled.ContainerImgAndLegendShare>
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
