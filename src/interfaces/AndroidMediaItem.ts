import type { ResourceObject } from './ResourceObject';

export interface AndroidMediaItem {
  mediaId: string;
  title?: string;
  subtitle?: string;
  imageUri?: string | ResourceObject;
  sourceUri?: string | ResourceObject;
  isPlayable: boolean;
  groupTitle?: string;
  contentStyle?: string;
  childrenPlayableContentStyle?: string;
  childrenBrowsableContentStyle?: string;
  /** playbackProgress should contain a string representation of a number between 0 and 1 if present */
  playbackProgress?: string;
}
