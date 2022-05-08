import mock_albums_api_data from './mock-api-data.json';

import { Album, AlbumResponse } from '../interfaces';

const albums_api_url = process.env.REACT_APP_API_ALBUMS_URL as string;

interface Albums {
  status: 'online' | 'offline' | 'error'
  albums: {[genre: string]: Array<Album>}
}

export async function fetchAlbums(): Promise<Albums> {
  try {
    // Need to proxy the request via a backend api call due to CORS issue
    // "No 'Access-Control-Allow-Origin' header is present on the requested resource" response for api endpoint

    // const response = await fetchWithTimeout(albums_api_url,
    // {
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Type': 'application/json',
    //   },
    //   timeout: 8000,
    // });
    // const data = await response.json();
    const data = mock_albums_api_data;
    const albums = transformResponse(data.feed.results);
    return {
      status: 'online',
      albums,
    };
  } catch (error) {
    if (error.name === 'AbortError') {
      // request timed out
      return {
        status: 'offline',
        albums: {},
      };
    } else {
      return {
        status: 'error',
        albums: {},
      };
    }
  }
}

/**
  NOTE: Cache transformed response to minimize unnecessary computes
*/
function transformResponse(albumResponse: AlbumResponse[]): Albums["albums"] {

  return albumResponse.reduce((albums: Albums["albums"], albumResponse: AlbumResponse) => {

    const { id, name, artistName, artworkUrl100 } = albumResponse;
    const genreNames = albumResponse.genres.map(({ name }) => name);

    const parsedAlbum = { id, name, artistName, coverImage: artworkUrl100, genres: genreNames };

    // add album to various genre categories
    albumResponse.genres.forEach(({ name: genreName }) => {
      if (albums[genreName]) {
        albums[genreName].push(parsedAlbum);
      } else {
        albums[genreName] = [parsedAlbum];
      }
    });

    return albums;
  }, {});

}

// wrapper for timing out outbound fetch requests
async function fetchWithTimeout(resource: string, options: any = {}) {
  const { timeout = 8000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });

  clearTimeout(id);

  return response;
}
