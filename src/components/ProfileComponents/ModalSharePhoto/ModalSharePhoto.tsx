import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Styled from './styled';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, createContext } from 'react';
import ModalPhoto from '../ModalPhoto/ModalPhoto';
import ModalCreatePublic from '../ModalCreatePublic/ModalCreatePublic';
import ReactModal from 'react-modal';
import ModalVideo from '../ModalVideo/ModalVideo';
import { StoryProps, jsonPropertyTextProps } from '../InfoProfile/InfoProfile';
import { StoryImgProps } from '../../StoryComponent/Story/Story';
import Url from '../../../Utils/Url';
import { AllPost } from '../../HomePage/CardPost/CardPost';

export interface ImgProcess {
  url: string;
  publicId: string;
  isImagem: number;
}

interface ModalSharePhotoProps {
  createNewStory: boolean;
  userId: number | null;
  createPost: boolean;
  choiceStory: boolean;
  setCreateNewStory: React.Dispatch<React.SetStateAction<boolean>>;
  setStory: React.Dispatch<React.SetStateAction<StoryProps[]>>;
  setNewStory: React.Dispatch<React.SetStateAction<boolean>>;
  setShowStoryCircle: React.Dispatch<React.SetStateAction<boolean>>;
  setCreateImgOrVideo: React.Dispatch<React.SetStateAction<AllPost | null>>;
  setCreatePost: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ContextModalSharePhoto = createContext<ContextModalSharePhotoProps | null>(null);

export interface ContextModalSharePhotoProps {
  setCreateNewStory: React.Dispatch<React.SetStateAction<boolean>>;
  createPost: boolean;
}

const ModalSharePhoto = ({
  userId,
  createPost,
  choiceStory,
  createNewStory,
  setStory,
  setNewStory,
  setCreateNewStory,
  setShowStoryCircle,
  setCreateImgOrVideo,
  setCreatePost,
}: ModalSharePhotoProps) => {
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
          // setSelectedImage(imageDataUrl);
          // return;

          if (createPost && imageDataUrl.startsWith('data:image/')) {
            setShowLoading(false);
            setSelectedImage(imageDataUrl);
          } else if (createPost && imageDataUrl.startsWith('data:video/')) {
            setSelectedVideo(imageDataUrl);
            setShowLoading(false);
          }

          setShowLoading(true);

          if (imageDataUrl.startsWith('data:image/') && createNewStory) {
            const fetchTest = async () => {
              var imgObj;
              if (createNewStory) {
                imgObj = {
                  Url: imageDataUrl,
                  isStory: true,
                };
              } else if (createPost) {
                imgObj = {
                  Url: imageDataUrl,
                  IsStory: false,
                };
              }
              const res = await fetch(`${Url}/processimg`, {
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
    if (createPost) {
      setCreatePost(false);
    }

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
      <Styled.MainShare $isoffdiv={String(createNewStory || createPost)}>
        <Styled.ContainerClosedModal>
          <FontAwesomeIcon icon={faXmark} onClick={handleCloseModal} />
        </Styled.ContainerClosedModal>
        <ContextModalSharePhoto.Provider value={{ setCreateNewStory, createPost }}>
          <>
            {selectedImagem ? (
              <ModalPhoto
                userId={userId}
                imgData={imgData}
                createPost={createPost}
                selectedImagem={selectedImagem}
                setSelectedImage={setSelectedImage}
                setSelectedVideo={setSelectedVideo}
                setStory={setStory}
                setNewStory={setNewStory}
                setShowStoryCircle={setShowStoryCircle}
                setCreateImgOrVideo={setCreateImgOrVideo}
                setShowShare={setShowShare}
                showShare={showShare}
              />
            ) : selectedVideo ? (
              <ModalVideo
                userId={userId}
                createPost={createPost}
                choiceStory={choiceStory}
                selectedVideo={selectedVideo}
                setStory={setStory}
                setNewStory={setNewStory}
                setSelectedVideo={setSelectedVideo}
                setSelectedImage={setSelectedImage}
                setShowStoryCircle={setShowStoryCircle}
                setCreateImgOrVideo={setCreateImgOrVideo}
              />
            ) : (
              <>
                {createNewStory && (
                  <ModalCreatePublic
                    handleShowSelectImg={handleShowSelectImg}
                    setSelectedImage={setSelectedImage}
                    createPost={createPost}
                    showLoading={showLoading}
                    chooseFile={chooseFile}
                    showIconSuccess={showIconSuccess}
                  />
                )}

                {createPost && (
                  <ModalCreatePublic
                    handleShowSelectImg={handleShowSelectImg}
                    setSelectedImage={setSelectedImage}
                    createPost={createPost}
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

export default ModalSharePhoto;
