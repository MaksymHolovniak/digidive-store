export type MainMetrics = {
  title: string;
  value: string | number;
};

type SalesPoint = {
  day: string;
  revenue: number;
};

type OrderStatusPoint = {
  name: string;
  value: number;
};

export type StatisticsResponse = {
  mainMetrics: MainMetrics[];
  salesData: SalesPoint[];
  ordersDistribution: OrderStatusPoint[];
};
