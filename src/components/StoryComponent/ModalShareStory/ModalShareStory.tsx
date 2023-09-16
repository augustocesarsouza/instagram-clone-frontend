import * as Styled from './styled';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Url from '../../../Utils/Url';
import { createContext, useState } from 'react';
import ModalCreatePublicStoryStory from '../ModalCreatePublicStory/ModalCreatePublicStory';
import ModalVideoStory from '../ModalVideoStory/ModalVideoStory';
import { StoryProps } from '../../ProfileComponents/InfoProfile/InfoProfile';
import ModalPhotoStory from '../ModalPhotoStory/ModalPhotoStory';

export interface ImgProcess {
  url: string;
  publicId: string;
  isImagem: number;
}

interface ModalShareStoryProps {
  userId: number | null;
  choiceStory: boolean;
  createNewStory: boolean;
  setStory: React.Dispatch<React.SetStateAction<StoryProps[]>>;
  setNewStory: React.Dispatch<React.SetStateAction<boolean>>;
  setCreateNewStory: React.Dispatch<React.SetStateAction<boolean>>;
  setShowStoryCircle: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ContextModalSharePhoto = createContext<ContextModalSharePhotoProps | null>(null);

export interface ContextModalSharePhotoProps {
  setCreateNewStory: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalShareStory = ({
  userId,
  createNewStory,
  setStory,
  setNewStory,
  setCreateNewStory,
  setShowStoryCircle,
}: ModalShareStoryProps) => {
  const [selectedImagem, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [imgData, setImgData] = useState<ImgProcess>();
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
          setShowLoading(true);

          if (imageDataUrl.startsWith('data:image/')) {
            const fetchTest = async () => {
              var imgObj;

              imgObj = {
                Url: imageDataUrl,
                isStory: true,
              };

              const res = await fetch(`${Url}/process/img/story`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(imgObj),
              });
              if (res.status === 200) {
                setShowIconSuccess(true);
                const json = await res.json();
                const data: ImgProcess = json.data;
                setImgData(data);

                const resFet = await fetch(data.url);
                const blob = await resFet.blob();

                const readerImg = new FileReader();
                readerImg.onload = (e) => {
                  const imageDataUrlNew = e.target?.result as string;

                  if (file.type.startsWith('image/')) {
                    setSelectedImage(imageDataUrlNew);
                    setShowLoading(false);
                  }
                };
                readerImg.readAsDataURL(blob);
              }
            };
            fetchTest();
          } else if (imageDataUrl.startsWith('data:video/')) {
            setSelectedVideo(imageDataUrl);
            setShowLoading(false);
          }
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

    if (createNewStory) {
      setCreateNewStory(false);
    }

    document.body.style.overflow = '';

    if (imgData === undefined) return;

    await fetch(`${Url}/deleteimg`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(imgData),
    });
  };

  return (
    <>
      <Styled.MainShare $isoffdiv={String(createNewStory)}>
        <Styled.ContainerClosedModal>
          <FontAwesomeIcon icon={faXmark} onClick={handleCloseModal} />
        </Styled.ContainerClosedModal>
        <ContextModalSharePhoto.Provider value={{ setCreateNewStory }}>
          <>
            {selectedImagem ? (
              <ModalPhotoStory
                userId={userId}
                imgData={imgData}
                selectedImagem={selectedImagem}
                setSelectedImage={setSelectedImage}
                setSelectedVideo={setSelectedVideo}
                setStory={setStory}
                setNewStory={setNewStory}
                setShowStoryCircle={setShowStoryCircle}
                setShowShare={setShowShare}
                setCreateNewStory={setCreateNewStory}
                showShare={showShare}
              />
            ) : selectedVideo ? (
              <ModalVideoStory
                userId={userId}
                selectedVideo={selectedVideo}
                setStory={setStory}
                setNewStory={setNewStory}
                setSelectedVideo={setSelectedVideo}
                setSelectedImage={setSelectedImage}
                setCreateNewStory={setCreateNewStory}
                setShowStoryCircle={setShowStoryCircle}
              />
            ) : (
              <>
                {createNewStory && (
                  <ModalCreatePublicStoryStory
                    handleShowSelectImg={handleShowSelectImg}
                    setSelectedImage={setSelectedImage}
                    showLoading={showLoading}
                    chooseFile={chooseFile}
                    showIconSuccess={showIconSuccess}
                  />
                )}
              </>
            )}
          </>
        </ContextModalSharePhoto.Provider>
      </Styled.MainShare>
    </>
  );
};

export default ModalShareStory;
