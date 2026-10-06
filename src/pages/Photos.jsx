import React from 'react';
import PhotoGallery from '../components/PhotoGallery';

export default function Photos({ onPlayMovie, isPlayingMusic, onToggleMusic }) {
  return (
    <PhotoGallery
      onPlayMovie={onPlayMovie}
      isPlayingMusic={isPlayingMusic}
      onToggleMusic={onToggleMusic}
    />
  );
}
