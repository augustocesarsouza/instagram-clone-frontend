import { FollowersUserProps, FollowingListsProps } from '../../../templates/Profile/Profile';
import * as Styled from './styled';

interface UserProfileStatsSmallerSizeProps {
  followersUser: FollowersUserProps[] | null;
  followingList: FollowingListsProps[] | null;
  countPublic: number | null;
  handleFollower: () => void;
  handleFollowing: () => void;
}

const UserProfileStatsSmallerSize = ({
  followersUser,
  followingList,
  countPublic,
  handleFollower,
  handleFollowing,
}: UserProfileStatsSmallerSizeProps) => {
  return (
    <Styled.ContainerMain>
      <Styled.ContainerStatusUser>
        <Styled.Ul>
          <Styled.li>
            {countPublic && (
              <>
                <Styled.PNumber>{countPublic}</Styled.PNumber>
                <Styled.span>publicação</Styled.span>
              </>
            )}
          </Styled.li>
          <Styled.li>
            <Styled.link onClick={handleFollower}>
              <Styled.PNumber>{followersUser && followersUser.length}</Styled.PNumber>{' '}
              <Styled.span>seguidores</Styled.span>
            </Styled.link>
          </Styled.li>
          <Styled.li>
            <Styled.link onClick={handleFollowing}>
              {followingList && <Styled.PNumber>{followingList.length}</Styled.PNumber>}
              <Styled.span>seguindo</Styled.span>
            </Styled.link>
          </Styled.li>
        </Styled.Ul>
      </Styled.ContainerStatusUser>
    </Styled.ContainerMain>
  );
};
export default UserProfileStatsSmallerSize;
