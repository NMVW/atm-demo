export interface State {
  selectedAlbum: null | string,
  albums: {
    status: 'online' | 'pending' | 'error' | ''
    list: Array<Album> | []
  }
}

export interface AlbumResponse {
  id: string
  name: string
  kind: string
  artistName: string
  releaseDate: string
  artistId: string
  artistUrl: string
  artworkUrl100: string
  url: string
  genres: {genreId: string, name: string, url: string}[]
}

export interface Album {
  id: string
  name: string
  artistName: string
  coverImage: string // artworkUrl100
  genres: string[] // genre.name
}
