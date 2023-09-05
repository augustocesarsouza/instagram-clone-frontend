import { useNavigate } from 'react-router-dom';
import * as Styled from './styled';

const NotFound = () => {
  const nav = useNavigate();

  const handleBackLogin = () => {
    nav('/');
  };

  return (
    <Styled.ContainerMain>
      <Styled.ContainerSub>
        <Styled.H1>Page Not Found</Styled.H1>
        <Styled.Button onClick={handleBackLogin}>Go to Login</Styled.Button>
      </Styled.ContainerSub>
    </Styled.ContainerMain>
  );
};
export default NotFound;
