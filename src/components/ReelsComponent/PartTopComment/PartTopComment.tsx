import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Styled from './styled';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface PartTopCommentProps {
  setOpenComment: React.Dispatch<React.SetStateAction<boolean>>;
}

const PartTopComment = ({ setOpenComment }: PartTopCommentProps) => {
  const closeModal = () => {
    setOpenComment(false);
  };

  return (
    <Styled.ContainerTitleComment>
      <Styled.ContainerX>
        <FontAwesomeIcon icon={faXmark} onClick={closeModal} />
      </Styled.ContainerX>
      <Styled.ContainerTitle>
        <Styled.Paragraph>Comentários</Styled.Paragraph>
      </Styled.ContainerTitle>
    </Styled.ContainerTitleComment>
  );
};

export default PartTopComment;
