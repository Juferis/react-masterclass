import { useQuery } from 'react-query';
import { fetchCoinHistory } from './api';

import ApexChart from 'react-apexcharts';
import { theme } from '../theme';

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(coinId),
    { refetchInterval: 1000 * 60 }
  );
  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: 'Price',
              data:
                data?.map((price) => {
                  console.log(price);
                  const data = {
                    x: price.time_close,
                    y: [price.open, price.high, price.low, price.close],
                  };
                  return data;
                }) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: 'dark',
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: 'transparent',
            },
            grid: { show: false },
            stroke: {
              curve: 'smooth',
              width: 4,
            },
            yaxis: {
              show: true,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: true },
              type: 'datetime',
              categories: data?.map((price) => price.time_close),
            },
            fill: {
              type: 'gradient',
              gradient: {
                gradientToColors: [theme.accentColor],
                stops: [0, 60],
              },
            },
            colors: ['#657939'],
            tooltip: {
              y: {
                formatter: (value) => `$${value}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;

interface ChartProps {
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
