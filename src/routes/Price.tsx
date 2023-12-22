import { useQuery } from 'react-query';
import { fetchCoinHistory } from './api';
import styled from 'styled-components';

const OverviewPrice = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
`;
const OverviewPriceItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Priceview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
`;
const PriceviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(coinId),
    { refetchInterval: 1000 * 60 }
  );

  return (
    <div>
      {isLoading ? (
        'Loading price...'
      ) : (
        <>
          <OverviewPrice>
            <OverviewPriceItem>
              <span>Count</span>
            </OverviewPriceItem>
            <OverviewPriceItem>
              <span>Date</span>
            </OverviewPriceItem>
            <OverviewPriceItem>
              <span>Price</span>
            </OverviewPriceItem>
          </OverviewPrice>
          <hr />

          {data?.map((priceInfo, i) => {
            const date = new Date(priceInfo.time_close);
            const formattedTime = `${
              date.getMonth() + 1
            }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            return (
              <>
                <Priceview>
                  <PriceviewItem>
                    <span>{i + 1}.</span>
                  </PriceviewItem>
                  <PriceviewItem>
                    <span>{formattedTime}</span>
                  </PriceviewItem>
                  <PriceviewItem>
                    <span>${priceInfo.close}</span>
                  </PriceviewItem>
                </Priceview>
              </>
            );
          })}
        </>
      )}
    </div>
  );
}

export default Price;

interface PriceProps {
  coinId: string;
}
interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
