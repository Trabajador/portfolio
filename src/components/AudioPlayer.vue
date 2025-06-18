<template>
  <div class="audio-controls">
    <button class="toggle-btn" @click="toggleAudio" :disabled="!audioReady">
      <span v-if="!isPlaying">▶</span>
      <span v-else>❚❚</span>
    </button>
    <div class="volume-control">
      <button class="mute-btn" @click="toggleMute" :disabled="!audioReady">
        <span v-if="isMuted">🔇</span>
        <span v-else>🔊</span>
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        v-model="volume"
        @input="updateVolume"
        class="volume-slider"
        :disabled="!audioReady"
      />
    </div>
    <div class="audio-info">
      <div class="track-name">{{ currentTrack.name }}</div>
      <div class="audio-status">{{ audioStatus }}</div>
    </div>
    <button class="next-btn" @click="nextTrack" :disabled="!audioReady">⏭</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  tracks: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['audio-ready', 'audio-data', 'audio-state'])

// Audio state
const audioElement = ref(new Audio())
const isPlaying = ref(false)
const volume = ref(0.4)
const isMuted = ref(false)
const previousVolume = ref(0.4)
const audioContext = ref(null)
const analyser = ref(null)
const audioReady = ref(false)
const audioStatus = ref('Loading...')
const frequencyData = ref(new Array(64).fill(0))
const currentTrackIndex = ref(0)
const hasAudioData = ref(false)

// Current track
const currentTrack = computed(() => props.tracks[currentTrackIndex.value])

// Load current track
const loadTrack = () => {
  if (!audioElement.value) return

  audioReady.value = false
  audioStatus.value = 'Loading...'
  hasAudioData.value = false

  // Reset audio context if it exists
  if (audioContext.value) {
    audioContext.value.close()
    audioContext.value = null
    analyser.value = null
  }

  // Set audio source
  audioElement.value.src = currentTrack.value.sources[0].src
  audioElement.value.load()
}

// Next track
const nextTrack = async () => {
  try {
    // Stop current audio
    if (audioElement.value) {
      audioElement.value.pause()
      audioElement.value.currentTime = 0
    }

    // Clean up current audio context
    if (audioContext.value) {
      await audioContext.value.close()
      audioContext.value = null
    }
    if (analyser.value) {
      analyser.value.disconnect()
      analyser.value = null
    }

    // Reset state
    isPlaying.value = false
    hasAudioData.value = false
    currentTrackIndex.value = (currentTrackIndex.value + 1) % props.tracks.length
    currentTrack.value = props.tracks[currentTrackIndex.value]

    // Initialize new audio
    await initAudio()
    
    // Start playing if it was playing before
    if (isPlaying.value) {
      await audioElement.value.play()
    }
  } catch (error) {
    console.error('Error switching tracks:', error)
  }
}

// Audio event handlers
const onAudioLoaded = () => {
  console.log('Audio data loaded')
}

const onAudioReady = () => {
  audioReady.value = true
  audioStatus.value = 'Ready'
  emit('audio-ready', true)
  console.log('Audio ready to play')
}

const onAudioError = (e) => {
  console.error('Audio loading error:', e)
  audioStatus.value = 'Error'
  audioReady.value = false
  hasAudioData.value = false
  emit('audio-ready', false)
}

// Toggle mute
const toggleMute = () => {
  if (isMuted.value) {
    volume.value = previousVolume.value
    isMuted.value = false
  } else {
    previousVolume.value = volume.value
    volume.value = 0
    isMuted.value = true
  }
  updateVolume()
}

// Fade in volume
const fadeIn = () => {
  const targetVolume = volume.value
  volume.value = 0
  updateVolume()

  const fadeInterval = setInterval(() => {
    if (volume.value < targetVolume) {
      volume.value = Math.min(volume.value + 0.01, targetVolume)
      updateVolume()
    } else {
      clearInterval(fadeInterval)
    }
  }, 20)
}

// Emit audio state
const emitAudioState = () => {
  emit('audio-state', {
    isPlaying: isPlaying.value,
    hasAudioData: hasAudioData.value,
    frequencyData: frequencyData.value
  })
}

// Toggle audio playback
const toggleAudio = async () => {
  try {
    if (!audioElement.value) return

    if (!audioContext.value) {
      await initAudio()
    }

    if (audioContext.value.state === 'suspended') {
      await audioContext.value.resume()
    }

    if (isPlaying.value) {
      audioElement.value.pause()
    } else {
      await audioElement.value.play()
    }
    isPlaying.value = !isPlaying.value
    emitAudioState()
  } catch (error) {
    console.error('Error toggling audio:', error)
  }
}

// Update volume
const updateVolume = () => {
  if (audioElement.value) {
    audioElement.value.volume = volume.value
  }
}

