import { useNavigate } from 'react-router-dom';
import Url from '../../../Utils/Url';
import * as Styled from './styled';
import { useState, useEffect } from 'react';
import { requestFriendshipProps } from '../UserProfileActions/UserProfileActions';
import { DataUserOnlyProps } from '../../../templates/Profile/Profile';

interface ModalFriendshipRequestProps {
  userId: number | null;
  dataUserOnly: DataUserOnlyProps | null;

  requestFriendship: requestFriendshipProps[] | null;
  setShowModalRequest: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalFriendshipRequest = ({
  userId,
  dataUserOnly,
  requestFriendship,
  setShowModalRequest,
}: ModalFriendshipRequestProps) => {
  const nav = useNavigate();

  const handleChange = (value: requestFriendshipProps) => {
    if (value) {
      const { senderId: postCreatorId } = value;
      const profileTrue = true;
      const friendshipRequest = true;
      nav('/profile', { state: { postCreatorId, profileTrue, friendshipRequest } });
      setShowModalRequest(false);
    }
  };

  return (
    <Styled.ContainerMain>
      {requestFriendship &&
        requestFriendship.map((req) => (
          <Styled.ContainerUserRequest onClick={() => handleChange(req)} key={req.id}>
            <Styled.ContainerImgUser>
              <Styled.Img src={req.sender.imagePerfil} />
            </Styled.ContainerImgUser>
            <Styled.ContainerP>
              <Styled.P>
                {req.sender.name}{' '}
                <Styled.span>enviou uma solicitação de amizade para você</Styled.span>{' '}
              </Styled.P>
            </Styled.ContainerP>
          </Styled.ContainerUserRequest>
        ))}
    </Styled.ContainerMain>
  );
};

export default ModalFriendshipRequest;
