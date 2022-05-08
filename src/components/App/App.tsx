import React, { useEffect, useState, MouseEvent, ReactHTMLElement } from 'react';
import logo from './logo.png';
import './App.css';
import currency from 'currency.js';

import Search from '../Search';
import Notice from '../Notice';
import { State, Album } from '../../interfaces';
import { fetchAlbums, hydrate } from '../../services/redux';
import AlbumList from '../AlbumList';
import AppMenu from '../Menu';

import { useSelector, useDispatch } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Avatar from '@material-ui/core/Avatar';
import OfflineIcon from '@material-ui/icons/OfflineBolt';

import { Provider } from 'react-redux';
import { store } from '../../services/redux';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  "palette": {
    "primary": {
      "main": "#36B2AA"
    },
    "secondary": {
      "main": "#945231"
    },
    "error": {
      "main": "#B2363E"
    },
    "success": {
      "main": "#7CB236"
    }
  }
});

function App () {

  const dispatch = useDispatch();

  const selectedAlbum: string | null = useSelector((state: State) => state.selectedAlbum);
  const albumsLoadingStatus: string = useSelector((state: State) => state.albums.status);
  const albums: Album[] = useSelector((state: State) => state.albums.list);

  const [ searchInput, setSearchInput ] = useState('');

  const [ toast, setToast ] = useState('');
  const [ menuAnchor, setMenuAnchor ] = useState<ReactHTMLElement<HTMLAnchorElement> | null>(null);

  // fetch albums on initial load
  useEffect(() => {

    async function fetchRecentAlbums() {
      // fetch and add albums to store
      const albums = await dispatch(fetchAlbums()) as any;
      dispatch(hydrate(albums));
    }

    fetchRecentAlbums();

  }, []);

  // toast watcher
  useEffect(() => {
    switch (albumsLoadingStatus) {
      case 'pending':
        setToast('Loading top 50 albums...');
        break;
      case 'online':
        setToast('Albums loaded.');
        break;
      case 'error':
        setToast('Album data unavailable.');
        break;
    }
  }, [albumsLoadingStatus]);

  const isLoading = albumsLoadingStatus === 'pending';

  return (
    <Card style={{ padding: '2rem' }}>
      <CardContent>
        <header style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }}>
          <Typography className="AccountBalance" variant="h2" gutterBottom>Filmhub Music</Typography>
          <Avatar
            className={isLoading ? 'App-logo-load': 'App-logo'}
            src={logo}
            style={{ marginBottom: '1rem' }}
            onMouseOver={(ev: MouseEvent) => setMenuAnchor(ev.currentTarget as any)}
          />
          { menuAnchor && <AppMenu anchor={menuAnchor} close={() => setMenuAnchor(null)} /> }
          <Typography variant="overline" hidden={albumsLoadingStatus !== 'error'}><OfflineIcon />Offline</Typography>
          <Search input={searchInput} update={setSearchInput} isLoading={isLoading} />
        </header>
        <br />
        <Typography variant="h6" gutterBottom>
          Recent Albums
        </Typography>
        <AlbumList albums={albums} isLoading={isLoading} />
        { toast && <Notice message={toast} stickMs={1000} reset={() => setToast('')} /> }
      </CardContent>
    </Card>
  );

}

export default function AppContainer() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Provider>
  );
}
