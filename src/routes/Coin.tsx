import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchChart, fetchPrice } from "../api";
import { Helmet } from "react-helmet";

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

const Loading = styled.span`
  text-align: center;
  display: block;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0;
  border-radius: 10px;

  a {
    display: block;
    color: ${(props) =>
      props.isActive ? props.theme.accentColor : props.theme.textColor};
  }
`;

interface ILocation {
  state: { name: string };
}

// interface IInfo {
//   id: string;
//   name: string;
//   symbol: string;
//   rank: number;
//   is_new: boolean;
//   is_active: boolean;
//   type: string;
//   description: string;
//   message: string;
//   open_source: boolean;
//   started_at: string;
//   development_status: string;
//   hardware_wallet: boolean;
//   proof_type: string;
//   org_structure: string;
//   hash_algorithm: string;
//   first_data_at: string;
//   last_data_at: string;
// }

// interface IPrice {
//   id: string;
//   name: string;
//   symbol: string;
//   rank: number;
//   circulating_supply: number;
//   total_supply: number;
//   max_supply: number;
//   beta_value: number;
//   first_data_at: string;
//   last_updated: string;
//   quotes: {
//     USD: {
//       ath_date: string;
//       ath_price: number;
//       market_cap: number;
//       market_cap_change_24h: number;
//       percent_change_1h: number;
//       percent_change_1y: number;
//       percent_change_6h: number;
//       percent_change_7d: number;
//       percent_change_12h: number;
//       percent_change_15m: number;
//       percent_change_24h: number;
//       percent_change_30d: number;
//       percent_change_30m: number;
//       percent_from_price_ath: number;
//       price: number;
//       volume_24h: number;
//       volume_24h_change_24h: number;
//     };
//   };
// }

function Coin() {
  const { coinId } = useParams();
  const { state } = useLocation() as ILocation;
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery(
    ["info", `${coinId}`],
    () => fetchChart(coinId!),
    {
      refetchInterval: 5000,
    }
  );

  const { isLoading: priceLoading, data: priceData } = useQuery(
    ["price", `${coinId}`],
    () => fetchPrice(coinId!)
  );

  const LOADING = infoLoading || priceLoading;

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : LOADING ? "Loading..." : infoData.name}
        </title>
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Header>
        <Title>
          {state?.name ? state.name : LOADING ? "Loading..." : infoData.name}
        </Title>
      </Header>
      {LOADING ? (
        <Loading>Loading...</Loading>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank: </span>
              <span>{infoData.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol: </span>
              <span>${infoData.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price: </span>
              <span>$ {priceData.quotes.USD.price.toFixed(3) || "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Supply: </span>
              <span>{priceData.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply: </span>
              <span>{priceData.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Outlet context={{ coinId: coinId }} />
        </>
      )}
    </Container>
  );
}

export default Coin;
