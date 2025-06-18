<template>
  <CubeFace faceClass="back">
    <h2>Skills</h2>
    <div class="skills">
      <div v-for="skill in skills" :key="skill.name" class="skill">
        <span>{{ skill.name }}</span>
        <div class="skill-bar">
          <div class="skill-fill" :style="{ width: skill.level + '%' }"></div>
        </div>
      </div>
      <div v-for="skill in extraSkills" :key="skill.name" class="skill">
        <span>{{ skill.name }}</span>
        <div class="skill-bar">
          <div class="skill-fill" :style="{ width: skill.level + '%' }"></div>
        </div>
      </div>
    </div>
  </CubeFace>
</template>

<script setup>
import CubeFace from './CubeFace.vue'

defineProps({
  skills: {
    type: Array,
    required: true
  },
  extraSkills: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.skills {
  text-align: left;
}

.skill {
  margin-bottom: 1rem;
}

.skill-bar {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-top: 0.5rem;
}

.skill-fill {
  height: 100%;
  background: linear-gradient(90deg, #ff3e6c, #4a00e0);
  border-radius: 4px;
  transition: width 0.5s ease;
}
</style>