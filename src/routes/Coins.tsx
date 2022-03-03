import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./../api";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "./../atoms";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
  border-radius: 15px;
  border: 1px solid white;

  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
  }

  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

const Loading = styled.span`
  text-align: center;
  display: block;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

interface ICoinsProps {}

function Coins() {
  const setIsDark = useSetRecoilState(isDarkAtom);
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  const onClick = () => {
    setIsDark((current) => !current);
  };

  return (
    <Container>
      <Helmet>
        <title>Coin</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <Header>
        <Title>Coin</Title>
        <button onClick={onClick}>Toggle Mode</button>
      </Header>
      <CoinsList>
        {isLoading ? (
          <Loading>Loading...</Loading>
        ) : (
          data?.map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img
                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))
        )}
      </CoinsList>
    </Container>
  );
}

export default Coins;
