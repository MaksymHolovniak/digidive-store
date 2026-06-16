import type { StatisticsResponse } from "@/types/statistics.types";
import { protectedApi } from "./protected.api";

export const statisticsApi = protectedApi.injectEndpoints({
  endpoints: (builder) => ({
    getStatistics: builder.query<StatisticsResponse, void>({
      query: () => "/statistics/main",
      providesTags: ["Order", "Products"],
    }),
  }),
});

export const { useGetStatisticsQuery } = statisticsApi;
