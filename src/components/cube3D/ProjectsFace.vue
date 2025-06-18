<template>
  <CubeFace faceClass="right">
    <h2>Projects</h2>
    <div class="project-list">
      <div v-for="project in projects" :key="project.id" class="project">
        <h3>{{ project.title }}</h3>
        <p>{{ project.description }}</p>
      </div>
      <div v-for="i in 3" :key="`extra-${i}`" class="project">
        <h3>Audio Project {{ i }}</h3>
        <p>Interactive audio visualization project using Web Audio API and real-time frequency analysis for immersive experiences.</p>
      </div>
    </div>
  </CubeFace>
</template>

<script setup>
import CubeFace from './CubeFace.vue'

defineProps({
  projects: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.project-list {
  text-align: left;
}

.project {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.project:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.08);
}
</style>