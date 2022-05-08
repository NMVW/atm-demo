import { State, Album } from '../interfaces';

import { combineReducers } from 'redux';
import { configureStore, createSlice, createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { fetchAlbums as fetchRecentAlbums } from './api';

const INITIAL_STATE: State = {
  selectedAlbum: null,
  albums: {
    status: '',
    list: [],
  },
};

interface Action {
  payload: any
  type: string
}

const selectedAlbumSlice = createSlice({
  name: 'selectedAlbum',
  initialState: INITIAL_STATE.selectedAlbum,
  reducers: {

    selectAlbum(state, action) {
      return action?.payload?.id || null;
    }

  },
});

// creates sub action types /<fulfilled|pending|rejected>
const fetchAlbums = createAsyncThunk(
  'albums/fetch',
  async () => fetchRecentAlbums(),
);

const albumsSlice = createSlice({
  name: 'albums',
  initialState: INITIAL_STATE.albums,
  reducers: {

    hydrate: {
      reducer(state: {status: string, list: Album[] | []}, action: Action): any {
        return action.payload;
      },
      prepare(album) {
        return album;
      }
    },

  },

  // handle async request states
  extraReducers: (builder: ActionReducerMapBuilder<{status: string, list: Album[]}>) => {

    builder.addCase(fetchAlbums.pending, (state: { status: string, list: Album[] }, action: any) => {
      state.status = 'pending';
      return state;
    });

    builder.addCase(fetchAlbums.fulfilled, (state: { status: string, list: Album[] }, action: any) => {
      state.status = action.payload.status; // can be error
      return state;
    });

    builder.addCase(fetchAlbums.rejected, (state: { status: string, list: Album[] }, action: any) => {
      state.status = 'error';
      return state;
    });

  },

});

export const { selectAlbum } = selectedAlbumSlice.actions;
export const { hydrate } = albumsSlice.actions;
export { fetchAlbums };

export const reducer = combineReducers({
  selectedAlbum: selectedAlbumSlice.reducer,
  albums: albumsSlice.reducer,
});

export const store = configureStore({ reducer })

export { INITIAL_STATE };
