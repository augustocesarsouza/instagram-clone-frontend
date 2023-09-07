import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Styled from './styled';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import ModalUserDeleteFollowing from '../ModalUserDeleteFollowing/ModalUserDeleteFollowing';
import Url from '../../../Utils/Url';
import { FollowingListsProps } from '../../../templates/Profile/Profile';

interface ModalFollowingProps {
  showModalFollowing: boolean;
  setShowModalFollowing: React.Dispatch<React.SetStateAction<boolean>>;
  followingUser: FollowingListsProps[] | null;
  userId: number | null;
  postCreatorId: number;
  setFollowingList: React.Dispatch<React.SetStateAction<FollowingListsProps[] | null>>;
  followingList: FollowingListsProps[] | null;
  setFollowingUser: React.Dispatch<React.SetStateAction<FollowingListsProps[] | null>>;
  setSeeFollowersOrFollowing: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalFollowing = ({
  showModalFollowing,
  setShowModalFollowing,
  followingUser,
  setFollowingUser,
  userId,
  postCreatorId,
  setFollowingList,
  followingList,
  setSeeFollowersOrFollowing,
}: ModalFollowingProps) => {
  const [dataUserDeleteFollowing, setDataUserDeleteFollowing] =
    useState<FollowingListsProps | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const showModalUserDeleteFollowing = (value: FollowingListsProps) => {
    setDataUserDeleteFollowing(value);
    setShowConfirmDelete(true);
  };

  const handleFollowUser = (id: number) => {
    const userToFollow = followingUser?.find((item) => item.id === id);

    if (userToFollow && followingList) {
      setFollowingList((prev) => (prev !== null ? [...prev, userToFollow] : prev));
      setDataUserDeleteFollowing(null);
    }
  };

  const handleCloseModalFollowing = async () => {
    setShowModalFollowing(false);
    if (dataUserDeleteFollowing === null) return;
    setSeeFollowersOrFollowing(false);

    const followingDeleteJson = {
      FollowerId: userId,
      FollowingId: dataUserDeleteFollowing?.id,
    };

    const res = await fetch(`${Url}/follow`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(followingDeleteJson),
    });
    if (res.status === 200) {
      setFollowingUser((prev) =>
        prev !== null ? [...prev.filter((fo) => fo.id != followingDeleteJson.FollowingId)] : prev
      );
    }
  };

  return (
    <>
      {showModalFollowing && (
        <Styled.ContainerModal>
          <Styled.ModalContent>
            <Styled.ContainerFollowings>
              <Styled.WrapperP>
                <Styled.PFollowing>Seguindo</Styled.PFollowing>
              </Styled.WrapperP>
              <Styled.WrapperExit>
                <FontAwesomeIcon icon={faXmark} onClick={handleCloseModalFollowing} />
              </Styled.WrapperExit>
            </Styled.ContainerFollowings>
            <Styled.ContainerInfoFollowing>
              {followingUser &&
                followingUser.map((fo) => (
                  <Styled.ContainerFollowing key={fo.id}>
                    <Styled.WrapperOnlyImgAndName>
                      <Styled.WrapperImgFollowing>
                        <Styled.ImgFollowing src={fo.imagePerfil} />
                      </Styled.WrapperImgFollowing>
                      <Styled.WrapperInfoFollowing>
                        <Styled.NamePFollowing>{fo.name}</Styled.NamePFollowing>
                      </Styled.WrapperInfoFollowing>
                    </Styled.WrapperOnlyImgAndName>
                    {postCreatorId === undefined && (
                      <Styled.WrapperButton>
                        {followingList && followingList.some((item) => item.id === fo.id) ? (
                          <Styled.Button
                            onClick={() => showModalUserDeleteFollowing(fo)}
                            $follow=""
                          >
                            Seguindo
                          </Styled.Button>
                        ) : (
                          <Styled.Button
                            onClick={() => handleFollowUser(fo.id)}
                            $follow="button-follow"
                          >
                            Seguir
                          </Styled.Button>
                        )}
                      </Styled.WrapperButton>
                    )}
                  </Styled.ContainerFollowing>
                ))}
            </Styled.ContainerInfoFollowing>
            <ModalUserDeleteFollowing
              showConfirmDelete={showConfirmDelete}
              dataUserDeleteFollowing={dataUserDeleteFollowing}
              setDataUserDeleteFollowing={setDataUserDeleteFollowing}
              setShowConfirmDelete={setShowConfirmDelete}
              followingList={followingList}
              setFollowingList={setFollowingList}
            />
          </Styled.ModalContent>
        </Styled.ContainerModal>
      )}
    </>
  );
};

export default ModalFollowing;
