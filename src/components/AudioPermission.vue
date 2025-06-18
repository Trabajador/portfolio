<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['permission-granted'])
const showPermission = ref(false)
const hasInteracted = ref(false)

const checkFirstVisit = () => {
  const hasVisited = localStorage.getItem('hasVisited')
  if (!hasVisited) {
    showPermission.value = true
  }
}

const grantPermission = () => {
  localStorage.setItem('hasVisited', 'true')
  showPermission.value = false
  hasInteracted.value = true
  emit('permission-granted')
}

const denyPermission = () => {
  localStorage.setItem('hasVisited', 'true')
  localStorage.setItem('audioDisabled', 'true')
  showPermission.value = false
  hasInteracted.value = true
}

onMounted(() => {
  checkFirstVisit()
})
</script>

<template>
  <div v-if="showPermission" class="audio-permission">
    <div class="permission-content">
      <h3>Welcome to My Portfolio!</h3>
      <p>Would you like to enable background music for a better experience?</p>
      <div class="permission-buttons">
        <button @click="grantPermission" class="btn-grant">
          Yes, Enable Music
        </button>
        <button @click="denyPermission" class="btn-deny">
          No, Thanks
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.audio-permission {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(10px);
}

.permission-content {
  background: rgba(20, 20, 40, 0.95);
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  max-width: 400px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

.permission-content h3 {
  color: #ff3e6c;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.permission-content p {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1.5rem;
}

.permission-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn-grant, .btn-deny {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn-grant {
  background: linear-gradient(45deg, #ff3e6c, #4a00e0);
  color: white;
}

.btn-deny {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.btn-grant:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(255, 62, 108, 0.3);
}

.btn-deny:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
}
</style>