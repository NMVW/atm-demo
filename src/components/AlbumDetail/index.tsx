import Typography from '@material-ui/core/Typography';

import ImageList from '@material-ui/core/GridList';
import ImageListItem from '@material-ui/core/GridListTile';
import ImageListItemBar from '@material-ui/core/GridListTileBar';

import { Album } from '../../interfaces';

import React from 'react';

export default function AlbumDetail(props: { album: Album }) {
  const { coverImage, name, artistName, genres = [] } = props.album;
  return (
    <ImageListItem style={{ marginTop: '5rem' }}>
      <img src={coverImage} />
      <ImageListItemBar
        title={`${name} | ${genres.join(', ')}`}
        subtitle={<span>{artistName}</span>}
        titlePosition="bottom"
      />
    </ImageListItem>
  );
}
