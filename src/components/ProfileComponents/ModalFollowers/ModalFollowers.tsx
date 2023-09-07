import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Styled from './styled';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import ModalUserDeleteFollower from '../ModalUserDeleteFollower/ModalUserDeleteFollower';
import { FollowersUserProps, FollowingListsProps } from '../../../templates/Profile/Profile';
import Url from '../../../Utils/Url';
import ModalUserDeleteFollowing from '../ModalUserDeleteFollowing/ModalUserDeleteFollowing';
import ModalDeleteFollowerFromProfileFollowing from '../ModalDeleteFollowerFromProfileFollowing/ModalDeleteFollowerFromProfilFollowing';
import ControlUserFollowOrUnFollow from '../ControlUserFollowOrUnFollow/ControlUserFollowOrUnFollow';

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
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [dataUserDeleteFollower, setDataUserDeleteFollower] = useState<FollowingListsProps | null>(
    null
  );

  // const [followingByUserLogged, setFollowingByUserLogged] = useState<
  //   followingByUserLoggedProps[] | []
  // >([]);

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

  const [usersSuggestion, setUsersSuggestion] = useState<UsersSuggestionProps[] | null>(null);

  useEffect(() => {
    if (postCreatorId !== undefined) return;

    const fetchUsersSuggestion = async () => {
      if (firstFollowing === null || userId === null || firstFollowing === undefined) return;
      //Aqui você tem sugestão do followers do seus amigo tem que fazer com pessoas aleatorias tbm porque se voc~e nao tiver nenhum seguidor lascou ele nao te segure nada!

      const res = await fetch(
        `${Url}/get/suggestion/followers/${firstFollowing.id}/${userId}/${true}`
      );
      const json = await res.json();
      setUsersSuggestion(json.data);
    };
    fetchUsersSuggestion();
  }, [firstFollowing, userId, postCreatorId]);

  // const [followersFromFollowing, setFollowersFromFollowing] = useState<
  //   UsersSuggestionProps[] | null
  // >(null);

  // useEffect(() => {
  //   if (postCreatorId === undefined || userId === null) return;
  //   const fetchFollowersFromFollowing = async () => {
  //     const res = await fetch(
  //       `${Url}/get/suggestion/followers/${postCreatorId}/${userId}/${false}`
  //     );
  //     const json = await res.json();
  //     setFollowersFromFollowing(json.data);
  //   };
  //   fetchFollowersFromFollowing();
  // }, [postCreatorId, userId]);

  // useEffect(() => {
  //   if (postCreatorId === undefined) return;
  //   const fetchFollowingByUserLogged = async () => {
  //     const res = await fetch(`${Url}/followallfollowingfromuser/${userId}`);
  //     const json = await res.json();
  //     setFollowingByUserLogged(json.data);
  //   };
  //   fetchFollowingByUserLogged();
  // }, [postCreatorId, userId]);

  // const [dataUserDeleteFollowing, setDataUserDeleteFollowing] =
  //   useState<FollowingListsProps | null>(null);
  // const [showConfirmDeleteFollowing, setShowConfirmDeleteFollowing] = useState(false);

  // const showModalUserDeleteFollowing = (value: FollowingListsProps) => {
  //   setDataUserDeleteFollowing(value);
  //   setShowConfirmDeleteFollowing(true);
  // };

  // const handleFollowUser = async (followingId: number) => {
  //   if (userId == null) return;
  //   const jsonFollow = {
  //     FollowerId: userId,
  //     FollowingId: followingId,
  //   };

  //   const res = await fetch(`${Url}/follow`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-type': 'application/json',
  //     },
  //     body: JSON.stringify(jsonFollow),
  //   });

  //   if (res.status === 200) {
  //     const json = await res.json();
  //     setFollowingByUserLogged((prev) => (prev !== null ? [...prev, json.data] : prev));
  //   }
  // };

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
                          <Styled.ButtonFo
                            $follow={'Remove'}
                            onClick={() => showModalConfirmDelete(fo)}
                          >
                            Remover
                          </Styled.ButtonFo>
                        </Styled.WrapperButton>
                      </Styled.ContainerFollower>
                    ))}
                </>
              ) : (
                <ControlUserFollowOrUnFollow
                  userId={userId}
                  postCreatorId={postCreatorId}
                  followersUser={followersUser}
                  showModalConfirmDelete={showModalConfirmDelete}
                />
              )}
              {postCreatorId == undefined && (
                <Styled.ContainerSuggestionForYou>
                  <Styled.P>Sugestões para você</Styled.P>
                  {usersSuggestion &&
                    usersSuggestion.map((u) => (
                      <Styled.ContainerFollower key={u.id}>
                        <Styled.WrapperOnlyImgAndName>
                          <Styled.WrapperImgFollower>
                            <Styled.ImgFollower src={u.imagePerfil} />
                          </Styled.WrapperImgFollower>
                          <Styled.WrapperInfoFollower>
                            <Styled.NamePFollower>{u.name}</Styled.NamePFollower>
                          </Styled.WrapperInfoFollower>
                        </Styled.WrapperOnlyImgAndName>
                        <Styled.WrapperButton>
                          <Styled.ButtonFo
                            $follow={'Seguir'}
                            onClick={() => showModalConfirmDelete(u)}
                          >
                            Seguir
                          </Styled.ButtonFo>
                        </Styled.WrapperButton>
                      </Styled.ContainerFollower>
                    ))}
                </Styled.ContainerSuggestionForYou>
              )}
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
