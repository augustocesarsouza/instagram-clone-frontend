import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Styled from './styled';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState, createContext } from 'react';
import ModalPhoto from '../ModalPhoto/ModalPhoto';
import ModalCreatePublic from '../ModalCreatePublic/ModalCreatePublic';
import ModalVideo from '../ModalVideo/ModalVideo';
import { AllPost } from '../../HomePage/CardPost/CardPost';

interface ModalSharePhotoProps {
  userId: number | null;
  createPost: boolean;
  createNewStory: boolean;
  setCreatePost: React.Dispatch<React.SetStateAction<boolean>>;
  setCreateNewStory: React.Dispatch<React.SetStateAction<boolean>>;
  setCreateImgOrVideo: React.Dispatch<React.SetStateAction<AllPost | null>>;
}

export const ContextModalSharePhoto = createContext<ContextModalSharePhotoProps | null>(null);

export interface ContextModalSharePhotoProps {
  setCreateNewStory: React.Dispatch<React.SetStateAction<boolean>>;
  createPost: boolean;
}

const ModalSharePhoto = ({
  userId,
  createPost,
  createNewStory,
  setCreatePost,
  setCreateNewStory,
  setCreateImgOrVideo,
}: ModalSharePhotoProps) => {
  const [selectedImagem, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [showLoading, setShowLoading] = useState(false);
  const [chooseFile, setChooseFile] = useState(true);
  const [showIconSuccess, setShowIconSuccess] = useState(false);

  const handleShowSelectImg = () => {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.multiple = false;
    inputElement.accept = 'video/*, image/*';

    const handleChange = (event: Event) => {
      const files = (event.target as HTMLInputElement).files; // HTMLInputElement para acessar a prop 'files' que não está presente no tipo base Event.
      setShowLoading(true);
      setChooseFile(false);
      if (files && files.length > 0) {
        const file = files[0];

        const reader = new FileReader();

        reader.onload = (e) => {
          const imageDataUrl = e.target?.result as string;

          if (createPost && imageDataUrl.startsWith('data:image/')) {
            setShowLoading(false);
            setSelectedImage(imageDataUrl);
          } else if (createPost && imageDataUrl.startsWith('data:video/')) {
            setSelectedVideo(imageDataUrl);
            setShowLoading(false);
          }

          setShowLoading(true);
        };

        reader.readAsDataURL(file);
      }
      inputElement.removeEventListener('change', handleChange);
    };
    inputElement.addEventListener('change', handleChange);
    inputElement.click();
  };

  const [showShare, setShowShare] = useState(false);

  const handleCloseModal = async () => {
    setShowShare(false);
    setShowLoading(false);
    setSelectedImage(null);
    setSelectedVideo(null);
    setChooseFile(true);
    setCreatePost(false);
  };

  return (
    <>
      {createPost && (
        <Styled.MainShare $isoffdiv={String(createNewStory || createPost)}>
          <Styled.ContainerClosedModal>
            <FontAwesomeIcon icon={faXmark} onClick={handleCloseModal} />
          </Styled.ContainerClosedModal>
          <ContextModalSharePhoto.Provider value={{ setCreateNewStory, createPost }}>
            <>
              {selectedImagem ? (
                <ModalPhoto
                  userId={userId}
                  createPost={createPost}
                  selectedImagem={selectedImagem}
                  setSelectedImage={setSelectedImage}
                  setSelectedVideo={setSelectedVideo}
                  setCreateImgOrVideo={setCreateImgOrVideo}
                  setShowShare={setShowShare}
                  showShare={showShare}
                />
              ) : selectedVideo ? (
                <ModalVideo
                  userId={userId}
                  createPost={createPost}
                  selectedVideo={selectedVideo}
                  setSelectedVideo={setSelectedVideo}
                  setSelectedImage={setSelectedImage}
                  setCreateImgOrVideo={setCreateImgOrVideo}
                />
              ) : (
                <>
                  <ModalCreatePublic
                    handleShowSelectImg={handleShowSelectImg}
                    setSelectedImage={setSelectedImage}
                    createPost={createPost}
                    showLoading={showLoading}
                    chooseFile={chooseFile}
                    showIconSuccess={showIconSuccess}
                  />
                </>
              )}
            </>
          </ContextModalSharePhoto.Provider>
        </Styled.MainShare>
      )}
    </>
  );
};

export default ModalSharePhoto;
