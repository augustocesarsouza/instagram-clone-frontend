import Url from '../../../Utils/Url';
import { FollowingListsProps } from '../../../templates/Profile/Profile';
import ModalDeleteFollowerFromProfileFollowing from '../ModalDeleteFollowerFromProfileFollowing/ModalDeleteFollowerFromProfilFollowing';
import { UsersSuggestionProps } from '../ModalFollowers/ModalFollowers';
import * as Styled from './styled';
import { useEffect, useState } from 'react';

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
  const [followingByUserLogged, setFollowingByUserLogged] = useState<
    followingByUserLoggedProps[] | []
  >([]);

  const [dataUserDeleteFollowing, setDataUserDeleteFollowing] =
    useState<FollowingListsProps | null>(null);
  const [showConfirmDeleteFollowing, setShowConfirmDeleteFollowing] = useState(false);

  const showModalUserDeleteFollowing = (value: FollowingListsProps) => {
    setDataUserDeleteFollowing(value);
    setShowConfirmDeleteFollowing(true);
  };

  useEffect(() => {
    if (postCreatorId === undefined) return;
    const fetchFollowingByUserLogged = async () => {
      const res = await fetch(`${Url}/followallfollowingfromuser/${userId}`);
      const json = await res.json();
      setFollowingByUserLogged(json.data);
    };
    fetchFollowingByUserLogged();
  }, [postCreatorId, userId]);

  const handleFollowUser = async (followingId: number) => {
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
      setFollowingByUserLogged((prev) => (prev !== null ? [...prev, json.data] : prev));
    }
  };

  return (
    <>
      {fo.id !== userId && (
        <>
          {postCreatorId !== undefined && (
            <Styled.WrapperButton>
              {followingByUserLogged &&
              followingByUserLogged.some((item) => item.followingId === fo.id) ? (
                <Styled.Button onClick={() => showModalUserDeleteFollowing(fo)} $follow="">
                  Seguindo
                </Styled.Button>
              ) : (
                <Styled.Button onClick={() => handleFollowUser(fo.id)} $follow="button-follow">
                  Seguir
                </Styled.Button>
              )}
            </Styled.WrapperButton>
          )}
        </>
      )}

      <ModalDeleteFollowerFromProfileFollowing
        userId={userId}
        showConfirmDeleteFollowing={showConfirmDeleteFollowing}
        dataUserDeleteFollowing={dataUserDeleteFollowing}
        setShowConfirmDeleteFollowing={setShowConfirmDeleteFollowing}
        setDataUserDeleteFollowing={setDataUserDeleteFollowing}
        setFollowingByUserLogged={setFollowingByUserLogged}
      />
    </>
  );
};

export default FollowOrUnFollow;
