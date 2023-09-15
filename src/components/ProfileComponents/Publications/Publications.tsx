import Url from '../../../Utils/Url';
import { DataUserOnlyProps } from '../../../templates/Profile/Profile';
import ModalSharePhoto from '../ModalSharePhoto/ModalSharePhoto';
import PhotoUser from '../PhotoUser/PhotoUser';
import * as Styled from './styled';
import { useState, useEffect, useLayoutEffect } from 'react';
import { AllPost } from '../../HomePage/CardPost/CardPost';

interface PublicationsProps {
  userId: number | null;
  postCreatorId: number | undefined;
  dataUserOnly: DataUserOnlyProps | null;
  setCountPublic: React.Dispatch<React.SetStateAction<number | null>>;
  createImgOrVideo: AllPost | null;
  ContainerMainRefWidth: React.MutableRefObject<HTMLDivElement | null>;
}

export interface DataPost {
  id: number;
  url: string;
  isImagem: number;
}

const Publications = ({
  userId,
  postCreatorId,
  dataUserOnly,
  setCountPublic,
  createImgOrVideo,
  ContainerMainRefWidth,
}: PublicationsProps) => {
  const [showModalShare, setShowModalShare] = useState(false);
  const [dataPostUser, setDataPostUser] = useState<DataPost[] | null>(null); //Se nao tiver nullo mostra os post se tiver null mostra compartilhar fotos
  const [callFetchPost, setCallFetchPost] = useState<{} | null>(null);

  const handleModalSharePhoto = () => {
    setShowModalShare(true);
  };

  const callFetchMethodo = (value: {}) => {
    setCallFetchPost(value);
  };

  useLayoutEffect(() => {
    const fetchPostUser = async (authorId: number) => {
      const res = await fetch(`${Url}/post/author/${authorId}`);
      if (res.status === 200) {
        const json = await res.json();
        setDataPostUser(json.data);
      }
    };

    if (postCreatorId !== undefined) {
      fetchPostUser(postCreatorId);
    } else {
      if (userId === null) return;
      fetchPostUser(userId);
    }
  }, [callFetchPost, userId, postCreatorId]);

  useEffect(() => {
    if (createImgOrVideo !== null) {
      setDataPostUser((prev) => (prev !== null ? [createImgOrVideo, ...prev] : prev));
    }
  }, [createImgOrVideo]);

  useLayoutEffect(() => {
    if (dataPostUser) {
      setCountPublic(dataPostUser.length);
    }
  }, [dataPostUser]);

  return (
    <>
      {dataPostUser && dataPostUser.length > 0 ? (
        <PhotoUser
          userId={userId}
          dataPostUser={dataPostUser}
          ContainerMainRefWidth={ContainerMainRefWidth}
        />
      ) : (
        <Styled.ContainerSharePhotos ref={ContainerMainRefWidth}>
          <Styled.WrapperShare>
            <Styled.WrapperCamera>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
                <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
              </svg>
            </Styled.WrapperCamera>
            <Styled.WrapperP>
              <Styled.P $paragraph="p1">Compartilhar fotos</Styled.P>
              <Styled.P $paragraph="p2">
                Quando você compartilhar fotos, elas aparecerão no seu perfil.
              </Styled.P>
              <Styled.ButtonShare onClick={handleModalSharePhoto}>
                Compartilhar sua primeira foto
              </Styled.ButtonShare>
            </Styled.WrapperP>
            {showModalShare && (
              <ModalSharePhoto
                showModalShare={showModalShare}
                setShowModalShare={setShowModalShare}
                userId={userId}
                dataUserOnly={dataUserOnly}
                callFetchMethodo={callFetchMethodo}
              />
            )}
          </Styled.WrapperShare>
        </Styled.ContainerSharePhotos>
      )}
    </>
  );
};

export default Publications;
