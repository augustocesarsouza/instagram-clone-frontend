import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Styled from './styled';
import { faPhotoFilm } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';

interface ModalCreatePublicProps {
  handleShowSelectImg: () => void;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
}

const ModalCreatePublic = ({ handleShowSelectImg, setSelectedImage }: ModalCreatePublicProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [changeColorIcon, setChangeColorIcon] = useState(false);

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
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

  return (
    <Styled.ContainerMain
      ref={ref}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDragDrop}
    >
      <Styled.ContainerCreatePost>
        <Styled.P $paragr="p1">Criar nova publicação</Styled.P>
      </Styled.ContainerCreatePost>
      <Styled.ContainerSelectImg>
        <Styled.WrapperSelect $changeiconcolor={String(changeColorIcon)}>
          <FontAwesomeIcon icon={faPhotoFilm} />
          <Styled.WrapperDragPhotos>
            <Styled.P $paragr="p2">Arraste as fotos e os vídeos aqui</Styled.P>
          </Styled.WrapperDragPhotos>
          <Styled.WrapperButton>
            <Styled.Button onClick={handleShowSelectImg}>Selecionar do computador</Styled.Button>
          </Styled.WrapperButton>
        </Styled.WrapperSelect>
      </Styled.ContainerSelectImg>
    </Styled.ContainerMain>
  );
};
export default ModalCreatePublic;
