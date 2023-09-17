import InfoUserShare from '../InfoUserShare/InfoUserShare';
import ModalDiscardPost from '../ModalDiscardPost/ModalDiscardPost';
import * as Styled from './styled';
import { ChangeEvent, useState } from 'react';
import PostModalPhoto from '../PostModalPhoto/PostModalPhoto';

interface ModalPhotoProps {
  selectedImagem: string | null;
  userId: number | null;
  createPost: boolean;
  showShare: boolean;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedVideo: React.Dispatch<React.SetStateAction<string | null>>;
  setShowShare: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalPhoto = ({
  userId,
  createPost,
  selectedImagem,
  showShare,
  setSelectedImage,
  setSelectedVideo,
  setShowShare,
}: ModalPhotoProps) => {
  const [showModalDiscardPost, setShowModalDiscardPost] = useState(false);
  const [text, setText] = useState('');
  const [decreaseDiv, setDecreaseDiv] = useState(false);

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

  const [isImg] = useState(true);

  return (
    <Styled.MainDeTodasTest $extende={String(showShare)}>
      <Styled.ContainerMainOfShareAndImg $extende={String(showShare)}>
        <PostModalPhoto
          text={text}
          selectedImagem={selectedImagem}
          userId={userId}
          showShare={showShare}
          decreaseDiv={decreaseDiv}
          setShowShare={setShowShare}
          setDecreaseDiv={setDecreaseDiv}
          handlePublish={handlePublish}
          handleModalDiscardPost={handleModalDiscardPost}
        />
        <Styled.ContainerImgAndLegendShare>
          {!decreaseDiv && (
            <>
              <Styled.ContainerSelectedImage $extende={String(showShare)}>
                {selectedImagem && <Styled.ImgSelected src={selectedImagem} alt="selected image" />}
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
          showModalDiscardPost={showModalDiscardPost}
          setSelectedVideo={setSelectedVideo}
          setSelectedImage={setSelectedImage}
          setShowModalDiscardPost={setShowModalDiscardPost}
        />
      </Styled.ContainerMainOfShareAndImg>
    </Styled.MainDeTodasTest>
  );
};

export default ModalPhoto;
