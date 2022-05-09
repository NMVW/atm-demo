import React, { useEffect, useState, MouseEvent, ReactHTMLElement } from 'react';
import logo from './logo.png';
import './App.css';

import Search from '../Search';
import Notice from '../Notice';
import { State, Album, AlbumGenreMap } from '../../interfaces';
import { selectAlbum, fetchAlbums, hydrate } from '../../services/redux';
import AlbumDetail from '../AlbumDetail';
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

function findAlbumFromMap(albumMap: AlbumGenreMap = {}, selectedId: string | null): Album | null {
  if (!selectedId) {
    return null;
  }
  for (const genre in albumMap) {
    const selectedAlbum = albumMap[genre].find(a => a.id === selectedId);
    if (selectedAlbum) {
      return selectedAlbum;
    }
  }
  return null;
}

function App () {

  const dispatch = useDispatch();

  const deselectAlbum = () => dispatch(selectAlbum(null));
  const selectedAlbum: Album | null = useSelector((state: State) => findAlbumFromMap(state.albums.map, state.selectedAlbum));
  const albumsLoadingStatus: string = useSelector((state: State) => state.albums.status);
  const albums: AlbumGenreMap = useSelector((state: State) => state.albums.map);

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
        <header style={{
          position: 'fixed',
          width: '100%',
          backgroundColor: 'white',
          top: '1rem',
          paddingTop: '1rem',
          flexDirection: 'row',
          display: 'flex',
          justifyContent: 'space-between',
          zIndex: 100,
        }}>
          <Typography onClick={deselectAlbum} className="AccountBalance" variant="h2" gutterBottom>Filmhub Music</Typography>
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
        { selectedAlbum ? <AlbumDetail album={selectedAlbum} />: <AlbumList albums={albums} isLoading={isLoading} /> }
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
