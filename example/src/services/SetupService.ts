import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
} from 'react-native-track-player';

export const DefaultRepeatMode = RepeatMode.Queue;
export const DefaultAudioServiceBehaviour =
  AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification;


import {
  MEDIA_ID_TO_SELF_MAP,
  MEDIA_ID_TO_CHILDREN,
  TRACKS_MAP,
} from './DemoAndroidAutoData';

const setupPlayer = async (
  options: Parameters<typeof TrackPlayer.setupPlayer>[0]
) => {
  await TrackPlayer.setupPlayer(options);
};

export const SetupService = async () => {
  try {
    await setupPlayer({
      autoHandleInterruptions: true,
    });
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior: DefaultAudioServiceBehaviour,
        auto: {
          getChildren: async (parentId: string) => {
            // here you can return something from your backend
            return MEDIA_ID_TO_CHILDREN[parentId] || [];
          },
          getItem: async (mediaId: string) => {
            // here you can return something from your backend
            return MEDIA_ID_TO_SELF_MAP[mediaId] || null;
          },
          getTrack: async (mediaId: string) => {
            // here you can return something from your backend
            return TRACKS_MAP[mediaId] || null;
          },
        },
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
        Capability.JumpBackward,
        Capability.JumpForward,
      ],
      notificationCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SeekTo,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ],
      progressUpdateEventInterval: 2,
    });
    await TrackPlayer.setRepeatMode(DefaultRepeatMode);
  } catch (error) {
    console.error('Error setting up player:', error);
    throw error;
  }
};
