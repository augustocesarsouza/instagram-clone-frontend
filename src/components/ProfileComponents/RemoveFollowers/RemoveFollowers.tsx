import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Url from '../../../Utils/Url';
import { FollowersUserProps, FollowingListsProps } from '../../../templates/Profile/Profile';
import { UsersSuggestionProps } from '../ModalFollowers/ModalFollowers';
import ModalUserDeleteFollower from '../ModalUserDeleteFollower/ModalUserDeleteFollower';
import * as Styled from './styled';
import { useState, useEffect } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import SuggestionComponent from '../SuggestionComponent/SuggestionComponent';

interface RemoveFollowersProps {
  postCreatorId: number;
  followersUser: FollowersUserProps[] | null;
  firstFollowing: FollowingListsProps | null;
  userId: number | null;
  setFollowersUser: React.Dispatch<React.SetStateAction<FollowersUserProps[] | null>>;
  setShowModalFollower: React.Dispatch<React.SetStateAction<boolean>>;
  setSeeFollowersOrFollowing: React.Dispatch<React.SetStateAction<boolean>>;
}

const RemoveFollowers = ({
  postCreatorId,
  followersUser,
  firstFollowing,
  userId,
  setFollowersUser,
  setShowModalFollower,
  setSeeFollowersOrFollowing,
}: RemoveFollowersProps) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [dataUserDeleteFollower, setDataUserDeleteFollower] = useState<FollowingListsProps | null>(
    null
  );

  const [filteredFollowerArray, setFilteredFollowerArray] = useState<FollowersUserProps[] | null>(
    null
  );

  const handleCloseModal = () => {
    setShowModalFollower(false);
    setSeeFollowersOrFollowing(false);
  };

  const showModalConfirmDelete = (value: FollowingListsProps) => {
    setDataUserDeleteFollower(value);
    setShowConfirmDelete(true);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (followersUser) {
      const filterArray = followersUser.filter((foo) => foo.name.startsWith(e.target.value));
      setFilteredFollowerArray(filterArray);

      if (filterArray.length === followersUser.length) {
        setFilteredFollowerArray(filterArray.length > 0 ? filterArray : null);
      }
    }
  };

  return (
    <>
      {/* <Styled.WrapperExit>
        <FontAwesomeIcon icon={faXmark} onClick={handleCloseModal} />
      </Styled.WrapperExit> */}
      <Styled.ContainerInputSearch>
        <Styled.Input placeholder="Pesquisar" onChange={handleChangeInput} />
      </Styled.ContainerInputSearch>
      {filteredFollowerArray !== null ? (
        <>
          {filteredFollowerArray &&
            filteredFollowerArray.map((fo) => (
              <Styled.ContainerFollower key={fo.id}>
                <Styled.WrapperOnlyImgAndName>
                  <Styled.WrapperImgFollower>
                    <Styled.ImgFollower src={fo.imagePerfil} />
                  </Styled.WrapperImgFollower>
                  <Styled.WrapperInfoFollower>
                    <Styled.NamePFollower>{fo.name}</Styled.NamePFollower>
                  </Styled.WrapperInfoFollower>
                </Styled.WrapperOnlyImgAndName>

                <Styled.WrapperButton>
                  <Styled.ButtonFo $follow={'Remove'} onClick={() => showModalConfirmDelete(fo)}>
                    Remover
                  </Styled.ButtonFo>
                </Styled.WrapperButton>
              </Styled.ContainerFollower>
            ))}
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

                <Styled.WrapperButton>
                  <Styled.ButtonFo $follow={'Remove'} onClick={() => showModalConfirmDelete(fo)}>
                    Remover
                  </Styled.ButtonFo>
                </Styled.WrapperButton>
              </Styled.ContainerFollower>
            ))}
        </>
      )}
      <SuggestionComponent
        postCreatorId={postCreatorId}
        firstFollowing={firstFollowing}
        userId={userId}
      />

      <ModalUserDeleteFollower
        showConfirmDelete={showConfirmDelete}
        setShowConfirmDelete={setShowConfirmDelete}
        dataUserDeleteFollower={dataUserDeleteFollower}
        userId={userId}
        setFollowersUser={setFollowersUser}
      />
    </>
  );
};

export default RemoveFollowers;
