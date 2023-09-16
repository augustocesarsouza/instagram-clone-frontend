import InfoUserShare from '../InfoUserShare/InfoUserShare';
import ModalDiscardPost from '../ModalDiscardPost/ModalDiscardPost';
import * as Styled from './styled';
import { ChangeEvent, useState } from 'react';
import PostModalPhoto from '../PostModalPhoto/PostModalPhoto';
import { AllPost } from '../../HomePage/CardPost/CardPost';

interface ModalPhotoProps {
  selectedImagem: string | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedVideo: React.Dispatch<React.SetStateAction<string | null>>;
  userId: number | null;
  createPost: boolean;
  setCreateImgOrVideo: React.Dispatch<React.SetStateAction<AllPost | null>>;
  setShowShare: React.Dispatch<React.SetStateAction<boolean>>;
  showShare: boolean;
}

const ModalPhoto = ({
  userId,
  createPost,
  selectedImagem,
  setSelectedImage,
  setSelectedVideo,
  setCreateImgOrVideo,
  setShowShare,
  showShare,
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
    <Styled.MainDeTodasTest $extende={String(showShare)} $createpost={String(createPost)}>
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
        setCreateImgOrVideo={setCreateImgOrVideo}
      />
      <Styled.ContainerImgAndLegendShare>
        {!decreaseDiv && (
          <>
            <Styled.ContainerSelectedImage
              $extende={String(showShare)}
              $createstory={String(!createPost)}
            >
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
    </Styled.MainDeTodasTest>
  );
};

export default ModalPhoto;
