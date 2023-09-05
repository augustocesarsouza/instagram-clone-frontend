import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Styled from './styled';
import { faCheck, faPhotoFilm } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';

interface ModalCreatePublicProps {
  handleShowSelectImg: () => void;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
  createPost: boolean;
  showLoading: boolean;
  chooseFile: boolean;
  showIconSuccess: boolean;
}

const ModalCreatePublic = ({
  handleShowSelectImg,
  setSelectedImage,
  createPost,
  showLoading,
  chooseFile,
  showIconSuccess,
}: ModalCreatePublicProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [changeColorIcon, setChangeColorIcon] = useState(false);

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    // console.log('drag enter');
    // console.log(event.dataTransfer);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setChangeColorIcon(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setChangeColorIcon(false);
  };

  const handleDragDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target?.result as string;
        setSelectedImage(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    document.body.style.overflowY = 'hidden';
  }, []);

  return (
    <>
      {chooseFile && (
        <Styled.ContainerMain
          ref={ref}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDragDrop}
        >
          <Styled.ContainerCreatePost>
            {createPost ? (
              <Styled.P $paragr="p1">Criar nova publicação</Styled.P>
            ) : (
              <Styled.P $paragr="p1">Criar Novo Story</Styled.P>
            )}
          </Styled.ContainerCreatePost>
          <Styled.ContainerSelectImg>
            <Styled.WrapperSelect $changeiconcolor={String(changeColorIcon)}>
              <FontAwesomeIcon icon={faPhotoFilm} />
              <Styled.WrapperDragPhotos>
                <Styled.P $paragr="p2">Arraste as fotos e os vídeos aqui</Styled.P>
              </Styled.WrapperDragPhotos>
              <Styled.WrapperButton>
                <Styled.Button onClick={handleShowSelectImg}>
                  Selecionar do computador
                </Styled.Button>
              </Styled.WrapperButton>
            </Styled.WrapperSelect>
          </Styled.ContainerSelectImg>
        </Styled.ContainerMain>
      )}
      {showLoading && (
        <Styled.BallWrapper>
          <Styled.BouncingBorder $stopspin={String(showLoading)} />
          <Styled.BallCenter>
            {showIconSuccess && <FontAwesomeIcon icon={faCheck} style={{ color: '#E91E63' }} />}
          </Styled.BallCenter>
        </Styled.BallWrapper>
      )}
    </>
  );
};
export default ModalCreatePublic;
