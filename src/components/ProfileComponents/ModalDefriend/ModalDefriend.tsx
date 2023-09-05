import Url from '../../../Utils/Url';
import { DataUserOnlyProps } from '../../../templates/Profile/Profile';
import { statusFriendshipProps } from '../UserProfileActions/UserProfileActions';
import * as Styled from './styled';
import { useState } from 'react';

interface ModalDefriendProps {
  dataUserOnly: DataUserOnlyProps | null;
  setShowModalDefriend: React.Dispatch<React.SetStateAction<boolean>>;
  showModalDefriend: boolean;
  statusFriendship: statusFriendshipProps | null;
  setStatusFriendship: React.Dispatch<React.SetStateAction<statusFriendshipProps | null>>;
}

const ModalDefriend = ({
  dataUserOnly,
  setShowModalDefriend,
  showModalDefriend,
  statusFriendship,
  setStatusFriendship,
}: ModalDefriendProps) => {
  const [showModalConfirmDelete, setShowModalConfirmDelete] = useState(false);

  const handleDefriend = async () => {
    setShowModalConfirmDelete(true);
    setShowModalDefriend(false);
  };

  const handleCancelDefriend = () => {
    setShowModalConfirmDelete(false);
  };

  const handleConfirmDefriend = async () => {
    if (statusFriendship) {
      const res = await fetch(
        `${Url}/friendrequest/${statusFriendship.senderId}/${statusFriendship.recipientId}`,
        {
          method: 'DELETE',
        }
      );
      if (res.status === 200) {
        const json = await res.json();
        console.log(json.data);
        const friendshipDelete = json.data;
        setStatusFriendship((prev) =>
          prev !== null
            ? prev.id == friendshipDelete.id && { ...prev, status: (prev.status = 'nofriend') }
            : prev
        );
        setShowModalConfirmDelete(false);
      }
    }
  };

  return (
    <>
      {showModalDefriend && (
        <Styled.ContainerMain>
          <Styled.Button $button="defriend" onClick={handleDefriend}>
            Desamigar
          </Styled.Button>
        </Styled.ContainerMain>
      )}
      {showModalConfirmDelete && (
        <Styled.ContainerModal>
          <Styled.ModalContent>
            <Styled.Wrapper>
              <Styled.ContainerInfo $container="defriend">
                <Styled.P>
                  Desamigar <Styled.Span>{dataUserOnly?.name}</Styled.Span>{' '}
                </Styled.P>
              </Styled.ContainerInfo>
              <Styled.ContainerInfo $container="info-confirm">
                <Styled.P>
                  Tem certeza de que deseja excluir <Styled.Span>{dataUserOnly?.name}</Styled.Span>{' '}
                  da sua lista de amigos?
                </Styled.P>
              </Styled.ContainerInfo>
            </Styled.Wrapper>
            <Styled.ContainerButton>
              <Styled.Button $button="cancel" onClick={handleCancelDefriend}>
                Cancelar
              </Styled.Button>
              <Styled.Button $button="confirm" onClick={handleConfirmDefriend}>
                Confirmar
              </Styled.Button>
            </Styled.ContainerButton>
          </Styled.ModalContent>
        </Styled.ContainerModal>
      )}
    </>
  );
};

export default ModalDefriend;
