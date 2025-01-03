import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { CatalogCarSlice } from '../../interfaces/slice.interface';
import { CarCatologModel } from '../../interfaces/catologCars.interface';

const initialState: CatalogCarSlice = {
    catalogCar: null,
    stateLoad: {
        isLoading: false,
        error: false,
    },
};

const catalogCarLoader = createAsyncThunk(
    'catalogCar/fetchCatalogCar',
    async (params: string | undefined): Promise<CarCatologModel> => {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL!}/car_catalogs/${params?.split('_')[1]}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();

        return result[0];
    },
);

const catalogCarSlice = createSlice({
    name: 'catalogCar',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(catalogCarLoader.fulfilled, (state, action) => {
                state.stateLoad.isLoading = false;
                state.stateLoad.error = false;
                state.catalogCar = action.payload;
            })
            .addCase(catalogCarLoader.pending, (state) => {
                state.stateLoad.error = false;
                state.stateLoad.isLoading = true;
            })
            .addCase(catalogCarLoader.rejected, (state) => {
                state.stateLoad.error = true;
                state.stateLoad.isLoading = false;
            });
    },
});

export { catalogCarLoader };
export default catalogCarSlice.reducer;
