package com.doublesymmetry.kotlinaudio.models

import androidx.media3.common.MediaItem

data class AudioItemTransition(
    val mediaItem: MediaItem?,
    val reason: AudioItemTransitionReason?
)
