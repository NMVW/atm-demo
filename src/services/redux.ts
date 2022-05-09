import { State, Album, AlbumGenreMap } from '../interfaces';

import { combineReducers } from 'redux';
import { configureStore, createSlice, createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { fetchAlbums as fetchRecentAlbums } from './api';

const INITIAL_STATE: State = {
  selectedAlbum: null,
  albums: {
    status: '',
    map: {},
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
      reducer(state: {status: string, map: AlbumGenreMap | {}}, action: Action): any {
        return action.payload;
      },
      prepare(thunkResp) {
        const { payload } = thunkResp;
        return {
          payload: {
            status: payload.status,
            map: payload.albums,
          }
        };
      }
    },

  },

  // handle async request states
  extraReducers: (builder: ActionReducerMapBuilder<{status: string, map: AlbumGenreMap}>) => {

    builder.addCase(fetchAlbums.pending, (state: { status: string, map: AlbumGenreMap }, action: any) => {
      state.status = 'pending';
      return state;
    });

    builder.addCase(fetchAlbums.fulfilled, (state: { status: string, map: AlbumGenreMap }, action: any) => {
      state.status = action.payload.status; // can be error
      return state;
    });

    builder.addCase(fetchAlbums.rejected, (state: { status: string, map: AlbumGenreMap }, action: any) => {
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
