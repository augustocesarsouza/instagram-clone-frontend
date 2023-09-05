import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Url from '../../Utils/Url';
import CommentPhotoUser from '../CommentPhotoUser/CommentPhotoUser';
import { DataPost, User } from '../ProfileComponents/Publications/Publications';
import * as Styled from './styled';
import { useState, useEffect, useRef } from 'react';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

interface PhotoUserProps {
  userId: number | null;
  dataPostUser: DataPost[] | null;
  ContainerMainRefWidth: React.MutableRefObject<HTMLDivElement | null>;
}

export interface Comments {
  id: number;
  text: string;
  createdAt: string;
  user: User;
}

const PhotoUser = ({ userId, dataPostUser, ContainerMainRefWidth }: PhotoUserProps) => {
  const [showModalComment, setShowModalComment] = useState(false);
  const [dataComments, setDataComments] = useState<Comments[]>([]);
  const [dataPhotoComments, setDataPhotoComments] = useState<DataPost | null>(null);
  const [callFetch, setCallFetch] = useState({});

  const callFetchMethod = (value: {}) => {
    setCallFetch(value);
  };

  const handleShowComments = async (post: DataPost) => {
    setDataPhotoComments(post);
  };

  useEffect(() => {
    const fetchComments = async (dataPhotoComments: DataPost | null) => {
      if (dataPhotoComments) {
        const res = await fetch(`${Url}/comments/${dataPhotoComments.id}`);
        if (res.status === 200) {
          const json = await res.json();

          setDataComments(json.data);
          setShowModalComment(true);
        }
      }
    };

    fetchComments(dataPhotoComments);
  }, [dataPhotoComments, callFetch]);

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
          dataComments={dataComments}
          dataPhotoComments={dataPhotoComments}
          showModalComment={showModalComment}
          callFetchMethod={callFetchMethod}
          setShowModalComment={setShowModalComment}
          setDataPhotoComments={setDataPhotoComments}
        />
      </Styled.WrapperMainPublic>
    </Styled.WrapperMain>
  );
};

export default PhotoUser;
