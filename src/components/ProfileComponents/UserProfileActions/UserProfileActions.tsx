import React, { useEffect, useState } from 'react';
import Url from '../../../Utils/Url';
import { DataUserOnlyProps, dataUserFriendRequestProps } from '../../../templates/Profile/Profile';
import * as Styled from './styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import ModalFriendshipRequest from '../ModalFriendshipRequest/ModalFriendshipRequest';
import ModalAcceptOrReject from '../ModalAcceptOrReject/ModalAcceptOrReject';
import { useLocation } from 'react-router-dom';
import ModalDefriend from '../ModalDefriend/ModalDefriend';

interface UserProfileActionsProps {
  dataUserOnly: DataUserOnlyProps | null;
  fetchOnLoggedInUser: boolean;
  userId: number | null;
  alreadyFollowUser: boolean;
  setCheckIfUserAlreadyFollows: React.Dispatch<React.SetStateAction<{}>>;
}

export interface statusFriendshipProps {
  id: number;
  senderId: number;
  recipientId: number;
  status: string;
}

export interface requestFriendshipProps {
  id: number;
  senderId: number;
  sender: User;
  recipientId: number;
  status: string;
}

interface notFoundFriendshipProps {
  isSucess: boolean;
  message: string;
}

interface User {
  id: number;
  name: string;
  imagePerfil: string;
}

