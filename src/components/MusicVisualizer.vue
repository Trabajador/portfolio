<template>
  <div class="music-visualizer">
    <div
      v-for="i in 64"
      :key="i"
      class="bar"
      :style="{
        left: `${(i - 1) * (100/64)}%`,
        width: `${(100/64) - 0.1}%`,
        height: `${getBarHeight(i-1)}px`,
        animationDelay: `${(i-1) * 0.01}s`,
        '--hue': `${(i-1) * (360/64)}`,
        '--glow-intensity': `${getGlowIntensity(i-1)}`
      }"
    ></div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  frequencyData: {
    type: Array,
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

// Debug logging
watch(() => props.frequencyData, (newData) => {
  // if (props.isPlaying && props.hasAudioData) {
  //   console.log('Frequency data received:', newData.slice(0, 5))
  // }
}, { deep: true })

const getBarHeight = (index) => {
  if (!props.isPlaying || !props.hasAudioData) return 3
  const value = props.frequencyData[index] || 0
  const normalizedValue = value / 255
  const maxHeight = window.innerHeight * 0.25 // 25% of screen height
  return Math.max(Math.pow(normalizedValue, 0.7) * maxHeight, 3) // Minimum height of 3px
}

const getGlowIntensity = (index) => {
  if (!props.isPlaying || !props.hasAudioData) return 0.3
  const value = props.frequencyData[index] || 0
  return Math.min((value / 255) * 10, 8)
}
</script>

<style scoped>
.music-visualizer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0;
  gap: 0.1%;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.95));
  margin: 0;
  transform: translateY(0);
}

.bar {
  position: relative;
  background: linear-gradient(to bottom, #4a00e0, #ff3e6c);
  border-radius: 1px;
  transition: height 0.03s ease-out, filter 0.03s ease-out;
  box-shadow: 0 0 8px rgba(255, 62, 108, 0.4);
  transform-origin: top;
}

.bar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: inherit;
  border-radius: inherit;
  filter: blur(4px);
  opacity: 0.5;
  animation: glow 1s ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    opacity: 0.3;
    filter: blur(4px) brightness(1);
  }
  to {
    opacity: 0.5;
    filter: blur(6px) brightness(1.2);
  }
}
</style>
