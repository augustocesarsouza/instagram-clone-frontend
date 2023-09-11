import * as Styled from './styled';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Url from '../../../Utils/Url';

interface ShareReelsProps {
  userId: number | null;
}

interface UsersSuggestion {
  id: number;
  name: string;
  email: string;
  imagePerfil: string;
}

const ShareReels = ({ userId }: ShareReelsProps) => {
  const [showShareReels, setShowShareReels] = useState(false);
  const [usersSuggestion, setUsersSuggestion] = useState<UsersSuggestion[] | null>(null);

  useEffect(() => {
    const fetchSuggestionUsers = async () => {
      if (userId === null) return;
      const res = await fetch(`${Url}/user/following-followers/suggestion/story/${userId}`);
      if (res.status === 200) {
        const json = await res.json();
        setUsersSuggestion(json.data);
      }
    };
    fetchSuggestionUsers();
  }, []);

  const handleOpenShare = () => {
    setShowShareReels((prev) => !prev);
  };

  const closeModal = () => {
    setShowShareReels(false);
  };

  const [amountOfchecked, setAmountOfchecked] = useState(0);

  const [idClicked, setIdClicked] = useState(0);
  const [listOfUserMarked, setListOfUserMarked] = useState<{ [key: string]: boolean }>({});
  const [listNameUserChecked, setListNameUserChecked] = useState<string[] | []>([]);

  const handleClickLabel = (value: UsersSuggestion) => {
    if (listOfUserMarked[value.name]) {
      setListOfUserMarked((prev) => ({
        ...prev,
        [value.name]: false,
      }));
      setListNameUserChecked((prev) => prev.filter((u) => u !== value.name));
      setAmountOfchecked((prev) => (prev == 0 ? prev : prev - 1));
    } else {
      setListOfUserMarked((prev) => ({
        ...prev,
        [value.name]: true,
      }));
      setListNameUserChecked((prev) => [...prev, value.name]);
      setAmountOfchecked((prev) => prev + 1);
    }

    setIdClicked(value.id);
  };

  useLayoutEffect(() => {
    if (usersSuggestion === null) return;
    setAmountOfchecked(0);
    usersSuggestion.forEach((user) => {
      setListOfUserMarked((prev) => ({
        ...prev,
        [user.name]: false,
      }));
    });
  }, [usersSuggestion]);

  return (
    <Styled.ContainerShare>
      <Styled.WrapperImg onClick={handleOpenShare} $wrapper="icon-share">
        <svg viewBox="0 0 95.25 95.25" version="1.1">
          <g transform="translate(-57.826275,-64.880486)">
            <path d="m 91.187387,148.09851 c -0.37227,-0.71453 -0.396441,-1.38673 -0.159673,-4.43957 0.153457,-1.97867 0.804997,-10.56286 1.447845,-19.07598 l 1.168813,-15.47841 -13.374037,-7.73739 c -7.355725,-4.255551 -14.765931,-8.540144 -16.46712,-9.521307 -3.625041,-2.09073 -4.093713,-2.610273 -3.653812,-4.050359 0.191282,-0.626195 0.470409,-1.020797 0.874059,-1.235651 0.504412,-0.268493 10.433148,-1.266758 45.795658,-4.604429 3.17831,-0.299979 13.78128,-1.307826 23.56217,-2.239654 9.78089,-0.931831 17.9378,-1.646288 18.12645,-1.587685 1.29249,0.401501 1.86118,2.137067 1.08798,3.320326 -0.24638,0.377045 -5.75299,7.106052 -12.23692,14.953349 -6.48391,7.84729 -18.8153,22.78634 -27.40306,33.19787 -8.58776,10.41155 -15.835401,19.07804 -16.105879,19.25888 -0.270473,0.18084 -0.881473,0.27327 -1.357766,0.2054 -0.741022,-0.10566 -0.929305,-0.24496 -1.304708,-0.96539 z m 15.227533,-21.02824 c 5.66538,-6.88578 15.35301,-18.6594 21.52805,-26.16361 6.17505,-7.504198 11.17631,-13.659862 11.11392,-13.679243 -0.28433,-0.08833 -41.106013,21.781043 -41.197043,22.070463 -0.0974,0.30974 -2.34326,29.56272 -2.348628,30.59185 -0.0026,0.48505 -0.0016,0.48533 0.300228,0.0933 0.166515,-0.21622 4.938073,-6.02694 10.603463,-12.91271 z m 10.30513,-32.792816 c 18.45299,-9.830474 20.55441,-11.008257 19.43022,-10.890018 -0.69329,0.07291 -6.91609,0.674222 -13.82843,1.336233 -21.83079,2.090782 -51.24144,4.919539 -52.289258,5.029253 -0.554549,0.05807 -0.906875,0.181495 -0.782949,0.274279 0.514399,0.385171 25.93368,14.975209 26.338452,15.117599 0.30124,0.10603 7.005335,-3.34165 21.131965,-10.867346 z" />
          </g>
        </svg>
      </Styled.WrapperImg>
      {showShareReels && (
        <Styled.ContainerShareReels>
          <Styled.ContainerMainShareAndSearch>
            <Styled.ContainerTop>
              <Styled.ContainerX>
                <FontAwesomeIcon icon={faXmark} onClick={closeModal} />
              </Styled.ContainerX>
              <Styled.ContainerP>
                <Styled.P $paragraph="upside">Compartilhamento</Styled.P>
              </Styled.ContainerP>
            </Styled.ContainerTop>
            <Styled.ContainerFilter $amountofchecked={amountOfchecked}>
              <Styled.P $paragraph="upside">Para: </Styled.P>
              <Styled.ContainerSearch $amountofchecked={amountOfchecked}>
                {amountOfchecked > 0 && (
                  <>
                    {listNameUserChecked.map((name, index) => (
                      <Styled.ContainerUserMarked key={index}>
                        <Styled.P $paragraph="usermarked">
                          {name} <FontAwesomeIcon icon={faXmark} />
                        </Styled.P>
                      </Styled.ContainerUserMarked>
                    ))}
                  </>
                )}

                <Styled.Input placeholder="Pesquisar..."></Styled.Input>
              </Styled.ContainerSearch>
            </Styled.ContainerFilter>
          </Styled.ContainerMainShareAndSearch>
          <Styled.Article>
            <Styled.ContainerSuggestion>
              <Styled.P $paragraph="upside">Sugestões</Styled.P>
            </Styled.ContainerSuggestion>
            <Styled.ContainerMainAllUsersSuggestion>
              {usersSuggestion &&
                usersSuggestion.map((us) => (
                  <Styled.ContainerUserSuggestion key={us.id} onClick={() => handleClickLabel(us)}>
                    <Styled.ContainerMainInfoUser>
                      <Styled.WrapperImg $wrapper="suggestion">
                        <Styled.Img
                          $img="suggestion"
                          src={us.imagePerfil}
                          alt="img-user-suggestion"
                        />
                      </Styled.WrapperImg>
                      <Styled.ContainerInfoUserSuggestion>
                        <Styled.P $paragraph="suggestion">{us.name}</Styled.P>
                      </Styled.ContainerInfoUserSuggestion>
                    </Styled.ContainerMainInfoUser>
                    <Styled.ContainerMainLabel>
                      <Styled.WrapperInputCheckbox>
                        <Styled.Label
                          $listofusermarked={listOfUserMarked}
                          $nameuserlabel={us.name}
                          $idclicked={idClicked}
                        ></Styled.Label>
                      </Styled.WrapperInputCheckbox>
                    </Styled.ContainerMainLabel>
                  </Styled.ContainerUserSuggestion>
                ))}
            </Styled.ContainerMainAllUsersSuggestion>
          </Styled.Article>
          <Styled.ContainerMainSend
            $amountofchecked={amountOfchecked >= 1 ? String(true) : String(false)}
          >
            {amountOfchecked >= 1 && (
              <Styled.ContainerSendMessage>
                <Styled.Input placeholder="Escreva uma mensagem..."></Styled.Input>
              </Styled.ContainerSendMessage>
            )}

            {amountOfchecked == 0 && (
              <Styled.WrapperButton>
                <Styled.Button $amountofchecked={String(amountOfchecked)}>Enviar</Styled.Button>
              </Styled.WrapperButton>
            )}

            {amountOfchecked == 1 && (
              <Styled.WrapperButton>
                <Styled.Button
                  $amountofchecked={amountOfchecked >= 1 ? String(true) : String(false)}
                >
                  Enviar
                </Styled.Button>
              </Styled.WrapperButton>
            )}

            {amountOfchecked > 1 && (
              <Styled.WrapperButton>
                <Styled.Button
                  $amountofchecked={amountOfchecked >= 1 ? String(true) : String(false)}
                >
                  Enviar separadamente
                </Styled.Button>
              </Styled.WrapperButton>
            )}
          </Styled.ContainerMainSend>
        </Styled.ContainerShareReels>
      )}
    </Styled.ContainerShare>
  );
};

export default ShareReels;
