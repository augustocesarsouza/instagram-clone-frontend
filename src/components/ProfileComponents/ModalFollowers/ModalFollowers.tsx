import * as Styled from './styled';
import {
  DataUserOnlyProps,
  FollowersUserProps,
  FollowingListsProps,
} from '../../../templates/Profile/Profile';
import ControlUserFollowOrUnFollow from '../ControlUserFollowOrUnFollow/ControlUserFollowOrUnFollow';
import RemoveFollowers from '../RemoveFollowers/RemoveFollowers';
import { createContext, useEffect, useState } from 'react';

interface ModalFollowersProps {
  showModalFollower: boolean;
  userId: number | null;
  postCreatorId: number;
  dataUserOnly: DataUserOnlyProps;
  followersUser: FollowersUserProps[] | null;
  firstFollowing: FollowingListsProps | null;
  // followingUser: FollowingListsProps[] | null;
  // followingList: FollowingListsProps[] | null;
  // setFollowingUser: React.Dispatch<React.SetStateAction<FollowingListsProps[] | null>>;
  // setFollowingList: React.Dispatch<React.SetStateAction<FollowingListsProps[] | null>>;
  setFollowersUser: React.Dispatch<React.SetStateAction<FollowersUserProps[] | null>>;
  setShowModalFollower: React.Dispatch<React.SetStateAction<boolean>>;
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
  userId,
  postCreatorId,
  dataUserOnly,
  // followingUser,
  // followingList,
  // setFollowingUser,
  // setFollowingList,
  setFollowersUser,
  setShowModalFollower,
  setSeeFollowersOrFollowing,
}: ModalFollowersProps) => {
  return (
    <>
      {showModalFollower && (
        <Styled.ContainerModal>
          <Styled.ModalContent>
            <Styled.ContainerFollowers>
              <Styled.WrapperP>
                <Styled.PFollowers>Seguidores</Styled.PFollowers>
              </Styled.WrapperP>
            </Styled.ContainerFollowers>
            <Styled.ContainerInfoFollower>
              {postCreatorId === undefined ? (
                <RemoveFollowers
                  postCreatorId={postCreatorId}
                  followersUser={followersUser}
                  firstFollowing={firstFollowing}
                  userId={userId}
                  setFollowersUser={setFollowersUser}
                  setShowModalFollower={setShowModalFollower}
                  setSeeFollowersOrFollowing={setSeeFollowersOrFollowing}
                />
              ) : (
                <ControlUserFollowOrUnFollow
                  userId={userId}
                  postCreatorId={postCreatorId}
                  dataUserOnly={dataUserOnly}
                />
              )}
            </Styled.ContainerInfoFollower>
          </Styled.ModalContent>
        </Styled.ContainerModal>
      )}
    </>
  );
};

export default ModalFollowers;
