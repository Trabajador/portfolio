<template>
  <div class="app">
    <!-- Audio Permission -->
    <AudioPermission @permission-granted="handleAudioPermission" />

    <!-- Audio Player -->
    <AudioPlayer
      v-if="!isAudioDisabled"
      :tracks="tracks"
      @audio-ready="onAudioReady"
      @audio-data="onAudioData"
      @audio-state="updateAudioState"
    />

    <!-- Music Visualizers -->
    <WaveformVisualizer
      v-if="currentVisualizer === 'waveform'"
      :frequency-data="frequencyData"
      :is-playing="isPlaying"
      :has-audio-data="hasAudioData"
    />
    <BarVisualizer
      v-else-if="currentVisualizer === 'bars'"
      :frequency-data="frequencyData"
      :is-playing="isPlaying"
      :has-audio-data="hasAudioData"
    />
    <CircleWaveVisualizer
      v-else-if="currentVisualizer === 'circle'"
      :frequency-data="frequencyData"
      :is-playing="isPlaying"
      :has-audio-data="hasAudioData"
    />
    <MusicVisualizer
      v-else
      :frequency-data="frequencyData"
      :is-playing="isPlaying"
      :has-audio-data="hasAudioData"
    />

    <div class="visualizer-toggle">
      <button @click="toggleVisualizer" class="toggle-btn">
        {{ getVisualizerButtonText() }}
      </button>
    </div>

    <!-- Main Content -->
    <div class="container">
      <!-- 3D Cube -->
      <Cube3D :current-section="currentPage">
        <template #front>
          <HomeFace
            :current-track="currentTrack"
            :is-playing="isPlaying"
            :has-audio-data="hasAudioData"
          />
        </template>
        <template #right>
          <ProjectsFace :projects="projects" />
        </template>
        <template #back>
          <SkillsFace :skills="skills" :extra-skills="extraSkills" />
        </template>
        <template #left>
          <AboutFace />
        </template>
        <template #top>
          <ExperienceFace :experience="experience" />
        </template>
        <template #bottom>
          <ContactFace />
        </template>
      </Cube3D>

      <!-- Navigation -->
      <CubeNavigation
        :current-section="currentPage"
        :sections="pages"
        @navigate="handleNavigation"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import AudioPlayer from './components/AudioPlayer.vue'
import AudioPermission from './components/AudioPermission.vue'
import WaveformVisualizer from './components/WaveformVisualizer.vue'
import BarVisualizer from './components/BarVisualizer.vue'
import MusicVisualizer from './components/MusicVisualizer.vue'
import CubeNavigation from './components/cube3D/CubeNavigation.vue'
import Cube3D from './components/cube3D/Cube3D.vue'
import HomeFace from './components/cube3D/HomeFace.vue'
import ProjectsFace from './components/cube3D/ProjectsFace.vue'
import SkillsFace from './components/cube3D/SkillsFace.vue'
import AboutFace from './components/cube3D/AboutFace.vue'
import ExperienceFace from './components/cube3D/ExperienceFace.vue'
import ContactFace from './components/cube3D/ContactFace.vue'
import CircleWaveVisualizer from './components/cube3D/CircleWaveVisualizer.vue'
import corporateMusic from './assets/audio/corporate-background-music-338201.mp3'
import baseMusic from './assets/audio/nightfall-future-bass-music-228100.mp3'

// Audio tracks playlist
const tracks = [
  {
    name: "Ambient Flow",
    sources: [
      { src: corporateMusic, type: "audio/mp3" }
    ]
  },
  {
    name: "Nightfall / Future Bass Music",
    sources: [
      { src: baseMusic, type: "audio/mp3" }
    ]
  }
]

// Audio state
const isPlaying = ref(false)
const hasAudioData = ref(false)
const frequencyData = ref(new Array(64).fill(0))
const currentTrack = ref(tracks[0])
const isAudioDisabled = ref(localStorage.getItem('audioDisabled') === 'true')
const currentVisualizer = ref('waveform')

// Cube navigation
const currentPage = ref(0)
const pages = ['Home', 'About', 'Projects', 'Contact', 'Skills', 'Experience']

