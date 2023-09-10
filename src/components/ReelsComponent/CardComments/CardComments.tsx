import { useState, useRef } from 'react';
import Url from '../../../Utils/Url';
import { CommentsReelsProps, SubsComments } from '../CommentsReels/CommentsReels';
import * as Styled from './styled';
import StatusComment from '../StatusComment/StatusComment';

interface CardCommentsProps {
  commentsReels: CommentsReelsProps[] | null;
  ContainerMessageScrollRef: React.MutableRefObject<HTMLDivElement | null>;
  userId: number | null;
  setCommentsReels: React.Dispatch<React.SetStateAction<CommentsReelsProps[] | null>>;
  handleGetCommentRespond: (comment: CommentsReelsProps) => void;
  setSubComments: React.Dispatch<React.SetStateAction<{ [key: number]: SubsComments[] }>>;
  subComments: { [key: number]: SubsComments[] };
  reelsId: number;
}

const CardComments = ({
  commentsReels,
  ContainerMessageScrollRef,
  userId,
  setCommentsReels,
  handleGetCommentRespond,
  setSubComments,
  subComments,
  reelsId,
}: CardCommentsProps) => {
  const [newCommentsReels, setNewCommentsReels] = useState<CommentsReelsProps[] | null>(
    commentsReels
  );

  const [expandedComments, setExpandedComments] = useState<number[]>([]);

  const [pagina, setPagina] = useState(1);
  const [commentId, setCommentId] = useState<number>(0);

  const loadSubComments = async (cmt: CommentsReelsProps) => {
    const commentId = cmt.id;
    setCommentId(commentId);

    let registroPorPagina = 5;

    if (subComments[commentId] === undefined || cmt.subCommentsCountsMock > 0) {
      const res = await fetch(
        `${Url}/subcomment/pagination/${commentId}/${pagina}/${registroPorPagina}`
      );
      if (res.status === 200) {
        const json = await res.json();

        setExpandedComments((prevExpandedComments) => [...prevExpandedComments, commentId]);

        setPagina((prev) => prev + 1);

        setSubComments((prevSubComments) => {
          const updateSubComments = {
            ...prevSubComments,
            [commentId]: [...json.data, ...(prevSubComments[commentId] || [])],
          };
          return updateSubComments;
        });

        setNewCommentsReels((prev) =>
          prev !== null
            ? prev.map((cmd) =>
                cmd.id == commentId
                  ? {
                      ...cmd,
                      subCommentsCountsMock: cmd.subCommentsCountsMock - registroPorPagina,
                    }
                  : cmd
              )
            : prev
        );
      }

      return;
    }

    if (subComments[commentId].length === cmt.subCommentsCounts) {
      setExpandedComments((prevExpandedComments) => [...prevExpandedComments, commentId]);
      return;
    }
  };

  const handleGetCommentDelete = async (commentId: number) => {
    const res = await fetch(`${Url}/comment/delete/${commentId}`, {
      method: 'DELETE',
    });
    if (res.status === 200) {
      //setNewCommentsReels atualizar aqui os comments que foi deletado
      const json = await res.json();
      setNewCommentsReels((prev) =>
        prev !== null ? prev.filter((cmt) => cmt.id !== json.data.id) : prev
      );
    }
  };

  return (
    <Styled.ContainerCommentMain ref={ContainerMessageScrollRef}>
      <Styled.ContainerCommentFromUsers>
        {newCommentsReels &&
          newCommentsReels.map((cmt, index) => (
            <Styled.ContainerInfoUser key={cmt.id}>
              <StatusComment
                cmt={cmt}
                index={index}
                reelsId={reelsId}
                userId={userId}
                handleGetCommentDelete={handleGetCommentDelete}
                handleGetCommentRespond={handleGetCommentRespond}
              />
              <Styled.ContainerMain>
                {/* separar */}
                <Styled.Wrapper__Button>
                  <Styled.ContainerRisco></Styled.ContainerRisco>
                  {cmt.subCommentsCountsMock <= 0 && expandedComments.includes(cmt.id) ? (
                    <Styled.Button
                      onClick={() =>
                        setExpandedComments((prevExpandedComments) =>
                          prevExpandedComments.filter((id) => id !== cmt.id)
                        )
                      }
                    >
                      Ocultar resposta
                    </Styled.Button>
                  ) : (
                    <Styled.Button onClick={() => loadSubComments(cmt)}>
                      Ver respostas{' '}
                      {cmt.subCommentsCountsMock <= 0
                        ? cmt.subCommentsCounts
                        : cmt.subCommentsCountsMock}
                    </Styled.Button>
                  )}
                </Styled.Wrapper__Button>

                {expandedComments.includes(cmt.id) && (
                  <>
                    {subComments[commentId].map((sub) => (
                      <Styled.WrapperSubComment key={sub.id}>
                        <Styled.ContainerImgUserComment>
                          <Styled.ImgUserComment src={sub.user.imagePerfil} />
                        </Styled.ContainerImgUserComment>
                        <Styled.WrapperUserInfoSubComment>
                          <Styled.PSub>
                            {sub.user.name}
                            <Styled.Span>{sub.text}</Styled.Span>
                          </Styled.PSub>
                        </Styled.WrapperUserInfoSubComment>
                      </Styled.WrapperSubComment>
                    ))}
                  </>
                )}
              </Styled.ContainerMain>
            </Styled.ContainerInfoUser>
          ))}
      </Styled.ContainerCommentFromUsers>
    </Styled.ContainerCommentMain>
  );
};

export default CardComments;
