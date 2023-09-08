import { FollowersUserProps, FollowingListsProps } from '../../../templates/Profile/Profile';
import * as Styled from './styled';

interface UserProfileStatsProps {
  countPublic: number | null;
  handleFollower: () => void;
  handleFollowing: () => void;
  followersUser: FollowersUserProps[] | null;
  followingList: FollowingListsProps[] | null;
}

const UserProfileStats = ({
  countPublic,
  handleFollower,
  handleFollowing,
  followersUser,
  followingList,
}: UserProfileStatsProps) => {
  return (
    <>
      <Styled.Ul>
        <Styled.li>
          <Styled.span>
            <Styled.PNumber>{countPublic == null ? 0 : countPublic}</Styled.PNumber> publicação
          </Styled.span>
        </Styled.li>
        <Styled.li>
          <Styled.link onClick={handleFollower}>
            <Styled.PNumber>{followersUser && followersUser.length}</Styled.PNumber> seguidores
          </Styled.link>
        </Styled.li>
        <Styled.li>
          <Styled.link onClick={handleFollowing}>
            {followingList && <Styled.PNumber>{followingList.length}</Styled.PNumber>}
            seguindo
          </Styled.link>
        </Styled.li>
      </Styled.Ul>
      <Styled.WrapperName>
        <Styled.P>Augusto cesar</Styled.P>
      </Styled.WrapperName>
    </>
  );
};

export default UserProfileStats;
