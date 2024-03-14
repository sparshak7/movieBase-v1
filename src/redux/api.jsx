import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const key = import.meta.env.VITE_TMDB_API;
const auth = import.meta.env.VITE_AUTH_API;

export const myAPI = createApi({
  reducerPath: "myAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/",
  }),
  endpoints: (builder) => ({
    getRecent: builder.query({
      query: () => `movie/upcoming?api_key=${key}`,
    }),

    getPopular: builder.query({
      query: (type) => `${type}/popular?api_key=${key}`,
    }),

    getRecentTV: builder.query({
      query: () => `tv/airing_today?api_key=${key}`,
    }),

    getTrendingTV: builder.query({
      query: () => `trending/movie/week?api_key=${key}`,
    }),

    getSearch: builder.query({
      query: (keyword) => ({
        url: `search/multi?query=${keyword}&language=en-US`,
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      }),
    }),

    getDetails: builder.query({
      query: (args) => {
        const { type, id } = args;
        return {
          url: `${type}/${id}?api_key=${key}`,
        };
      },
    }),

    getCredits: builder.query({
      query: (args) => {
        const { type, id } = args;
        return {
          url: `${type}/${id}/credits?api_key=${key}`,
        };
      },
    }),

    getRecommended: builder.query({
      query: (args) => {
        const { type, id } = args;
        return {
          url: `${type}/${id}/recommendations?api_key=${key}`,
        };
      },
    }),

    getVideos: builder.query({
      query: (args) => {
        const { type, id } = args;
        return {
          url: `${type}/${id}/videos?api_key=${key}`,
        };
      },
    }),

    getPeopleDetails: builder.query({
      query: (id) => `person/${id}?api_key=${key}`,
    }),

    getCombinedCredits: builder.query({
      query: (id) => `person/${id}/combined_credits?api_key=${key}`,
    }),

    getDiscover: builder.query({
      query: (args) => {
        const { type, sortBy, page } = args;
        return {
          url: `discover/${type}?api_key=${key}&page=${page}&sort_by=${sortBy}`,
        };
      },
    }),
  }),
});

export const {
  useGetRecentQuery,
  useGetPopularQuery,
  useGetRecentTVQuery,
  useGetSearchQuery,
  useGetTrendingTVQuery,
  useGetDetailsQuery,
  useGetCreditsQuery,
  useGetRecommendedQuery,
  useGetVideosQuery,
  useGetPeopleDetailsQuery,
  useGetCombinedCreditsQuery,
  useGetDiscoverQuery,
} = myAPI;
