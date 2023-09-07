import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Url from '../../../Utils/Url';
import {
  ContextProfile,
  ContextProfileProps,
  DataUserOnlyProps,
  FollowingListsProps,
} from '../../../templates/Profile/Profile';
import ModalDeleteFollowerFromProfileFollowing from '../ModalDeleteFollowerFromProfileFollowing/ModalDeleteFollowerFromProfilFollowing';
import { UsersSuggestionProps } from '../ModalFollowers/ModalFollowers';
import * as Styled from './styled';
import { useEffect, useState, useContext, useLayoutEffect } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

interface FollowOrUnFollowProps {
  fo: UsersSuggestionProps;
  userId: number | null;
  postCreatorId: number;
}

export interface followingByUserLoggedProps {
  followerId: number;
  followingId: number;
  id: number;
}

const FollowOrUnFollow = ({ fo, userId, postCreatorId }: FollowOrUnFollowProps) => {
  const useContextModalFollowers = useContext<ContextProfileProps | null>(ContextProfile);

  const [mockFollowingByUserLogged, setMockFollowingByUserLogged] = useState<
    followingByUserLoggedProps[] | []
  >([]);

  const [dataUserDeleteFollowing, setDataUserDeleteFollowing] =
    useState<FollowingListsProps | null>(null);

  const [showConfirmDeleteFollowing, setShowConfirmDeleteFollowing] = useState(false);

  const [dataUserFollowerAndFollowingId, setDataUserFollowerAndFollowingId] =
    useState<followingByUserLoggedProps | null>(null);

  const [lastButtonClick, setLastButtonClick] = useState('');

  const handleCloseModal = async () => {
    if (useContextModalFollowers === null) return;
    useContextModalFollowers.setShowModalFollower(false);
    useContextModalFollowers.setSeeFollowersOrFollowing(false);

    if (lastButtonClick === 'Seguir') return;

    if (dataUserFollowerAndFollowingId && lastButtonClick === 'Seguindo') {
      const deleteFollow = {
        FollowerId: dataUserFollowerAndFollowingId.followerId,
        FollowingId: dataUserFollowerAndFollowingId.followingId,
      };

      const res = await fetch(`${Url}/follow`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deleteFollow),
      });
    }
  };

  const showModalUserDeleteFollowing = (value: FollowingListsProps) => {
    if (userId === null) return;
    const follow = {
      followerId: userId,
      followingId: value.id,
      id: 0,
    };
    setDataUserFollowerAndFollowingId(follow);
    setLastButtonClick('Seguindo');
    setDataUserDeleteFollowing(value);
    setShowConfirmDeleteFollowing(true);
  };

  useLayoutEffect(() => {
    if (postCreatorId === undefined) return;
    const fetchFollowingByUserLogged = async () => {
      const res = await fetch(`${Url}/followallfollowingfromuser/${userId}`);
      const json = await res.json();
      setMockFollowingByUserLogged(json.data);
    };
    fetchFollowingByUserLogged();
  }, [postCreatorId, userId]);

  const handleFollowUser = async (followingId: number) => {
    setLastButtonClick('Seguir');
    if (dataUserFollowerAndFollowingId) {
      setMockFollowingByUserLogged((prev) =>
        prev !== null ? [...prev, dataUserFollowerAndFollowingId] : prev
      );
      return;
    }

    if (userId == null) return;
    const jsonFollow = {
      FollowerId: userId,
      FollowingId: followingId,
    };

    const res = await fetch(`${Url}/follow`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(jsonFollow),
    });

    if (res.status === 200) {
      const json = await res.json();
      setDataUserFollowerAndFollowingId(json.data);
      setMockFollowingByUserLogged((prev) => (prev !== null ? [...prev, json.data] : prev));
    }
  };

  return (
    <>
      <Styled.WrapperExit>
        <FontAwesomeIcon icon={faXmark} onClick={handleCloseModal} />
      </Styled.WrapperExit>
      {fo.id !== userId && (
        <>
          <Styled.WrapperButton>
            {mockFollowingByUserLogged &&
            mockFollowingByUserLogged.some((item) => item.followingId === fo.id) ? (
              <>
                <Styled.Button onClick={() => showModalUserDeleteFollowing(fo)} $follow="">
                  Seguindo
                </Styled.Button>
              </>
            ) : (
              <Styled.Button onClick={() => handleFollowUser(fo.id)} $follow="button-follow">
                Seguir
              </Styled.Button>
            )}
          </Styled.WrapperButton>
        </>
      )}

      <ModalDeleteFollowerFromProfileFollowing
        userId={userId}
        showConfirmDeleteFollowing={showConfirmDeleteFollowing}
        dataUserDeleteFollowing={dataUserDeleteFollowing}
        setShowConfirmDeleteFollowing={setShowConfirmDeleteFollowing}
        setDataUserDeleteFollowing={setDataUserDeleteFollowing}
        setMockFollowingByUserLogged={setMockFollowingByUserLogged}
      />
    </>
  );
};

export default FollowOrUnFollow;
