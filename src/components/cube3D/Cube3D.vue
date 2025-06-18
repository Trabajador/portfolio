<template>
  <div class="cube-container">
    <div class="cube" :style="cubeStyle">
      <div v-for="face in faces" 
           :key="face.id" 
           class="cube-face"
           :class="`cube-face--${face.position}`"
           :style="getFaceStyle(face)">
        <slot :name="face.position"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  currentSection: {
    type: Number,
    required: true
  }
});

const cubeSize = 400;
const perspective = 1500;

const faces = [
  { id: 1, position: 'front', rotation: { x: 0, y: 0, z: 0 } },
  { id: 2, position: 'back', rotation: { x: 0, y: 180, z: 0 } },
  { id: 3, position: 'right', rotation: { x: 0, y: 90, z: 0 } },
  { id: 4, position: 'left', rotation: { x: 0, y: -90, z: 0 } },
  { id: 5, position: 'top', rotation: { x: 90, y: 0, z: 0 } },
  { id: 6, position: 'bottom', rotation: { x: -90, y: 0, z: 0 } }
];

const rotations = [
  { x: -15, y: -15, z: 0 },      // Front
  { x: -15, y: -105, z: 0 },     // Right
  { x: -15, y: -195, z: 0 },     // Back
  { x: -15, y: -285, z: 0 },     // Left
  { x: -105, y: -15, z: 0 },     // Top
  { x: 75, y: -15, z: 0 }        // Bottom
];

const cubeStyle = computed(() => {
  const rotation = rotations[props.currentSection];
  return {
    '--cube-rotation-x': `${rotation.x}deg`,
    '--cube-rotation-y': `${rotation.y}deg`,
    '--cube-rotation-z': `${rotation.z}deg`,
    '--cube-scale': '1',
    '--cube-transition-duration': '0.8s',
    '--cube-transition-timing': 'cubic-bezier(0.4, 0, 0.2, 1)'
  };
});

const getFaceStyle = (face) => ({
  '--face-rotation-x': `${face.rotation.x}deg`,
  '--face-rotation-y': `${face.rotation.y}deg`,
  '--face-rotation-z': `${face.rotation.z}deg`,
  '--face-translate-z': `${cubeSize / 2}px`,
  '--face-opacity': '1',
  '--face-transition': 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
});
</script>

<style scoped>
.cube-container {
  perspective: var(--perspective, 1500px);
  width: 400px;
  height: 400px;
  margin: 0;
  transform-style: preserve-3d;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cube {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transform:
    rotateX(var(--cube-rotation-x, -15deg))
    rotateY(var(--cube-rotation-y, -15deg))
    rotateZ(var(--cube-rotation-z, 0deg))
    scale(var(--cube-scale, 1));
  transition: 
    transform var(--cube-transition-duration, 0.8s) var(--cube-transition-timing, cubic-bezier(0.4, 0, 0.2, 1));
}

.cube-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: visible;
  transform:
    rotateX(var(--face-rotation-x, 0deg))
    rotateY(var(--face-rotation-y, 0deg))
    rotateZ(var(--face-rotation-z, 0deg))
    translateZ(var(--face-translate-z, 200px));
  background: linear-gradient(135deg, rgba(20, 20, 40, 0.95), rgba(30, 30, 50, 0.95));
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow-y: auto;
  overflow-x: hidden;
  opacity: var(--face-opacity, 1);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 20px;
  clip-path: polygon(
    0% 10%, 10% 0%, 90% 0%, 100% 10%,
    100% 90%, 90% 100%, 10% 100%, 0% 90%
  );
  padding: 2rem;
  box-sizing: border-box;
  transform-origin: center center;
}

/* Face-specific styles with transitions */
.cube-face--front { 
  transform: translateZ(var(--face-translate-z, 200px));
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 30px rgba(255, 62, 108, 0.1);
}
.cube-face--back { 
  transform: rotateY(180deg) translateZ(var(--face-translate-z, 200px));
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 30px rgba(74, 0, 224, 0.1);
}
.cube-face--right { 
  transform: rotateY(90deg) translateZ(var(--face-translate-z, 200px));
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 30px rgba(255, 62, 108, 0.1);
}
.cube-face--left { 
  transform: rotateY(-90deg) translateZ(var(--face-translate-z, 200px));
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 30px rgba(74, 0, 224, 0.1);
}
.cube-face--top { 
  transform: rotateX(90deg) translateZ(var(--face-translate-z, 200px));
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 30px rgba(255, 62, 108, 0.1);
}
.cube-face--bottom { 
  transform: rotateX(-90deg) translateZ(var(--face-translate-z, 200px));
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 30px rgba(74, 0, 224, 0.1);
}
</style>