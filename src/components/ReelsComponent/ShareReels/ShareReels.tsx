import * as Styled from './styled';
import { useEffect, useLayoutEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Url from '../../../Utils/Url';
import { ListReels, ReelsContext, ReelsContextProps } from '../../../templates/Reels/Reels';

interface ShareReelsProps {
  userId: number | null;
  reels: ListReels;
}

interface UsersSuggestion {
  id: number;
  name: string;
  email: string;
  imagePerfil: string;
}

const ShareReels = ({ userId, reels }: ShareReelsProps) => {
  const [showShareReels, setShowShareReels] = useState(false);
  const [usersSuggestion, setUsersSuggestion] = useState<UsersSuggestion[] | null>(null);
  const userContextReels = useContext<ReelsContextProps | null>(ReelsContext);

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
  const [listNameUserChecked, setListNameUserChecked] = useState<UsersSuggestion[] | []>([]);
  const [userMarkedDelete, setUserMarkedDelete] = useState('');

  const handleClickLabel = (value: UsersSuggestion) => {
    if (listOfUserMarked[value.name]) {
      setListOfUserMarked((prev) => ({
        ...prev,
        [value.name]: false,
      }));
      setListNameUserChecked((prev) => prev.filter((u) => u.name !== value.name));
      setAmountOfchecked((prev) => (prev == 0 ? prev : prev - 1));
    } else {
      setListOfUserMarked((prev) => ({
        ...prev,
        [value.name]: true,
      }));
      setListNameUserChecked((prev) => [...prev, value]);
      setAmountOfchecked((prev) => prev + 1);
    }

    setIdClicked(value.id);
  };

  useLayoutEffect(() => {
    if (usersSuggestion === null) return;
    setAmountOfchecked(0);
    setListNameUserChecked([]);
    setUserMarkedDelete('');
    usersSuggestion.forEach((user) => {
      setListOfUserMarked((prev) => ({
        ...prev,
        [user.name]: false,
      }));
    });
  }, [usersSuggestion]);

  const handleClickNameSuggestion = (name: string) => {
    if (userMarkedDelete == name) {
      setListOfUserMarked((prev) => ({
        ...prev,
        [name]: false,
      }));

      setListNameUserChecked((prev) => prev.filter((nameuser) => nameuser.name !== name));
      setUserMarkedDelete('');
    } else {
      setUserMarkedDelete(name);
    }
  };

  const handleClickDeleteUserSendReels = (name: string) => {
    setListOfUserMarked((prev) => ({
      ...prev,
      [name]: false,
    }));

    setListNameUserChecked((prev) => prev.filter((nameuser) => nameuser.name !== name));
  };

  const handleSendReelsForFriends = () => {
    if (userContextReels === null || userContextReels.connection === null) return;
    console.log(userContextReels.connection);

    listNameUserChecked.forEach((user) => {});
  };

  return (
    <Styled.ContainerShare>
      <Styled.WrapperImg onClick={handleOpenShare} $wrapper="icon-share">
        <svg
          aria-label="Direto"
          color="rgb(38, 38, 38)"
          fill="rgb(38, 38, 38)"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <title>Direto</title>
          <line
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="2"
            x1="22"
            x2="9.218"
            y1="3"
            y2="10.083"
          ></line>
          <polygon
            fill="none"
            points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="2"
          ></polygon>
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
                    {listNameUserChecked.map((user, index) => (
                      <Styled.ContainerUserMarked
                        key={index}
                        $name={user.name}
                        $usermarkeddelete={userMarkedDelete}
                      >
                        <Styled.ParagraphUserMarked
                          onClick={() => handleClickNameSuggestion(user.name)}
                          $name={user.name}
                          $usermarkeddelete={userMarkedDelete}
                        >
                          {user.name}
                        </Styled.ParagraphUserMarked>
                        <FontAwesomeIcon
                          icon={faXmark}
                          onClick={() => handleClickDeleteUserSendReels(user.name)}
                        />
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
              <Styled.WrapperButton onClick={handleSendReelsForFriends}>
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
