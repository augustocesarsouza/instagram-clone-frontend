import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Styled from './styled';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FollowersUserProps, FollowingListsProps } from '../../../templates/Profile/Profile';
import ControlUserFollowOrUnFollow from '../ControlUserFollowOrUnFollow/ControlUserFollowOrUnFollow';
import RemoveFollowers from '../RemoveFollowers/RemoveFollowers';

interface ModalFollowersProps {
  showModalFollower: boolean;
  setShowModalFollower: React.Dispatch<React.SetStateAction<boolean>>;
  userId: number | null;
  postCreatorId: number;
  followersUser: FollowersUserProps[] | null;
  firstFollowing: FollowingListsProps | null;
  setFollowersUser: React.Dispatch<React.SetStateAction<FollowersUserProps[] | null>>;
  setSeeFollowersOrFollowing: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface UsersSuggestionProps {
  id: number;
  name: string;
  email: string;
  imagePerfil: string;
}

const ModalFollowers = ({
  showModalFollower,
  followersUser,
  firstFollowing,
  setShowModalFollower,
  userId,
  postCreatorId,
  setFollowersUser,
  setSeeFollowersOrFollowing,
}: ModalFollowersProps) => {
  const handleCloseModal = () => {
    setShowModalFollower(false);
    setSeeFollowersOrFollowing(false);
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
              {postCreatorId === undefined ? (
                <RemoveFollowers
                  postCreatorId={postCreatorId}
                  followersUser={followersUser}
                  firstFollowing={firstFollowing}
                  userId={userId}
                  setFollowersUser={setFollowersUser}
                />
              ) : (
                <ControlUserFollowOrUnFollow userId={userId} postCreatorId={postCreatorId} />
              )}
            </Styled.ContainerInfoFollower>
          </Styled.ModalContent>
        </Styled.ContainerModal>
      )}
    </>
  );
};

export default ModalFollowers;
