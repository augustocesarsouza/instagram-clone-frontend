import Url from '../../../Utils/Url';
import { FollowersUserProps, FollowingListsProps } from '../../../templates/Profile/Profile';
import ModalDeleteFollowerFromProfileFollowing from '../ModalDeleteFollowerFromProfileFollowing/ModalDeleteFollowerFromProfilFollowing';
import { UsersSuggestionProps } from '../ModalFollowers/ModalFollowers';
import UsersFollowersData from '../UsersFollowersData/UsersFollowersData';
import * as Styled from './styled';
import { useState, useEffect } from 'react';

interface ControlUserFollowOrUnFollowProps {
  userId: number | null;
  postCreatorId: number;
  followersUser: FollowersUserProps[] | null;
  showModalConfirmDelete: (value: FollowingListsProps) => void;
}

export interface followingByUserLoggedProps {
  followerId: number;
  followingId: number;
  id: number;
}

const ControlUserFollowOrUnFollow = ({
  userId,
  postCreatorId,
  followersUser,
  showModalConfirmDelete,
}: ControlUserFollowOrUnFollowProps) => {
  const [dataUserDeleteFollowing, setDataUserDeleteFollowing] =
    useState<FollowingListsProps | null>(null);
  const [showConfirmDeleteFollowing, setShowConfirmDeleteFollowing] = useState(false);

  const showModalUserDeleteFollowing = (value: FollowingListsProps) => {
    setDataUserDeleteFollowing(value);
    setShowConfirmDeleteFollowing(true);
  };

  const [followersFromFollowing, setFollowersFromFollowing] = useState<
    UsersSuggestionProps[] | null
  >(null);

  useEffect(() => {
    if (postCreatorId === undefined || userId === null) return;
    const fetchFollowersFromFollowing = async () => {
      const res = await fetch(
        `${Url}/get/suggestion/followers/${postCreatorId}/${userId}/${false}`
      );
      const json = await res.json();
      setFollowersFromFollowing(json.data);
    };
    fetchFollowersFromFollowing();
  }, [postCreatorId, userId]);

  const [followingByUserLogged, setFollowingByUserLogged] = useState<
    followingByUserLoggedProps[] | []
  >([]);

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
      {followersFromFollowing !== null ? (
        <>
          {followersFromFollowing &&
            followersFromFollowing.map((fo) => (
              <Styled.ContainerFollower key={fo.id}>
                <UsersFollowersData fo={fo} />
                {fo.id !== userId && (
                  <>
                    {postCreatorId !== undefined && (
                      <Styled.WrapperButton>
                        {followingByUserLogged &&
                        followingByUserLogged.some((item) => item.followingId === fo.id) ? (
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
                  </>
                )}
              </Styled.ContainerFollower>
            ))}
          <ModalDeleteFollowerFromProfileFollowing
            userId={userId}
            showConfirmDeleteFollowing={showConfirmDeleteFollowing}
            dataUserDeleteFollowing={dataUserDeleteFollowing}
            setShowConfirmDeleteFollowing={setShowConfirmDeleteFollowing}
            setDataUserDeleteFollowing={setDataUserDeleteFollowing}
            setFollowingByUserLogged={setFollowingByUserLogged}
          />
        </>
      ) : (
        <>
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
                {postCreatorId === undefined && (
                  <Styled.WrapperButton>
                    <Styled.ButtonFo $follow={'Remove'} onClick={() => showModalConfirmDelete(fo)}>
                      Remover
                    </Styled.ButtonFo>
                  </Styled.WrapperButton>
                )}
              </Styled.ContainerFollower>
            ))}
        </>
      )}
    </>
  );
};

export default ControlUserFollowOrUnFollow;
