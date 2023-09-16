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
  createPost: boolean;
  selectedVideo: string | null;
  setSelectedVideo: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
  setCreateImgOrVideo: React.Dispatch<React.SetStateAction<AllPost | null>>;
}

const ModalVideo = ({
  userId,
  createPost,
  selectedVideo,
  setSelectedVideo,
  setSelectedImage,
  setCreateImgOrVideo,
}: ModalVideoProps) => {
  const [showModalDiscardPost, setShowModalDiscardPost] = useState(false);
  const [text, setText] = useState('');
  const [decreaseDiv, setDecreaseDiv] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [sendVideoToBack, setSendVideoToBack] = useState(false);

  const refVideo = useRef<HTMLVideoElement | null>(null);
  const parentsVideo = useRef<HTMLDivElement | null>(null);
  const ContainerRefImg = useRef<HTMLDivElement | null>(null);

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

  const handleVideoEnd = () => {
    if (refVideo.current) {
      refVideo.current.currentTime = 0;
      refVideo.current.play();
    }
  };

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

  useEffect(() => {
    if (parentsVideo.current === null) return;

    console.log(parentsVideo.current);
  }, [parentsVideo.current]);

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
        setShowShare={setShowShare}
        handlePublish={handlePublish}
        setDecreaseDiv={setDecreaseDiv}
        setSendVideoToBack={setSendVideoToBack}
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
            <Styled.ContainerSelectedImageOutro
              $extende={String(showShare)}
              $createstory={String(!createPost)}
              onMouseEnter={handleMouseEnterSon}
              onMouseLeave={handleMouseLeaveSon}
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
                        <Styled.Video autoPlay muted={true} ref={refVideo} onEnded={handleVideoEnd}>
                          <Styled.Source src={selectedVideo} type="video/mp4" />
                        </Styled.Video>
                      )}
                    </Styled.ContainerSelectedVideo>
                  )}
                </>
              )}
            </Styled.ContainerSelectedImageOutro>
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
