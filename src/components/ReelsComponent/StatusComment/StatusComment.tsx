import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Url from '../../../Utils/Url';
import { CommentsReelsProps } from '../CommentsReels/CommentsReels';
import * as Styled from './styled';
import { useEffect, useState, memo } from 'react';
import { faEllipsis, faXmark } from '@fortawesome/free-solid-svg-icons';
import ReactModal from 'react-modal';

export interface unlockEllipsisProps {
  unlockEllipsis: boolean;
  commentId: number;
}

interface StatusCommentProps {
  cmt: CommentsReelsProps;
  index: number;
  reelsId: number;
  userId: number | null;
  handleGetCommentDelete: (commentId: number) => void;
  handleGetCommentRespond: (comment: CommentsReelsProps) => void;
}

interface LikesCommentsInfoProps {
  id: number;
  likeCommentsCounts: number;
  likeComments: LikeCommentsProps[];
}

interface LikeCommentsProps {
  authorId: number;
  commentId: number;
}

const StatusComment = ({
  cmt,
  index,
  reelsId,
  userId,
  handleGetCommentDelete,
  handleGetCommentRespond,
}: StatusCommentProps) => {
  const [likesCommentsInfo, setLikesCommentsInfo] = useState<LikesCommentsInfoProps[] | []>([]);

  useEffect(() => {
    const fetchLikesComments = async () => {
      const res = await fetch(`${Url}/comment/info/${reelsId}`); //Tentar fazer chave e valor! com o id do CommentId
      if (res.status === 200) {
        const json = await res.json();

        setLikesCommentsInfo(json.data);
      }
    };
    fetchLikesComments();
  }, []);

  const handleLikeComment = async (commentId: number) => {
    const jsonLike = {
      commentId: commentId,
      authorId: userId,
    };
    const res = await fetch(`${Url}/likeCommentCreate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify(jsonLike),
    });

    if (res.status === 200) {
      const json = await res.json();
      const likes = json.data;

      if (json.isSucess == true) {
        setLikesCommentsInfo((prev) =>
          prev.map((lk) => ({ ...lk, likeCommentsCounts: lk.likeCommentsCounts + 1 }))
        );
      }
      setLikesCommentsInfo((prev) =>
        prev.map((lk) =>
          lk.id == commentId ? { ...lk, likeComments: [...lk.likeComments, likes] } : lk
        )
      );
    }
  };

  const handleDislike = async (commentId: number) => {
    const res = await fetch(`${Url}/likeCommentDelete/${userId}/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/json',
      },
    });

    if (res.status === 200) {
      const json = await res.json();

      setLikesCommentsInfo((prev) =>
        prev.map((lk) => ({ ...lk, likeCommentsCounts: lk.likeCommentsCounts - 1 }))
      );
      setLikesCommentsInfo((prev) =>
        prev.map((lk) =>
          lk.id == commentId
            ? { ...lk, likeComments: lk.likeComments.filter((like) => like.authorId !== userId) }
            : lk
        )
      );
    }
  };

  const [unlockRemoveComment, setUnlockRemoveComment] = useState(false);

  const handleClickEllipsis = () => {
    setUnlockRemoveComment(true);
  };

  const [unlockEllipsis, setUnlockEllipsis] = useState<unlockEllipsisProps | null>(null);

  const handleEnter = (cmdId: number) => {
    setUnlockEllipsis({ unlockEllipsis: true, commentId: cmdId });
  };

  const handleLeave = (cmdId: number) => {
    setUnlockEllipsis({ unlockEllipsis: false, commentId: cmdId });
  };

  const showModalComment = () => {};

  const disableBodyScroll = () => {
    document.body.style.overflow = 'hidden';
  };

  const handleCancel = () => {
    setUnlockRemoveComment(false);
  };

  const handleDelete = (commentId: number) => {
    setUnlockRemoveComment(false); //ative isso
    handleGetCommentDelete(commentId);
  };

  return (
    <Styled.ContainerGlobalMain
      onMouseEnter={() => handleEnter(cmt.id)}
      onMouseLeave={() => handleLeave(cmt.id)}
    >
      <Styled.WrapperImgAndNameAndCommentLike>
        <Styled.WrapperImgAndNameAndComment>
          <Styled.WrapperImg>
            <Styled.Img src={cmt.user.imagePerfil} />
          </Styled.WrapperImg>
          <Styled.ContainerNameAndComment>
            <Styled.ContainerNameUser>
              <Styled.P>{cmt.user.name}</Styled.P>
            </Styled.ContainerNameUser>
            <Styled.ContainerComment>
              <Styled.PText>{cmt.text}</Styled.PText>
            </Styled.ContainerComment>
          </Styled.ContainerNameAndComment>
        </Styled.WrapperImgAndNameAndComment>

        <Styled.WrapperButton>
          {cmt && (
            <Styled.WrapperKeyButton key={cmt.id}>
              {likesCommentsInfo[index] &&
                likesCommentsInfo[index].id == cmt.id &&
                (likesCommentsInfo[index].likeComments.some((lk) => lk.authorId == userId) ? (
                  <Styled.ButtonSvg
                    onClick={() => handleDislike(cmt.id)}
                    data-testid="button-dislike"
                  >
                    <Styled.SvgHeartRed
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                      />
                    </Styled.SvgHeartRed>
                  </Styled.ButtonSvg>
                ) : (
                  <Styled.ButtonSvg data-testid="button-like">
                    <Styled.SvgHeartBorderBlack
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      onClick={() => handleLikeComment(cmt.id)}
                    >
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                    </Styled.SvgHeartBorderBlack>
                  </Styled.ButtonSvg>
                ))}
            </Styled.WrapperKeyButton>
          )}
        </Styled.WrapperButton>
      </Styled.WrapperImgAndNameAndCommentLike>
      <Styled.Container__Like__Response>
        <Styled.Button>
          {likesCommentsInfo &&
            likesCommentsInfo.map((lk) => lk.id == cmt.id && lk.likeCommentsCounts)}{' '}
          curtidas
        </Styled.Button>
        <Styled.Button onClick={() => handleGetCommentRespond(cmt)}>Response</Styled.Button>
        {unlockEllipsis &&
          unlockEllipsis.commentId == cmt.id &&
          unlockEllipsis.unlockEllipsis === true &&
          cmt.user.id === userId && (
            <FontAwesomeIcon icon={faEllipsis} onClick={handleClickEllipsis} />
          )}
      </Styled.Container__Like__Response>
      {unlockRemoveComment && (
        <ReactModal
          isOpen={showModalComment}
          onAfterOpen={disableBodyScroll}
          style={{
            overlay: {
              backgroundColor: 'rgb(33 33 33 / 65%)',
              zIndex: 20,
            },
            content: {
              background: 'none',
              border: 'none',
              borderRadius: 'none',
            },
          }}
        >
          <>
            <Styled.ModalOverlay>
              <Styled.ContainerChooseOptionsComment>
                <Styled.ButtonChoose $button="denunciar">Denunciar</Styled.ButtonChoose>
                <Styled.ButtonChoose $button="excluir" onClick={() => handleDelete(cmt.id)}>
                  Excluir
                </Styled.ButtonChoose>
                <Styled.ButtonChoose $button="cancelar" onClick={handleCancel}>
                  Cancelar
                </Styled.ButtonChoose>
              </Styled.ContainerChooseOptionsComment>
            </Styled.ModalOverlay>
          </>
        </ReactModal>
      )}
    </Styled.ContainerGlobalMain>
  );
};

export default memo(StatusComment);
