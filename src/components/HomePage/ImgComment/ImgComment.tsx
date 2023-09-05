import * as Styled from './styled';

interface ImgCommentProps {
  url: string;
}

const ImgComment = ({ url }: ImgCommentProps) => {
  return (
    <Styled.ContainerImg>
      <Styled.Img src={url} />
    </Styled.ContainerImg>
  );
};

export default ImgComment;
