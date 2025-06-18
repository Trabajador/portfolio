<template>
  <CubeFace faceClass="front">
    <h1>John Doe</h1>
    <h2>Creative Developer</h2>
    <p>Welcome to my 3D portfolio</p>
    <div class="audio-hint">
      <p>🎵 Click the play button to start music</p>
      <p>🎧 Real-time audio visualization</p>
      <p>Currently: <strong>{{ currentTrack.name }}</strong></p>
      <div class="visualizer-status">
        <span :class="{ active: isPlaying && hasAudioData }">
          {{ isPlaying && hasAudioData ? '🎶 Visualizing Audio' : '🎵 Ready to Visualize' }}
        </span>
      </div>
    </div>
  </CubeFace>
</template>

<script setup>
import CubeFace from './CubeFace.vue'

defineProps({
  currentTrack: {
    type: Object,
    required: true
  },
  isPlaying: {
    type: Boolean,
    default: false
  },
  hasAudioData: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.audio-hint {
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(255, 62, 108, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(255, 62, 108, 0.3);
}

.audio-hint p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.visualizer-status {
  margin-top: 1rem;
  padding: 0.8rem;
  background: rgba(74, 0, 224, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(74, 0, 224, 0.3);
}

.visualizer-status span {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.visualizer-status span.active {
  color: #4a00e0;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(74, 0, 224, 0.5);
}
</style>