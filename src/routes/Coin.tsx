import { useParams } from 'react-router-dom';

function Coin() {
  const { coinId } = useParams<CoinRouteParams>();
  return <h1>Coin: {coinId}</h1>;
}

export default Coin;

interface CoinRouteParams {
  coinId: string;
}
