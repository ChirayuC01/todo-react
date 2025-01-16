import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isList: true,
};

const viewSlice = createSlice({
    name: 'view',
    initialState,
    reducers: {
        toggleView: (state) => {
            state.isList = !state.isList;
        },
    },
});

export const { toggleView } = viewSlice.actions;
export default viewSlice.reducer;
