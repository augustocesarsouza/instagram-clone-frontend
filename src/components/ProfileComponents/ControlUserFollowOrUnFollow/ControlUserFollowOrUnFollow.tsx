import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Url from '../../../Utils/Url';
import FollowOrUnFollow from '../FollowOrUnFollow/FollowOrUnFollow';
import { UsersSuggestionProps } from '../ModalFollowers/ModalFollowers';
import UsersFollowersData from '../UsersFollowersData/UsersFollowersData';
import * as Styled from './styled';
import { useState, useEffect, useLayoutEffect } from 'react';
import { DataUserOnlyProps } from '../../../templates/Profile/Profile';

interface ControlUserFollowOrUnFollowProps {
  userId: number | null;
  postCreatorId: number;
  dataUserOnly: DataUserOnlyProps;
}

const ControlUserFollowOrUnFollow = ({
  userId,
  postCreatorId,
}: ControlUserFollowOrUnFollowProps) => {
  const [followersFromFollowing, setFollowersFromFollowing] = useState<
    UsersSuggestionProps[] | null
  >(null);

  const [filteredFollowers, setFilteredFollowers] = useState<UsersSuggestionProps[] | null>(null);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (followersFromFollowing === null) return;
    const filtroName = followersFromFollowing.filter((f) =>
      f.name.toLowerCase().startsWith(e.target.value.toLowerCase())
    );
    setFilteredFollowers(filtroName);
    if (filtroName.length === followersFromFollowing.length) {
      setFilteredFollowers(filtroName.length > 0 ? filtroName : null);
    }
  };

  useLayoutEffect(() => {
    if (postCreatorId === undefined || userId === null) return;
    const fetchFollowersFromFollowing = async () => {
      const res = await fetch(
        `${Url}/user/followers/suggestion/${postCreatorId}/${userId}/${false}`
      );
      const json = await res.json();
      setFollowersFromFollowing(json.data);
    };
    fetchFollowersFromFollowing();
  }, [postCreatorId, userId]);

  return (
    <>
      <Styled.ContainerInputSearch>
        <Styled.Input placeholder="Pesquisar" onChange={handleChangeInput} />
      </Styled.ContainerInputSearch>
      {filteredFollowers !== null ? (
        <>
          {filteredFollowers &&
            filteredFollowers.map((fo) => (
              <Styled.ContainerFollower key={fo.id}>
                <UsersFollowersData fo={fo} />
                <FollowOrUnFollow fo={fo} userId={userId} postCreatorId={postCreatorId} />
              </Styled.ContainerFollower>
            ))}
        </>
      ) : (
        <>
          {followersFromFollowing &&
            followersFromFollowing.map((fo) => (
              <Styled.ContainerFollower key={fo.id}>
                <UsersFollowersData fo={fo} />
                <FollowOrUnFollow fo={fo} userId={userId} postCreatorId={postCreatorId} />
              </Styled.ContainerFollower>
            ))}
        </>
      )}
    </>
  );
};

export default ControlUserFollowOrUnFollow;
