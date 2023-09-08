import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Url from '../../../Utils/Url';
import {
  ContextProfile,
  ContextProfileProps,
  FollowingListsProps,
} from '../../../templates/Profile/Profile';
import FollowOrUnFollow from '../FollowOrUnFollow/FollowOrUnFollow';
import { UsersSuggestionProps } from '../ModalFollowers/ModalFollowers';
import ModalUserDeleteFollower from '../ModalUserDeleteFollower/ModalUserDeleteFollower';
import * as Styled from './styled';
import { useEffect, useState, useContext, useRef } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface SuggestionComponentProps {
  postCreatorId: number;
  firstFollowing: FollowingListsProps | null;
  userId: number | null;
}

interface followingByUserLoggedProps {
  followerId: number;
  followingId: number;
  id: number;
}

const SuggestionComponent = ({
  postCreatorId,
  firstFollowing,
  userId,
}: SuggestionComponentProps) => {
  const [usersSuggestion, setUsersSuggestion] = useState<UsersSuggestionProps[] | null>(null);
  const contextProfile = useContext<ContextProfileProps | null>(ContextProfile);

  const [dataUserDeleteFollowing, setDataUserDeleteFollowing] =
    useState<FollowingListsProps | null>(null);

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const lastButtonClickRef = useRef('');

  const [dataUserFollowerAndFollowingId, setDataUserFollowerAndFollowingId] =
    useState<followingByUserLoggedProps | null>(null);

  window.addEventListener(
    'beforeunload',
    (e) => {
      e.preventDefault();

      if (lastButtonClickRef.current === 'Seguir') return;

      if (dataUserFollowerAndFollowingId && lastButtonClickRef.current === 'Seguindo') {
        const deleteFollow = {
          FollowerId: dataUserFollowerAndFollowingId.followerId,
          FollowingId: dataUserFollowerAndFollowingId.followingId,
        };
        const handleDeleteFollow = async () => {
          const res = await fetch(`${Url}/follow`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(deleteFollow),
          });
        };
        handleDeleteFollow();
      }
    },
    true
  );

  const handleCloseModal = async () => {
    if (contextProfile === null) return;
    contextProfile.setShowModalFollower(false);
    contextProfile.setSeeFollowersOrFollowing(false);

    if (lastButtonClickRef.current === 'Seguir') return;

    if (dataUserFollowerAndFollowingId && lastButtonClickRef.current === 'Seguindo') {
      const deleteFollow = {
        FollowerId: dataUserFollowerAndFollowingId.followerId,
        FollowingId: dataUserFollowerAndFollowingId.followingId,
      };

      const res = await fetch(`${Url}/follow`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deleteFollow),
      });
    }
  };

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

  const showModalUserDeleteFollowing = (value: FollowingListsProps) => {
    if (userId === null) return;
    const follow = {
      followerId: userId,
      followingId: value.id,
      id: 0,
    };
    setDataUserFollowerAndFollowingId(follow);

    lastButtonClickRef.current = 'Seguindo';
    setDataUserDeleteFollowing(value);
    setShowConfirmDelete(true);
  };

  const handleFollowUser = async (valor: UsersSuggestionProps) => {
    lastButtonClickRef.current = 'Seguir';
    if (
      contextProfile === null ||
      contextProfile.followingUser === null ||
      contextProfile.followingList === null
    )
      return;

    const userToFollow = contextProfile.followingUser.find((item) => item.id === valor.id);

    if (userToFollow && contextProfile.followingUser) {
      contextProfile.setFollowingList((prev) => (prev !== null ? [...prev, userToFollow] : prev));
      setDataUserDeleteFollowing(null);
      return;
    }

    if (valor == null) return;
    const jsonFollow = {
      FollowerId: userId,
      FollowingId: valor.id,
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
      contextProfile.setFollowingUser((prev) => (prev !== null ? [...prev, valor] : prev));
      contextProfile.setFollowingList((prev) => (prev !== null ? [...prev, valor] : prev));
      setDataUserDeleteFollowing(null);
    }
  };

  return (
    <>
      <Styled.WrapperExit>
        <FontAwesomeIcon icon={faXmark} onClick={handleCloseModal} />
      </Styled.WrapperExit>
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
                  {contextProfile &&
                  contextProfile.followingList &&
                  contextProfile.followingList.some((item) => item.id === u.id) ? (
                    <Styled.Button onClick={() => showModalUserDeleteFollowing(u)} $follow="">
                      Seguindo
                    </Styled.Button>
                  ) : (
                    <Styled.Button onClick={() => handleFollowUser(u)} $follow="button-follow">
                      Seguir
                    </Styled.Button>
                  )}
                </Styled.WrapperButton>
              </Styled.ContainerFollower>
            ))}
        </Styled.ContainerSuggestionForYou>
      )}
      {contextProfile !== null && (
        <ModalUserDeleteFollower
          showConfirmDelete={showConfirmDelete}
          setShowConfirmDelete={setShowConfirmDelete}
          dataUserDeleteFollower={dataUserDeleteFollowing}
          userId={userId}
          setFollowersUser={contextProfile.setFollowingList}
        />
      )}
    </>
  );
};

export default SuggestionComponent;
