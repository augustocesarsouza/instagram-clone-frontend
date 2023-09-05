import { useContext } from 'react';
import Url from '../../../Utils/Url';
import { ContextModalSharePhoto, ImgProcess } from '../ModalSharePhoto/ModalSharePhoto';
import * as Styled from './styled';

interface ModalDiscardPostProps {
  imgData: ImgProcess | undefined;
  showModalDiscardPost: boolean;
  setSelectedVideo: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
  setShowModalDiscardPost: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalDiscardPost = ({
  imgData,
  showModalDiscardPost,
  setSelectedVideo,
  setSelectedImage,
  setShowModalDiscardPost,
}: ModalDiscardPostProps) => {
  const contextModalSharePhoto = useContext(ContextModalSharePhoto);
  const { setCreateNewStory } = contextModalSharePhoto;

  const handleCancelDiscard = () => {
    setShowModalDiscardPost(false);
  };

  const handleDiscardPhoto = async () => {
    setSelectedVideo(null);
    setSelectedImage(null);
    setCreateNewStory(false);

    if (imgData === undefined) return;

    const res = await fetch(`${Url}/deleteimg`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(imgData),
    });
    const json = await res.json();
  };

  return (
    <>
      {showModalDiscardPost && (
        <Styled.ContainerModal>
          <Styled.ModalContent>
            <Styled.WrapperP>
              <Styled.P $paragr="p2">Descartar publicação?</Styled.P>
              <Styled.P $paragr="p3">Se você sair agora, suas edições não serão salvas.?</Styled.P>
            </Styled.WrapperP>
            <Styled.WrapperButton>
              <Styled.Button $button="discard" onClick={handleDiscardPhoto}>
                Descartar
              </Styled.Button>
              <Styled.Button $button="cancel" onClick={handleCancelDiscard}>
                Cancelar
              </Styled.Button>
            </Styled.WrapperButton>
          </Styled.ModalContent>
        </Styled.ContainerModal>
      )}
    </>
  );
};
export default ModalDiscardPost;
