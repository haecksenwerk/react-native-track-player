import type { AndroidMediaItem, Track } from 'react-native-track-player';
import playlistData from '../assets/data/playlist.json';

interface AndroidMediaItemWithChildren extends AndroidMediaItem {
  children?: AndroidMediaItemWithChildren[];
}

function trackToAndroidMediaItem(track: Track): AndroidMediaItem {
  return {
    mediaId: track.mediaId || track.title || track.url,
    isPlayable: true,
    title: track.title,
    imageUri: track.artwork,
    sourceUri: track.url,
  };
}

function tracksToMapOfTracks(items: Track[]) {
  return items.reduce<Record<string, Track>>((acc, val) => {
    const item = trackToAndroidMediaItem(val);
    acc[item.mediaId] = val;
    return acc;
  }, {});
}

function mediaIdToChildrenMap(
  items: AndroidMediaItemWithChildren[],
  map: Record<string, AndroidMediaItem[]> = {}
) {
  if (!map['/']) {
    map['/'] = items;
  }

  for (const item of items) {
    map[item.mediaId] = item.children || [];
    if (item.children?.length) {
      const children = item.children;
      delete item.children;
      mediaIdToChildrenMap(children, map);
    }
  }

  return map;
}

let key = 0;
function getRandomPicture() {
  key++;
  return `https://picsum.photos/200?random=${key}`;
}

function mediaIdToSelfMap(
  items: AndroidMediaItemWithChildren[],
  map: Record<string, AndroidMediaItem> = {}
) {
  for (const item of items) {
    map[item.mediaId] = item;
    if (item.children?.length) {
      mediaIdToSelfMap(item.children, map);
    }
  }

  return map;
}

export const TRACKS = playlistData as Track[];
export const TRACKS_MAP = tracksToMapOfTracks(TRACKS);

export const TREE: AndroidMediaItemWithChildren[] = [
  {
    mediaId: 'playlists',
    isPlayable: false,
    title: 'Playlist',
    children: [
      {
        mediaId: 'playlists-1',
        isPlayable: false,
        title: 'Playlist #1',
        imageUri: getRandomPicture(),
        children: TRACKS.slice(0, 4).map((t) => trackToAndroidMediaItem(t)),
      },
      {
        mediaId: 'playlists-2',
        isPlayable: false,
        title: 'Playlist #2',
        imageUri: getRandomPicture(),
        children: TRACKS.slice(1, 4).map((t) => trackToAndroidMediaItem(t)),
      },
      {
        mediaId: 'playlists-3',
        isPlayable: false,
        title: 'Playlist #3',
        imageUri: getRandomPicture(),
        children: TRACKS.slice(3, 6).map((t) => trackToAndroidMediaItem(t)),
      },
      {
        mediaId: 'playlists-4',
        isPlayable: false,
        title: 'Playlist #4',
        imageUri: getRandomPicture(),
      },
      {
        mediaId: 'playlists-5',
        isPlayable: false,
        title: 'Playlist #5',
        imageUri: getRandomPicture(),
      },
    ],
  },
  {
    mediaId: 'albums',
    isPlayable: false,
    title: 'Album',
    children: [
      {
        mediaId: 'albums-1',
        isPlayable: false,
        title: 'Albums #1',
        imageUri: getRandomPicture(),
        children: TRACKS.slice(1, 4).map((t) => trackToAndroidMediaItem(t)),
      },
      {
        mediaId: 'albums-2',
        isPlayable: false,
        title: 'Albums #2',
        imageUri: getRandomPicture(),
        children: TRACKS.slice(0, 4).map((t) => trackToAndroidMediaItem(t)),
      },
      {
        mediaId: 'albums-3',
        isPlayable: false,
        title: 'Albums #3',
        imageUri: getRandomPicture(),
      },
      {
        mediaId: 'albums-4',
        isPlayable: false,
        title: 'Albums #4',
        imageUri: getRandomPicture(),
      },
      {
        mediaId: 'albums-5',
        isPlayable: false,
        title: 'Albums #5',
        imageUri: getRandomPicture(),
      },
    ],
  },
  {
    mediaId: 'artists',
    isPlayable: false,
    title: 'Artist',
    children: [
      {
        mediaId: 'artists-1',
        isPlayable: false,
        title: 'Artists #1',
        imageUri: getRandomPicture(),
        children: TRACKS.slice(0, 3).map((t) => trackToAndroidMediaItem(t)),
      },
      {
        mediaId: 'artists-2',
        isPlayable: false,
        title: 'Artists #2',
        imageUri: getRandomPicture(),
        children: TRACKS.slice(1, 4).map((t) => trackToAndroidMediaItem(t)),
      },
      {
        mediaId: 'artists-3',
        isPlayable: false,
        title: 'Artists #3',
        imageUri: getRandomPicture(),
      },
      {
        mediaId: 'artists-4',
        isPlayable: false,
        title: 'Artists #4',
        imageUri: getRandomPicture(),
      },
      {
        mediaId: 'artists-5',
        isPlayable: false,
        title: 'Artists #5',
        imageUri: getRandomPicture(),
      },
    ],
  },
];

export const MEDIA_ID_TO_SELF_MAP = mediaIdToSelfMap(TREE);
export const MEDIA_ID_TO_CHILDREN = mediaIdToChildrenMap(TREE);
