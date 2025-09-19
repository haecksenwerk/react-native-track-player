import type { AndroidMediaItem } from './AndroidMediaItem';
import type { Track } from './Track';

export interface AndroidAutoCallbacks {
  getChildren: (parentId: string) => Promise<AndroidMediaItem[]>;
  getItem: (mediaId: string) => Promise<AndroidMediaItem | null>;
  getTrack: (mediaId: string) => Promise<Track | null>;
}
