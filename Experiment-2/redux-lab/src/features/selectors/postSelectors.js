import { createSelector } from "@reduxjs/toolkit";

// Basic Selectors

export const selectPosts = (state) => state.posts.posts;

export const selectSearch = (state) => state.posts.search;

export const selectPlatformFilter = (state) => state.posts.platformFilter;


// Memoized Selector

export const selectFilteredPosts = createSelector(
    [selectPosts, selectSearch, selectPlatformFilter],

    (posts, search, platformFilter) => {

        return posts.filter((post) => {

            const searchMatch =
                post.content.toLowerCase().includes(search.toLowerCase());

            const platformMatch =
                platformFilter === "All" ||
                post.platform === platformFilter;

            return searchMatch && platformMatch;

        });

    }
);