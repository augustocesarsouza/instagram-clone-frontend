import * as Styled from './styled.ts';
import CardPost, { AllPost } from '../../components/HomePage/CardPost/CardPost.tsx';
import { useEffect } from 'react';

interface AllPostsProps {
  createImgOrVideo: AllPost | null;
  connection: signalR.HubConnection | null;
}

const AllPosts = ({ createImgOrVideo, connection }: AllPostsProps) => {
  useEffect(() => {
    document.body.style.overflowY = 'none';
  }, []);
  return (
    <Styled.Container id="container-scroll">
      <CardPost createImgOrVideo={createImgOrVideo} connection={connection} />
    </Styled.Container>
  );
};

export default AllPosts;
