import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Styled from './styled';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import ModalPhoto from '../../ProfileComponents/ModalPhoto/ModalPhoto';
import ModalCreatePublic from '../../ProfileComponents/ModalCreatePublic/ModalCreatePublic';
import ReactModal from 'react-modal';
import ModalVideo from '../../ProfileComponents/ModalVideo/ModalVideo';

interface ModalSharePhotoStoryProps {
  showModalShare: boolean;
  setShowModalShare: React.Dispatch<React.SetStateAction<boolean>>;
  userId: number | null;
  callFetchMethodo: (value: {}) => void;
}

const ModalSharePhotoStory = ({
  showModalShare,
  setShowModalShare,
  userId,
  callFetchMethodo,
}: ModalSharePhotoStoryProps) => {
  const [selectedImagem, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const handleShowSelectImg = () => {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.multiple = false;
    inputElement.accept = 'video/*, image/*';

    const handleChange = (event: Event) => {
      const files = (event.target as HTMLInputElement).files; // HTMLInputElement para acessar a prop 'files' que não está presente no tipo base Event.
      if (files && files.length > 0) {
        const file = files[0];

        const reader = new FileReader();

        reader.onload = (e) => {
          const imageDataUrl = e.target?.result as string;

          if (file.type.startsWith('image/')) {
            setSelectedImage(imageDataUrl);
          } else {
            setSelectedVideo(imageDataUrl);
          }

          const fileSizeKb = Math.round(file.size / 1024);
        };
        reader.readAsDataURL(file);
      }
      inputElement.removeEventListener('change', handleChange);
    };
    inputElement.addEventListener('change', handleChange);
    inputElement.click();
  };

  const disableBodyScroll = () => {
    document.body.style.overflow = 'hidden';
    // setShowModalComment(true);
  };

  const enableBodyScroll = () => {
    document.body.style.overflow = '';
  };

  const handleCloseModal = () => {
    setShowModalShare(false);
  };

  return (
    <ReactModal
      isOpen={showModalShare}
      onAfterOpen={disableBodyScroll}
      onAfterClose={enableBodyScroll}
      style={{
        overlay: {
          backgroundColor: 'rgb(33 33 33 / 73%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        content: {
          background: 'none',
          border: 'none',
          borderRadius: 'none',
          position: 'none',
        },
      }}
    >
      <Styled.ContainerModalShare>
        <Styled.ContainerClosedModal>
          <FontAwesomeIcon icon={faXmark} onClick={handleCloseModal} />
        </Styled.ContainerClosedModal>
        <Styled.ContainerContentShare>
          {selectedImagem ? (
            <ModalPhoto
              selectedImagem={selectedImagem}
              setSelectedImage={setSelectedImage}
              userId={userId}
              setShowModalShare={setShowModalShare}
              callFetchMethodo={callFetchMethodo}
            />
          ) : selectedVideo ? (
            <ModalVideo
              selectedVideo={selectedVideo}
              setSelectedImage={setSelectedImage}
              userId={userId}
              setShowModalShare={setShowModalShare}
              callFetchMethodo={callFetchMethodo}
            />
          ) : (
            <ModalCreatePublic
              handleShowSelectImg={handleShowSelectImg}
              setSelectedImage={setSelectedImage}
            />
          )}
        </Styled.ContainerContentShare>
      </Styled.ContainerModalShare>
    </ReactModal>
  );
};

export default ModalSharePhotoStory;
