import Url from '../../../Utils/Url';
import { Comments } from '../Comment/Comment';
import { SubsComments } from '../PostComments/PostComments';
import * as Styled from './styled';
import React, { useEffect, useState } from 'react';

interface ButtonHideSeeProps {
  setSubComments: React.Dispatch<React.SetStateAction<{ [key: number]: SubsComments[] }>>;
  setExpandedComments: React.Dispatch<React.SetStateAction<number[]>>;
  expandedComments: number[];
  comment: Comments;
  connection: signalR.HubConnection | null;
  subComments: { [key: number]: SubsComments[] };
  setDataComments: React.Dispatch<React.SetStateAction<Comments[]>>;
}

const ButtonHideSee = ({
  comment,
  subComments,
  setSubComments,
  expandedComments,
  setExpandedComments,
  connection,
  setDataComments,
}: ButtonHideSeeProps) => {
  const [pagina, setPagina] = useState(1);
  const [commentId, setCommentId] = useState<number>();

  const loadSubComments = async (commentId: number) => {
    setCommentId(commentId);

    let registroPorPagina = 5;

    if (subComments[commentId] === undefined || comment.subCommentsCountsMock > 0) {
      const res = await fetch(`${Url}/subComments/${commentId}/${pagina}/${registroPorPagina}`);
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

        setDataComments((prev) =>
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

    if (subComments[commentId].length === comment.subCommentsCounts) {
      setExpandedComments((prevExpandedComments) => [...prevExpandedComments, commentId]);
      return;
    }
  };

  return (
    <Styled.Wrapper__Button>
      {comment.subCommentsCountsMock <= 0 && expandedComments.includes(comment.id) ? (
        <Styled.Button
          onClick={() =>
            setExpandedComments((prevExpandedComments) =>
              prevExpandedComments.filter((id) => id !== comment.id)
            )
          }
        >
          Ocultar resposta
        </Styled.Button>
      ) : (
        <Styled.Button onClick={() => loadSubComments(comment.id)}>
          Ver respostas{' '}
          {comment.subCommentsCountsMock <= 0
            ? comment.subCommentsCounts
            : comment.subCommentsCountsMock}
        </Styled.Button>
      )}
    </Styled.Wrapper__Button>
  );
};

export default ButtonHideSee;
