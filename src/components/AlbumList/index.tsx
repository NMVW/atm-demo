import Typography from '@material-ui/core/Typography';

import ImageList from '@material-ui/core/GridList';
import ImageListItem from '@material-ui/core/GridListTile';
import ImageListItemBar from '@material-ui/core/GridListTileBar';

import { Album, AlbumGenreMap } from '../../interfaces';

import React from 'react';

interface Title {
  id: string
  name: string
  artistName: string
  coverImage: string
}

const Genre = (props: {genre: string}) => <Typography variant="h4" gutterBottom>{props.genre}</Typography>

const TitleList = (props: {titles: Title[]}) => {
  return (
    <ImageList>
      {props.titles.map(({ id, name, artistName, coverImage }) => (
        <ImageListItem key={id}>
          <img src={coverImage} />
          <ImageListItemBar
            title={name}
            subtitle={<span>{artistName}</span>}
            titlePosition="bottom"
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
};

export default function AlbumList(props: { isLoading: boolean, albums: AlbumGenreMap }) {
  const albums = props.albums || {};
  const firstStyle = { marginTop: '5rem' };
  debugger;
  return (
    <>
      { Object.entries(albums).map(([genre, albums], i) => (
        <div style={i === 0 ? firstStyle: {}}>
          <Genre genre={genre} />
          <TitleList titles={albums} />
        </div>
      )) }
    </>
  );
}
