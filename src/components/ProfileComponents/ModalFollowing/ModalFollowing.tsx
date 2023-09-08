import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Styled from './styled';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useRef } from 'react';
import ModalUserDeleteFollowing from '../ModalUserDeleteFollowing/ModalUserDeleteFollowing';
import Url from '../../../Utils/Url';
import { FollowingListsProps } from '../../../templates/Profile/Profile';

interface ModalFollowingProps {
  showModalFollowing: boolean;
  userId: number | null;
  postCreatorId: number;
  followingUser: FollowingListsProps[] | null;
  followingList: FollowingListsProps[] | null;
  setFollowingUser: React.Dispatch<React.SetStateAction<FollowingListsProps[] | null>>;
  setFollowingList: React.Dispatch<React.SetStateAction<FollowingListsProps[] | null>>;
  setShowModalFollowing: React.Dispatch<React.SetStateAction<boolean>>;
  setSeeFollowersOrFollowing: React.Dispatch<React.SetStateAction<boolean>>;
}

interface followingByUserLoggedProps {
  followerId: number;
  followingId: number;
  id: number;
}

const ModalFollowing = ({
  showModalFollowing,
  userId,
  postCreatorId,
  followingUser,
  followingList,
  setFollowingUser,
  setFollowingList,
  setShowModalFollowing,
  setSeeFollowersOrFollowing,
}: ModalFollowingProps) => {
  const [dataUserDeleteFollowing, setDataUserDeleteFollowing] =
    useState<FollowingListsProps | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const lastButtonClick = useRef('');

  const [dataUserFollowerAndFollowingId, setDataUserFollowerAndFollowingId] =
    useState<followingByUserLoggedProps | null>(null);

  const showModalUserDeleteFollowing = (value: FollowingListsProps) => {
    if (userId === null) return;
    const followCreate = {
      followerId: userId,
      followingId: value.id,
      id: 0,
    };
    setDataUserFollowerAndFollowingId(followCreate);

    lastButtonClick.current = 'Seguindo';
    setDataUserDeleteFollowing(value);
    setShowConfirmDelete(true);
  };

  window.addEventListener(
    'beforeunload',
    (e) => {
      e.preventDefault();

      if (lastButtonClick.current === 'Seguir') return;

      if (dataUserFollowerAndFollowingId && lastButtonClick.current === 'Seguindo') {
        const deleteFollow = {
          FollowerId: dataUserFollowerAndFollowingId.followerId,
          FollowingId: dataUserFollowerAndFollowingId.followingId,
        };

        const handleDeleteFollow = async () => {
          const res = await fetch(`${Url}/follow`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(deleteFollow),
          });
        };
        handleDeleteFollow();
      }
    },
    true
  );

  const handleFollowUser = (id: number) => {
    lastButtonClick.current = 'Seguir';
    const userToFollow = followingUser?.find((item) => item.id === id);

    if (userToFollow && followingList) {
      setFollowingList((prev) => (prev !== null ? [...prev, userToFollow] : prev));
      setDataUserDeleteFollowing(null);
    }
  };

  const handleCloseModalFollowing = async () => {
    setShowModalFollowing(false);
    if (lastButtonClick.current === 'Seguir') return;
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