const UserProfileActions = ({
  dataUserOnly,
  fetchOnLoggedInUser,
  userId,
  alreadyFollowUser,
  setCheckIfUserAlreadyFollows,
}: UserProfileActionsProps) => {
  const [statusFriendship, setStatusFriendship] = useState<statusFriendshipProps | null>(null);
  const [requestFriendship, setRequestFriendship] = useState<requestFriendshipProps[] | null>(null);
  const [showModalRequest, setShowModalRequest] = useState(false);
  const [showModalAcceptOrReject, setShowModalAcceptOrReject] = useState(false);
  const [showModalDefriend, setShowModalDefriend] = useState(false);

  const location = useLocation();

  const { postCreatorId, profileTrue, profileAllPost, friendshipRequest } = location.state
    ? location.state
    : 0;

  const handleFollow = async () => {
    if (dataUserOnly) {
      const followCreate = {
        FollowerId: userId,
        FollowingId: dataUserOnly.id,
      };
      const res = await fetch(`${Url}/follow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(followCreate),
      });
      if (res.status === 200) {
        const json = await res.json();
        setCheckIfUserAlreadyFollows(json.data);
      }
    }
  };

  const handleUnFollow = async () => {
    if (dataUserOnly) {
      if (userId === null) return;
      const followDelete = {
        FollowerId: userId,
        FollowingId: dataUserOnly.id,
      };
      const res = await fetch(`${Url}/follow`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(followDelete),
      });
      if (res.status === 200) {
        const json = await res.json();

        setCheckIfUserAlreadyFollows(json.data);
      }
    }
  };

  useEffect(() => {
    const fetchCheckStatusFriendship = async () => {
      if (postCreatorId === 0) return;
      if (userId === null) return;
      const res = await fetch(`${Url}/friendrequest/${userId}/${postCreatorId}`);
      if (res.status === 200) {
        const json = await res.json();
        const data = json.data;
        setStatusFriendship(data);
      }

      if (res.status === 400) {
        const json = await res.json();
      }
    };
    fetchCheckStatusFriendship();
  }, [userId, postCreatorId]);

  useEffect(() => {
    const fetchCheckFriendship = async () => {
      if (userId === null) return;
      const res = await fetch(`${Url}/checkrequestfriendship/${userId}`);
      if (res.status === 200) {
        const json = await res.json();
        const data = json.data;
        setRequestFriendship(data);
      }
    };
    fetchCheckFriendship();
  }, [userId]);

  const handleAddFriend = async () => {
    if (dataUserOnly) {
      if (userId === null) return;
      const createFriendship = {
        SenderId: userId,
        RecipientId: dataUserOnly.id,
      };

      const res = await fetch(`${Url}/friendrequest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createFriendship),
      });
      if (res.status === 200) {
        const json = await res.json();
        setStatusFriendship(json.data);
      }
    }
  };

  const handleCancelRequest = async () => {
    if (statusFriendship) {
      const res = await fetch(
        `${Url}/friendrequest/${statusFriendship.senderId}/${statusFriendship.recipientId}`,
        {
          method: 'DELETE',
        }
      );
      if (res.status === 200) {
        setStatusFriendship((prev) =>
          prev !== null ? { ...prev, status: (prev.status = 'nofriend') } : prev
        );
      }
    }
  };

  const handleSeeFriendRequest = () => {
    setShowModalRequest((req) => !req);
  };

  const handleShowAcceptOrReject = () => {
    setShowModalAcceptOrReject((acceptOrReject) => !acceptOrReject);
  };

  const handleDefriend = () => {
    setShowModalDefriend((defri) => !defri);
  };

  useEffect(() => {
    if (window.innerWidth) {
      setWidthLessThan575(true);
    } else {
      setWidthLessThan575(false);
    }
    window.addEventListener('resize', handleResizeWindow);

    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  const [widthLessThan575, setWidthLessThan575] = useState(false);

  const handleResizeWindow = () => {
    if (window.innerWidth) {
      setWidthLessThan575(true);
    } else {
      setWidthLessThan575(false);
    }
  };

  return (
    <Styled.ContainerInfoUser $fetchuserlogged={String(fetchOnLoggedInUser)}>
      {widthLessThan575 ? (
        <Styled.ContainerInfoUserWidthLess575>
          <Styled.P>{dataUserOnly && dataUserOnly.name}</Styled.P>
          {(dataUserOnly && userId == dataUserOnly.id) || alreadyFollowUser ? (
            <></>
          ) : (
            <Styled.WrapperButtonFollow $button="follow">
              <Styled.ButtonFollow $button="follow" onClick={handleFollow}>
                Seguir
              </Styled.ButtonFollow>
            </Styled.WrapperButtonFollow>
          )}
          {alreadyFollowUser && (
            <Styled.WrapperButtonFollow $button="unfollow">
              <Styled.ButtonFollow $button="unfollow" onClick={handleUnFollow}>
                Seguindo
              </Styled.ButtonFollow>
            </Styled.WrapperButtonFollow>
          )}
          <Styled.ContainerButton>
            <Styled.Button>Editar Perfil</Styled.Button>
          </Styled.ContainerButton>
          <Styled.ContainerSvgSettings>
            <Styled.SvgSettings
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8.932.727c-.243-.97-1.62-.97-1.864 0l-.071.286a.96.96 0 0 1-1.622.434l-.205-.211c-.695-.719-1.888-.03-1.613.931l.08.284a.96.96 0 0 1-1.186 1.187l-.284-.081c-.96-.275-1.65.918-.931 1.613l.211.205a.96.96 0 0 1-.434 1.622l-.286.071c-.97.243-.97 1.62 0 1.864l.286.071a.96.96 0 0 1 .434 1.622l-.211.205c-.719.695-.03 1.888.931 1.613l.284-.08a.96.96 0 0 1 1.187 1.187l-.081.283c-.275.96.918 1.65 1.613.931l.205-.211a.96.96 0 0 1 1.622.434l.071.286c.243.97 1.62.97 1.864 0l.071-.286a.96.96 0 0 1 1.622-.434l.205.211c.695.719 1.888.03 1.613-.931l-.08-.284a.96.96 0 0 1 1.187-1.187l.283.081c.96.275 1.65-.918.931-1.613l-.211-.205a.96.96 0 0 1 .434-1.622l.286-.071c.97-.243.97-1.62 0-1.864l-.286-.071a.96.96 0 0 1-.434-1.622l.211-.205c.719-.695.03-1.888-.931-1.613l-.284.08a.96.96 0 0 1-1.187-1.186l.081-.284c.275-.96-.918-1.65-1.613-.931l-.205.211a.96.96 0 0 1-1.622-.434L8.932.727zM8 12.997a4.998 4.998 0 1 1 0-9.995 4.998 4.998 0 0 1 0 9.996z" />
            </Styled.SvgSettings>
          </Styled.ContainerSvgSettings>
        </Styled.ContainerInfoUserWidthLess575>
      ) : (
        <>
          <Styled.P>{dataUserOnly && dataUserOnly.name}</Styled.P>
          {(dataUserOnly && userId == dataUserOnly.id) || alreadyFollowUser ? (
            <></>
          ) : (
            <Styled.WrapperButtonFollow $button="follow">
              <Styled.ButtonFollow $button="follow" onClick={handleFollow}>
                Seguir
              </Styled.ButtonFollow>
            </Styled.WrapperButtonFollow>
          )}
          {alreadyFollowUser && (
            <Styled.WrapperButtonFollow $button="unfollow">
              <Styled.ButtonFollow $button="unfollow" onClick={handleUnFollow}>
                Seguindo
              </Styled.ButtonFollow>
            </Styled.WrapperButtonFollow>
          )}
          <Styled.ContainerButton>
            <Styled.Button>Editar Perfil</Styled.Button>
          </Styled.ContainerButton>
          <Styled.ContainerSvgSettings>
            <Styled.SvgSettings
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8.932.727c-.243-.97-1.62-.97-1.864 0l-.071.286a.96.96 0 0 1-1.622.434l-.205-.211c-.695-.719-1.888-.03-1.613.931l.08.284a.96.96 0 0 1-1.186 1.187l-.284-.081c-.96-.275-1.65.918-.931 1.613l.211.205a.96.96 0 0 1-.434 1.622l-.286.071c-.97.243-.97 1.62 0 1.864l.286.071a.96.96 0 0 1 .434 1.622l-.211.205c-.719.695-.03 1.888.931 1.613l.284-.08a.96.96 0 0 1 1.187 1.187l-.081.283c-.275.96.918 1.65 1.613.931l.205-.211a.96.96 0 0 1 1.622.434l.071.286c.243.97 1.62.97 1.864 0l.071-.286a.96.96 0 0 1 1.622-.434l.205.211c.695.719 1.888.03 1.613-.931l-.08-.284a.96.96 0 0 1 1.187-1.187l.283.081c.96.275 1.65-.918.931-1.613l-.211-.205a.96.96 0 0 1 .434-1.622l.286-.071c.97-.243.97-1.62 0-1.864l-.286-.071a.96.96 0 0 1-.434-1.622l.211-.205c.719-.695.03-1.888-.931-1.613l-.284.08a.96.96 0 0 1-1.187-1.186l.081-.284c.275-.96-.918-1.65-1.613-.931l-.205.211a.96.96 0 0 1-1.622-.434L8.932.727zM8 12.997a4.998 4.998 0 1 1 0-9.995 4.998 4.998 0 0 1 0 9.996z" />
            </Styled.SvgSettings>
          </Styled.ContainerSvgSettings>
        </>
      )}

      {statusFriendship === null &&
        !profileTrue &&
        profileAllPost &&
        userId != dataUserOnly?.id && (
          <Styled.ContainerAdd $container="add-friend">
            <Styled.ButtonAdd onClick={handleAddFriend}>Adicionar amigo</Styled.ButtonAdd>
          </Styled.ContainerAdd>
        )}

      {statusFriendship && statusFriendship.status === 'nofriend' && !profileTrue && (
        <Styled.ContainerAdd $container="add-friend">
          <Styled.ButtonAdd onClick={handleAddFriend}>Adicionar amigo</Styled.ButtonAdd>
        </Styled.ContainerAdd>
      )}
      {statusFriendship &&
        statusFriendship.status === 'Pending' &&
        statusFriendship.senderId == userId &&
        !profileTrue && (
          <Styled.ContainerAdd $container="pending">
            <Styled.ButtonAdd onClick={handleCancelRequest}>Cancelar solicitação</Styled.ButtonAdd>
          </Styled.ContainerAdd>
        )}
      {statusFriendship && statusFriendship.status === 'Accepted' && profileTrue == undefined && (
        <Styled.ContainerAdd $container="respond" onClick={handleDefriend}>
          <Styled.ButtonAdd>Amigos</Styled.ButtonAdd>
        </Styled.ContainerAdd>
      )}
      <div>
        <ModalDefriend
          dataUserOnly={dataUserOnly}
          setShowModalDefriend={setShowModalDefriend}
          showModalDefriend={showModalDefriend}
          statusFriendship={statusFriendship}
          setStatusFriendship={setStatusFriendship}
        />
      </div>

      {statusFriendship &&
      statusFriendship.recipientId === userId &&
      statusFriendship.status === 'Pending' &&
      friendshipRequest ? (
        <Styled.ContainerAdd $container="respond" onClick={handleShowAcceptOrReject}>
          <Styled.ButtonAdd>Responder</Styled.ButtonAdd>
        </Styled.ContainerAdd>
      ) : (
        <>
          {!profileTrue &&
            statusFriendship?.status === 'Pending' &&
            statusFriendship.recipientId == userId && (
              <Styled.ContainerAdd $container="respond" onClick={handleShowAcceptOrReject}>
                <Styled.ButtonAdd>Responder</Styled.ButtonAdd>
              </Styled.ContainerAdd>
            )}
        </>
      )}
      <Styled.ContainerFriendship>
        {showModalAcceptOrReject && (
          <ModalAcceptOrReject
            setShowModalAcceptOrReject={setShowModalAcceptOrReject}
            statusFriendship={statusFriendship}
            setStatusFriendship={setStatusFriendship}
          />
        )}
      </Styled.ContainerFriendship>
      {dataUserOnly && dataUserOnly.id == userId && (
        <Styled.ContainerAdd onClick={handleSeeFriendRequest} $container="friend-request">
          <FontAwesomeIcon icon={faUserPlus} />

          <Styled.ButtonAdd>Solicitações de amizade</Styled.ButtonAdd>
          <Styled.ContainerCounterFriend>
            <Styled.PCountFriend>
              +{requestFriendship && requestFriendship.length}
            </Styled.PCountFriend>
          </Styled.ContainerCounterFriend>
        </Styled.ContainerAdd>
      )}
      <Styled.ContainerFriendship>
        {showModalRequest && (
          <ModalFriendshipRequest
            userId={userId}
            dataUserOnly={dataUserOnly}
            requestFriendship={requestFriendship}
            setShowModalRequest={setShowModalRequest}
          />
        )}
      </Styled.ContainerFriendship>
    </Styled.ContainerInfoUser>
  );
};

export default UserProfileActions;
