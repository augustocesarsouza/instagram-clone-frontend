import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Styled from './styled';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import ModalUserDeleteFollower from '../ModalUserDeleteFollower/ModalUserDeleteFollower';
import { FollowersUserProps, FollowingListsProps } from '../../../templates/Profile/Profile';

interface ModalFollowersProps {
  showModalFollower: boolean;
  setShowModalFollower: React.Dispatch<React.SetStateAction<boolean>>;
  userId: number | null;
  followersUser: FollowersUserProps[] | null;
  setFollowersUser: React.Dispatch<React.SetStateAction<FollowersUserProps[] | null>>;
  setSeeFollowersOrFollowing: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalFollowers = ({
  showModalFollower,
  followersUser,
  setShowModalFollower,
  userId,
  setFollowersUser,
  setSeeFollowersOrFollowing,
}: ModalFollowersProps) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [dataUserDeleteFollower, setDataUserDeleteFollower] = useState<FollowingListsProps | null>(
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

  const [filteredFollowerArray, setFilteredFollowerArray] = useState<FollowersUserProps[] | null>(
    null
  );

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
            <Styled.ContainerInputSearch>
              <Styled.Input placeholder="Pesquisar" onChange={handleChangeInput} />
            </Styled.ContainerInputSearch>
            <Styled.ContainerInfoFollower>
              {filteredFollowerArray !== null ? (
                <>
                  {filteredFollowerArray &&
                    filteredFollowerArray.map((fo) => (
                      <>
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
                            <Styled.Button onClick={() => showModalConfirmDelete(fo)}>
                              Remover
                            </Styled.Button>
                          </Styled.WrapperButton>
                        </Styled.ContainerFollower>
                      </>
                    ))}
                </>
              ) : (
                <>
                  {followersUser &&
                    followersUser.map((fo) => (
                      <>
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
                            <Styled.Button onClick={() => showModalConfirmDelete(fo)}>
                              Remover
                            </Styled.Button>
                          </Styled.WrapperButton>
                        </Styled.ContainerFollower>
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
                            <Styled.Button onClick={() => showModalConfirmDelete(fo)}>
                              Remover
                            </Styled.Button>
                          </Styled.WrapperButton>
                        </Styled.ContainerFollower>
                      </>
                    ))}
                </>
              )}
              <Styled.ContainerSuggestionForYou>
                <Styled.P>Sugestões para você</Styled.P>
              </Styled.ContainerSuggestionForYou>
            </Styled.ContainerInfoFollower>
            <ModalUserDeleteFollower
              showConfirmDelete={showConfirmDelete}
              setShowConfirmDelete={setShowConfirmDelete}
              dataUserDeleteFollower={dataUserDeleteFollower}
              userId={userId}
              setFollowersUser={setFollowersUser}
            />
          </Styled.ModalContent>
        </Styled.ContainerModal>
      )}
    </>
  );
};

export default ModalFollowers;
