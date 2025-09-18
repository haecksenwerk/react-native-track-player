package com.doublesymmetry.trackplayer.utils

import android.content.Context
import android.net.Uri
import android.os.Bundle
import androidx.media3.common.MediaItem
import androidx.media3.common.MediaMetadata
import com.doublesymmetry.trackplayer.model.Track
import com.doublesymmetry.trackplayer.utils.BundleUtils
import com.google.common.collect.ImmutableList
import timber.log.Timber

fun buildMediaItem(
    title: String? = null,
    subtitle: String? = null,
    mediaId: String,
    isPlayable: Boolean,
    subtitleConfigurations: List<MediaItem.SubtitleConfiguration> = listOf<MediaItem.SubtitleConfiguration>(),
    album: String? = null,
    artist: String? = null,
    genre: String? = null,
    sourceUri: Uri? = null,
    imageUri: Uri? = null,
    extras: Bundle? = null
): MediaItem {
    val metadata =
        MediaMetadata.Builder()
            .setAlbumTitle(album)
            .setTitle(title)
            .setSubtitle(subtitle)
            .setArtist(artist)
            .setGenre(genre)
            .setIsBrowsable(!isPlayable)
            .setIsPlayable(isPlayable)
            .setArtworkUri(imageUri)
            .setMediaType(if (isPlayable) MediaMetadata.MEDIA_TYPE_MUSIC else MediaMetadata.MEDIA_TYPE_FOLDER_MIXED)
            .setExtras(extras)
            .build()

    return MediaItem.Builder()
        .setMediaId(mediaId)
        .setSubtitleConfigurations(subtitleConfigurations)
        .setMediaMetadata(metadata)
        .setUri(sourceUri)
        .build()
}

fun buildMediaItemFromAnyHashMap(item: Any?): MediaItem? {
  if (item !is java.util.HashMap<*, *>) {
      return null
  }

  // guard against invalid mediaIds
  if (
      item["mediaId"] !is String ||
      item["mediaId"] == null ||
      item["mediaId"] == ""
  ) {
      return null
  }

  return buildMediaItem(
      item["title"] as? String ?: null,
      item["subtitle"] as? String ?: null,
      item["mediaId"] as String,
      item["isPlayable"] as? Boolean ?: false,
      emptyList<MediaItem.SubtitleConfiguration>(),
      item["album"] as? String ?: null,
      item["artist"] as? String ?: null,
      item["genre"] as? String ?: null,
      uriOrNull(item["sourceUri"]),
      uriOrNull(item["imageUri"]),
  )
}


fun buildMediaItemListFromAny(value: Any?): ImmutableList<MediaItem> {
    if (value !is ArrayList<*>) {
        return ImmutableList.copyOf(listOf<MediaItem>())
    }

    val items = mutableListOf<MediaItem>()
    for (item in value) {
        val mediaItem = buildMediaItemFromAnyHashMap(item);
        if (mediaItem !is MediaItem) {
            continue
        }

        items.add(mediaItem)
    }

    return ImmutableList.copyOf(items)
}

fun uriOrNull(value: Any?): Uri? {
    if (value !is String) {
      return null
    }

    if (value == "") {
      return null
    }

    return Uri.parse(value)
}


fun buildTrackFromAny(
  context: Context,
  ratingType: Int,
  value: Any?,
): Track? {
  val bundle = BundleUtils.getBundleFromAnyHashMap(value)
  if (bundle == null) {
      return null
  }

  return Track(context, bundle, ratingType)
}
