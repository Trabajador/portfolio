<template>
  <CubeFace faceClass="left">
    <h2>About Me</h2>
    <p>I'm a creative developer passionate about building innovative digital experiences.</p>
    <p>With 5+ years of experience, I specialize in modern web technologies and audio visualization.</p>
    <p>My approach combines technical expertise with creative problem-solving to deliver solutions that not only work flawlessly but also engage and delight users.</p>
    <p>I believe in continuous learning and staying at the forefront of technology trends. My goal is to create digital experiences that are not only functional but also memorable and impactful.</p>
    <p>When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or experimenting with creative coding concepts like this 3D portfolio you're currently viewing.</p>
    <div class="details">
      <div class="detail-item">
        <strong>Location:</strong> New York, NY
      </div>
      <div class="detail-item">
        <strong>Experience:</strong> 5+ Years
      </div>
      <div class="detail-item">
        <strong>Education:</strong> B.S. Computer Science
      </div>
      <div class="detail-item">
        <strong>Specialty:</strong> Audio Visualization
      </div>
    </div>
  </CubeFace>
</template>

<script setup>
import CubeFace from './CubeFace.vue'
</script>

<style scoped>
.details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.detail-item {
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 8px;
}

.detail-item strong {
  color: #ff3e6c;
}
</style> 