// Real-time audio analysis
const startAudioAnalysis = () => {
  if (!analyser.value) return

  const bufferLength = analyser.value.frequencyBinCount
  const dataArray = new Uint8Array(bufferLength)
  let lastUpdate = 0
  const updateInterval = 1000 / 60 // 60fps for Monstercat-style visualization

  const analyze = () => {
    if (!analyser.value) {
      hasAudioData.value = false
      emitAudioState()
      return
    }

    const now = performance.now()
    if (now - lastUpdate < updateInterval) {
      requestAnimationFrame(analyze)
      return
    }
    lastUpdate = now

    try {
      analyser.value.getByteFrequencyData(dataArray)
      hasAudioData.value = true

      // Process frequency data for Monstercat-style visualization
      const normalizedData = new Array(64).fill(0)
      
      // Process each of the 64 bars
      for (let i = 0; i < 64; i++) {
        const startIndex = Math.floor((i / 64) * bufferLength)
        const endIndex = Math.floor(((i + 1) / 64) * bufferLength)
        
        let maxValue = 0
        for (let j = startIndex; j < endIndex && j < bufferLength; j++) {
          // Enhanced frequency boosts for Monstercat style
          let boost = 1
          if (j < bufferLength / 32) { // Bass frequencies
            boost = 2.8
          } else if (j < bufferLength / 16) { // Low-mid frequencies
            boost = 2.4
          } else if (j < bufferLength / 8) { // Mid frequencies
            boost = 2.0
          } else if (j < bufferLength / 4) { // High-mid frequencies
            boost = 1.8
          } else { // High frequencies
            boost = 1.6
          }

          const value = Math.max(dataArray[j] - 1, 0) * boost
          maxValue = Math.max(maxValue, value)
        }

        // Ensure minimum movement for visual feedback
        const minThreshold = 15 // Lower threshold for more active bars
        maxValue = Math.max(maxValue, minThreshold)

        // Apply power function for smoother response
        normalizedData[i] = Math.min(Math.pow(maxValue / 255, 0.6) * 255, 255)
      }

      frequencyData.value = normalizedData
      emit('audio-data', normalizedData)
      emitAudioState()
    } catch (error) {
      console.error('Analysis error:', error)
      hasAudioData.value = false
      emitAudioState()
    }

    requestAnimationFrame(analyze)
  }

  analyze()
}

// Initialize audio context
const initAudio = async () => {
  try {
    // Create new audio context
    audioContext.value = new (window.AudioContext || window.webkitAudioContext)()
    analyser.value = audioContext.value.createAnalyser()
    analyser.value.fftSize = 2048 // Optimized for Monstercat-style visualization
    analyser.value.smoothingTimeConstant = 0.8 // Smoother transitions
    analyser.value.minDecibels = -90 // More sensitive to quiet sounds
    analyser.value.maxDecibels = -10 // Better range for loud sounds

    // Create new audio element
    audioElement.value = new Audio()
    audioElement.value.src = currentTrack.value.sources[0].src
    audioElement.value.volume = volume.value

    // Connect audio to analyser
    const source = audioContext.value.createMediaElementSource(audioElement.value)
    source.connect(analyser.value)
    analyser.value.connect(audioContext.value.destination)

    // Start analysis immediately
    startAudioAnalysis()
    
    // Set up audio event listeners
    audioElement.value.addEventListener('loadeddata', onAudioLoaded)
    audioElement.value.addEventListener('canplaythrough', onAudioReady)
    audioElement.value.addEventListener('error', onAudioError)
  } catch (error) {
    console.error('Error initializing audio:', error)
  }
}

onMounted(() => {
  // Set up audio event listeners
  audioElement.value.addEventListener('loadeddata', onAudioLoaded)
  audioElement.value.addEventListener('canplaythrough', onAudioReady)
  audioElement.value.addEventListener('error', onAudioError)

  loadTrack()
})

onUnmounted(() => {
  // Clean up audio event listeners
  audioElement.value.removeEventListener('loadeddata', onAudioLoaded)
  audioElement.value.removeEventListener('canplaythrough', onAudioReady)
  audioElement.value.removeEventListener('error', onAudioError)

  if (audioContext.value) audioContext.value.close()
})
</script>

<style scoped>
.audio-controls {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  z-index: 100;
  background: rgba(0, 0, 0, 0.85);
  padding: 15px 20px;
  border-radius: 25px;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  min-width: 350px;
}

.toggle-btn, .next-btn {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(45deg, #ff3e6c, #4a00e0);
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(255, 62, 108, 0.3);
}

.toggle-btn:hover:not(:disabled), .next-btn:hover:not(:disabled) {
  transform: scale(1.1);
  box-shadow: 0 8px 25px rgba(255, 62, 108, 0.5);
}

.toggle-btn:disabled, .next-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}

.volume-icon {
  font-size: 16px;
}

.volume-slider {
  flex: 1;
  height: 6px;
  -webkit-appearance: none;
  appearance: none;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  outline: none;
  transition: background 0.3s;
}

.volume-slider:hover {
  background: rgba(255, 255, 255, 0.3);
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(45deg, #ff3e6c, #4a00e0);
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 10px rgba(255, 62, 108, 0.3);
}

.volume-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 4px 15px rgba(255, 62, 108, 0.5);
}

.audio-info {
  text-align: right;
  min-width: 100px;
}

.track-name {
  font-size: 12px;
  font-weight: bold;
  color: #ff3e6c;
  margin-bottom: 2px;
}

.audio-status {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.7);
}

.mute-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.mute-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.mute-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .audio-controls {
    top: 10px;
    right: 10px;
    padding: 10px;
    min-width: 280px;
    flex-wrap: wrap;
  }

  .audio-info {
    order: 3;
    width: 100%;
    text-align: center;
    margin-top: 5px;
  }
}
</style>