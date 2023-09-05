import Url from '../../../Utils/Url';
import { dataUserFriendRequestProps } from '../../../templates/Profile/Profile';
import { statusFriendshipProps } from '../UserProfileActions/UserProfileActions';
import * as Styled from './styled';

interface ModalAcceptOrRejectProps {
  setShowModalAcceptOrReject: React.Dispatch<React.SetStateAction<boolean>>;
  statusFriendship: statusFriendshipProps | null;
  setStatusFriendship: React.Dispatch<React.SetStateAction<statusFriendshipProps | null>>;
}

const ModalAcceptOrReject = ({
  setShowModalAcceptOrReject,
  statusFriendship,
  setStatusFriendship,
}: ModalAcceptOrRejectProps) => {
  const handleAcceptFriendship = async () => {
    if (statusFriendship) {
      const addFriendship = {
        SenderId: statusFriendship.senderId,
        RecipientId: statusFriendship.recipientId,
        Status: 'Accepted',
      };
      const res = await fetch(`${Url}/friendrequest`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'Application/Json',
        },
        body: JSON.stringify(addFriendship),
      });
      if (res.status === 200) {
        const json = await res.json();
        const friendshipAccept = json.data;
        setShowModalAcceptOrReject(false);
        setStatusFriendship((prev) =>
          prev !== null
            ? { ...prev, status: (prev.status = friendshipAccept.status), fieldUpdate: 'update' }
            : prev
        );
      }
    }
  };

  return (
    <Styled.ContainerMain>
      <Styled.Button onClick={handleAcceptFriendship}>Confirmar</Styled.Button>
      <Styled.Button>Excluir solicitação</Styled.Button>
    </Styled.ContainerMain>
  );
};

export default ModalAcceptOrReject;
