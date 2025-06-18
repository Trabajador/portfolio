<template>
  <div class="nav">
    <div class="current">{{ sections[currentSection] }}</div>
    <div class="controls">
      <button @click="navigate('left')" data-key="←">←</button>
      <button @click="navigate('up')" data-key="↑">↑</button>
      <button @click="navigate('down')" data-key="↓">↓</button>
      <button @click="navigate('right')" data-key="→">→</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  currentSection: {
    type: Number,
    required: true
  },
  sections: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['navigate'])

const navigation = {
  0: { left: 3, right: 1, up: 4, down: 5 },
  1: { left: 0, right: 2, up: 4, down: 5 },
  2: { left: 1, right: 3, up: 4, down: 5 },
  3: { left: 2, right: 0, up: 4, down: 5 },
  4: { left: 3, right: 1, up: 2, down: 0 },
  5: { left: 3, right: 1, up: 0, down: 2 }
}

const navigate = (direction) => {
  setTimeout(() => {
    emit('navigate', navigation[props.currentSection][direction])
  }, 50)
}
</script>

<style scoped>
.nav {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  padding: 1rem 2rem;
  border-radius: 2rem;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.nav:hover {
  transform: translateX(-50%) translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 62, 108, 0.3);
}

.current {
  color: #ff3e6c;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(255, 62, 108, 0.3);
  transition: all 0.3s ease;
}

.controls {
  display: flex;
  gap: 0.5rem;
}

.controls button {
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.controls button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #ff3e6c, #4a00e0);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.controls button:hover {
  transform: translateY(-3px) scale(1.1);
  box-shadow: 0 5px 15px rgba(255, 62, 108, 0.3);
}

.controls button:hover::before {
  opacity: 0.2;
}

.controls button:active {
  transform: translateY(-1px) scale(0.95);
}

/* Add keyboard navigation hints */
.controls button::after {
  content: attr(data-key);
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.controls button:hover::after {
  opacity: 1;
}
</style> 