const handleNavigation = (newPage) => {
  currentPage.value = newPage
}

// Audio event handlers
const onAudioReady = (ready) => {
  console.log('Audio ready:', ready)
}

const onAudioData = (data) => {
  frequencyData.value = data
  hasAudioData.value = true
  console.log('Audio data received:', data.slice(0, 5))
}

// Portfolio data
const projects = [
  { id: 1, title: 'Real-time Audio Visualizer', description: 'Interactive audio visualization using Web Audio API with real-time frequency analysis and dynamic visual effects.' },
  { id: 2, title: '3D Portfolio Cube', description: 'An interactive 3D portfolio website using CSS transforms and Vue.js with integrated audio visualization.' },
  { id: 3, title: 'Music Reactive Dashboard', description: 'Analytics dashboard with real-time audio visualization, frequency analysis, and interactive music controls.' }
]

const skills = [
  { name: 'Web Audio API', level: 95 }, { name: 'Vue.js', level: 95 }, { name: 'JavaScript', level: 95 },
  { name: 'Audio Visualization', level: 90 }, { name: 'CSS3 Transforms', level: 90 }
]

const extraSkills = [
  { name: 'FFT Analysis', level: 85 }, { name: 'Canvas API', level: 80 }, { name: 'TypeScript', level: 85 },
  { name: 'Three.js', level: 75 }, { name: 'WebGL', level: 70 }, { name: 'Real-time Processing', level: 88 }
]

const experience = [
  { id: 1, title: 'Senior Developer', company: 'Tech Co', period: '2020-Present', description: 'Leading frontend development with focus on interactive media and audio visualization using modern web technologies.' },
  { id: 2, title: 'Frontend Developer', company: 'Digital Agency', period: '2018-2020', description: 'Developed responsive web applications with integrated audio features and real-time data visualization components.' },
  { id: 3, title: 'Web Developer', company: 'Creative Studio', period: '2016-2018', description: 'Created interactive experiences and audio-visual installations using HTML5, CSS3, and JavaScript audio APIs.' }
]

// Handle audio permission
const handleAudioPermission = () => {
  isAudioDisabled.value = false
  localStorage.removeItem('audioDisabled')
}

// Update audio state
const updateAudioState = (state) => {
  isPlaying.value = state.isPlaying
  hasAudioData.value = state.hasAudioData
  if (state.frequencyData) {
    frequencyData.value = state.frequencyData
  }
}

// Keyboard navigation
const handleKeyDown = (e) => {
  switch (e.key) {
    case 'ArrowLeft': handleNavigation(3); break
    case 'ArrowRight': handleNavigation(1); break
    case 'ArrowUp': handleNavigation(4); break
    case 'ArrowDown': handleNavigation(5); break
  }
}

const getVisualizerButtonText = () => {
  switch (currentVisualizer.value) {
    case 'waveform':
      return 'Switch to Bars'
    case 'bars':
      return 'Switch to Circle'
    case 'circle':
      return 'Switch to Music'
    default:
      return 'Switch to Wave'
  }
}

const toggleVisualizer = () => {
  switch (currentVisualizer.value) {
    case 'waveform':
      currentVisualizer.value = 'bars'
      break
    case 'bars':
      currentVisualizer.value = 'circle'
      break
    case 'circle':
      currentVisualizer.value = 'music'
      break
    default:
      currentVisualizer.value = 'waveform'
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  width: 100vw;
  height: 100vh;
  background: #0a0a0a;
  color: white;
  font-family: Arial, sans-serif;
  overflow: hidden;
  position: relative;
}

.container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.visualizer-toggle {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 100;
}

.toggle-btn {
  background: rgba(0, 0, 0, 0.85);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  backdrop-filter: blur(15px);
  transition: all 0.3s ease;
}

.toggle-btn:hover {
  background: rgba(0, 0, 0, 0.95);
  transform: scale(1.05);
}

.page-content {
  width: 100%;
  height: 100%;
  padding: 2rem;
  box-sizing: border-box;
  color: white;
}
</style>