import { DataPost } from '../PostComments/PostComments';
import * as Styled from './styled';
import { memo } from 'react';

interface CardPublicationOwnerProps {
  dataPost: DataPost | null;
}

const CardPublicationOwner = ({ dataPost }: CardPublicationOwnerProps) => {
  return (
    <>
      {dataPost && (
        <Styled.ContainerCreatePostUser>
          <Styled.ContainerImgUser>
            <Styled.ImgUser src={dataPost.user.imagePerfil} />
          </Styled.ContainerImgUser>
          <Styled.ContainerInfoUser>
            <Styled.P>{dataPost.user.name}</Styled.P>
          </Styled.ContainerInfoUser>
        </Styled.ContainerCreatePostUser>
      )}
    </>
  );
};

export default memo(CardPublicationOwner);
