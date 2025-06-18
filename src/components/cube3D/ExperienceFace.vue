<template>
  <CubeFace faceClass="top">
    <h2>Experience</h2>
    <div class="timeline">
      <div v-for="job in experience" :key="job.id" class="job">
        <h3>{{ job.title }}</h3>
        <p>{{ job.company }} ({{ job.period }})</p>
        <p>{{ job.description }}</p>
      </div>
      <div class="job">
        <h3>Audio Visualization Developer</h3>
        <p>Freelance (2019-Present)</p>
        <p>Specialized in creating real-time audio visualizations using Web Audio API, implementing FFT analysis and creating immersive audio-reactive experiences.</p>
      </div>
    </div>
  </CubeFace>
</template>

<script setup>
import CubeFace from './CubeFace.vue'

defineProps({
  experience: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.timeline {
  text-align: left;
}

.job {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  position: relative;
}

.job:before {
  content: '';
  position: absolute;
  left: -20px;
  top: 50%;
  width: 10px;
  height: 10px;
  background: #ff3e6c;
  border-radius: 50%;
  transform: translateY(-50%);
}
</style>