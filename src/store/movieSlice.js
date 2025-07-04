import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    bannerData: [],
    imageURL: '',
    genres: [],
}
export const movieSlice = createSlice({
    name:'movie',
    initialState,
    reducers: {
        setBannerData: (state, action) => {
            state.bannerData = action.payload
        },
        setImageURL: (state, action) => {
            state.imageURL = action.payload
        },
        setGenres: (state, action) => {
            state.genres = action.payload
        }
    }
});

export const {setBannerData, setImageURL, setGenres} = movieSlice.actions

export default movieSlice.reducer