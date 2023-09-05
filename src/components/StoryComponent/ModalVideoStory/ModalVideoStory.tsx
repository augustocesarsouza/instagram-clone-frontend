import InfoUserShare from '../InfoUserShare/InfoUserShare';
import ModalDiscardPost from '../ModalDiscardPost/ModalDiscardPost';
import * as Styled from './styled';
import { ChangeEvent, useState, useRef } from 'react';
import PostModal from '../PostModalPhoto/PostModalPhoto';
import PostModalVideo from '../PostModalVideo/PostModalVideo';

interface ModalVideoStoryProps {
  selectedVideo: string | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
  userId: number | null;
  setShowModalShare: React.Dispatch<React.SetStateAction<boolean>>;
  callFetchMethodo: (value: {}) => void;
}

const ModalVideoStory = ({
  selectedVideo,
  setSelectedImage,
  userId,
  setShowModalShare,
  callFetchMethodo,
}: ModalVideoStoryProps) => {
  const [showModalDiscardPost, setShowModalDiscardPost] = useState(false);
  const [text, setText] = useState('');
  const [decreaseDiv, setDecreaseDiv] = useState(false);
  const [showShare, setShowShare] = useState(false);

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

  return (
    <>
      <PostModalVideo
        text={text}
        selectedVideo={selectedVideo}
        userId={userId}
        showShare={showShare}
        setShowShare={setShowShare}
        decreaseDiv={decreaseDiv}
        setDecreaseDiv={setDecreaseDiv}
        handlePublish={handlePublish}
        handleModalDiscardPost={handleModalDiscardPost}
        callFetchMethodo={callFetchMethodo}
      />
      <Styled.ContainerSelectImg>
        <>
          {!decreaseDiv && (
            <Styled.ContainerSelectedImage>
              {selectedVideo && (
                <Styled.Video controls autoPlay>
                  <Styled.Source src={selectedVideo} type="video/mp4" />
                </Styled.Video>
              )}
            </Styled.ContainerSelectedImage>
          )}
        </>
        <InfoUserShare
          userId={userId}
          text={text}
          handleChange={handleChange}
          showShare={showShare}
          decreaseDiv={decreaseDiv}
        />
      </Styled.ContainerSelectImg>
      <ModalDiscardPost
        showModalDiscardPost={showModalDiscardPost}
        setSelectedImage={setSelectedImage}
        setShowModalDiscardPost={setShowModalDiscardPost}
      />
    </>
  );
};

export default ModalVideoStory;
