import * as Styled from './styled';
import { useEffect, useState, useLayoutEffect, memo } from 'react';

interface ContainerPublicationsProps {
  ContainerMainRefWidth: React.MutableRefObject<HTMLDivElement | null>;
}

const ContainerPublications = ({ ContainerMainRefWidth }: ContainerPublicationsProps) => {
  const [widthForDiv, setWidthForDiv] = useState(0);

  useLayoutEffect(() => {
    window.addEventListener('resize', handleResizeWindow);

    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, [ContainerMainRefWidth.current]);

  const handleResizeWindow = () => {
    if (ContainerMainRefWidth.current === null) return;

    setWidthForDiv(ContainerMainRefWidth.current.clientWidth);
  };

  useLayoutEffect(() => {
    if (ContainerMainRefWidth.current === null) return;

    setWidthForDiv(ContainerMainRefWidth.current.clientWidth);
  }, [ContainerMainRefWidth.current]);

  return (
    <>
      <Styled.WrapperPublicationsMain>
        <Styled.ContainerMainPublications $widthfordiv={widthForDiv}>
          <Styled.WrapperPublications>
            <Styled.ButtonPublications>PUBLICAÇÕES</Styled.ButtonPublications>
          </Styled.WrapperPublications>
        </Styled.ContainerMainPublications>
      </Styled.WrapperPublicationsMain>
    </>
  );
};

export default ContainerPublications;
