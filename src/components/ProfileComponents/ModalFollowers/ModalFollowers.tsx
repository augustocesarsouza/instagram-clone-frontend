import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Styled from './styled';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import ModalUserDeleteFollower from '../ModalUserDeleteFollower/ModalUserDeleteFollower';
import { FollowersUserProps, FollowingListsProps } from '../../../templates/Profile/Profile';

interface ModalFollowersProps {
  showModalFollower: boolean;
  setShowModalFollower: React.Dispatch<React.SetStateAction<boolean>>;
  userId: number | null;
  followersUser: FollowersUserProps[] | null;
  setFollowersUser: React.Dispatch<React.SetStateAction<FollowersUserProps[] | null>>;
  setSeeFollowersOrFollowing: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalFollowers = ({
  showModalFollower,
  followersUser,
  setShowModalFollower,
  userId,
  setFollowersUser,
  setSeeFollowersOrFollowing,
}: ModalFollowersProps) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [dataUserDeleteFollower, setDataUserDeleteFollower] = useState<FollowingListsProps | null>(
    null
  );

  const handleCloseModal = () => {
    setShowModalFollower(false);
    setSeeFollowersOrFollowing(false);
  };

  const showModalConfirmDelete = (value: FollowingListsProps) => {
    setDataUserDeleteFollower(value);
    setShowConfirmDelete(true);
  };

  return (
    <>
      {showModalFollower && (
        <Styled.ContainerModal>
          <Styled.ModalContent>
            <Styled.ContainerFollowers>
              <Styled.WrapperP>
                <Styled.PFollowers>Seguidores</Styled.PFollowers>
              </Styled.WrapperP>
              <Styled.WrapperExit>
                <FontAwesomeIcon icon={faXmark} onClick={handleCloseModal} />
              </Styled.WrapperExit>
            </Styled.ContainerFollowers>
            <Styled.ContainerInfoFollower>
              {followersUser &&
                followersUser.map((fo) => (
                  <Styled.ContainerFollower key={fo.id}>
                    <Styled.WrapperOnlyImgAndName>
                      <Styled.WrapperImgFollower>
                        <Styled.ImgFollower src={fo.imagePerfil} />
                      </Styled.WrapperImgFollower>
                      <Styled.WrapperInfoFollower>
                        <Styled.NamePFollower>{fo.name}</Styled.NamePFollower>
                      </Styled.WrapperInfoFollower>
                    </Styled.WrapperOnlyImgAndName>
                    <Styled.WrapperButton>
                      <Styled.Button onClick={() => showModalConfirmDelete(fo)}>
                        Remover
                      </Styled.Button>
                    </Styled.WrapperButton>
                  </Styled.ContainerFollower>
                ))}
            </Styled.ContainerInfoFollower>
            <ModalUserDeleteFollower
              showConfirmDelete={showConfirmDelete}
              setShowConfirmDelete={setShowConfirmDelete}
              dataUserDeleteFollower={dataUserDeleteFollower}
              userId={userId}
              setFollowersUser={setFollowersUser}
            />
          </Styled.ModalContent>
        </Styled.ContainerModal>
      )}
    </>
  );
};

export default ModalFollowers;
