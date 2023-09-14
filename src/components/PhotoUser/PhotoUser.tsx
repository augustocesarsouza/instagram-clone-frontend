import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CommentPhotoUser from '../CommentPhotoUser/CommentPhotoUser';
import { DataPost } from '../ProfileComponents/Publications/Publications';
import * as Styled from './styled';
import { useState } from 'react';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

interface PhotoUserProps {
  userId: number | null;
  dataPostUser: DataPost[] | null;
  ContainerMainRefWidth: React.MutableRefObject<HTMLDivElement | null>;
}

const PhotoUser = ({ userId, dataPostUser, ContainerMainRefWidth }: PhotoUserProps) => {
  const [dataPhotoComments, setDataPhotoComments] = useState<DataPost | null>(null);

  const handleShowComments = async (post: DataPost) => {
    setDataPhotoComments(post);
  };

  return (
    <Styled.WrapperMain>
      <Styled.WrapperMainPublic>
        <Styled.ContainerMain ref={ContainerMainRefWidth}>
          {dataPostUser &&
            dataPostUser.map((post) => (
              <Styled.ContainerImgAndVideo key={post.id}>
                {post.isImagem == 1 && (
                  <Styled.ContainerImg onClick={() => handleShowComments(post)}>
                    <Styled.Img src={post.url} />
                  </Styled.ContainerImg>
                )}
                {post.isImagem == 0 && (
                  <Styled.WrapperVideo onClick={() => handleShowComments(post)}>
                    <Styled.Video autoPlay={false}>
                      <Styled.Source src={post.url} type="video/mp4" />
                    </Styled.Video>
                    <Styled.WrapperVideoIcon>
                      <FontAwesomeIcon icon={faPlay} />
                    </Styled.WrapperVideoIcon>
                  </Styled.WrapperVideo>
                )}
              </Styled.ContainerImgAndVideo>
            ))}
        </Styled.ContainerMain>

        <CommentPhotoUser
          userId={userId}
          dataPhotoComments={dataPhotoComments}
          setDataPhotoComments={setDataPhotoComments}
        />
      </Styled.WrapperMainPublic>
    </Styled.WrapperMain>
  );
};

export default PhotoUser;
