<template>
  <canvas ref="canvas" class="bar-canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

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

const canvas = ref(null)
const ctx = ref(null)
const animationFrame = ref(null)

// Initialize canvas
const initCanvas = () => {
  if (!canvas.value) return
  
  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight
  ctx.value = canvas.value.getContext('2d')
}

// Draw bars
const drawBars = () => {
  if (!canvas.value || !ctx.value) return

  const width = canvas.value.width
  const height = canvas.value.height
  const barWidth = (width / props.frequencyData.length) - 1 // Full width with 1px spacing
  const barSpacing = 1 // Reduced spacing for full width

  // Clear canvas with fade effect
  ctx.value.fillStyle = 'rgba(0, 0, 0, 0.1)'
  ctx.value.fillRect(0, 0, width, height)

  // Draw bars
  props.frequencyData.forEach((value, index) => {
    const x = index * (barWidth + barSpacing)
    
    // More dynamic height calculation with top-down movement
    const normalizedValue = value / 255
    const dynamicHeight = Math.pow(normalizedValue, 0.7) * height * 0.25 // 25% max height
    const barHeight = Math.max(dynamicHeight, 3) // Always at least 3px height
    
    // Start from top
    const startY = 0 // Start from the very top
    const y = startY

    // Create gradient for each bar
    const gradient = ctx.value.createLinearGradient(0, y, 0, y + barHeight)
    const intensity = Math.min(normalizedValue * 1.2, 1) // Dynamic color intensity
    
    // Dynamic gradient colors based on value
    gradient.addColorStop(0, `rgba(74, 0, 224, ${intensity})`)   // Top color
    gradient.addColorStop(0.5, `rgba(255, 62, 108, ${intensity})`) // Middle color
    gradient.addColorStop(1, `rgba(255, 62, 108, ${intensity})`)   // Bottom color

    // Draw bar with rounded corners
    ctx.value.beginPath()
    ctx.value.roundRect(x, y, barWidth, barHeight, 1) // Reduced corner radius
    ctx.value.fillStyle = gradient
    ctx.value.fill()

    // Dynamic glow effect based on value
    const glowIntensity = Math.min(normalizedValue * 10, 8)
    ctx.value.shadowColor = `rgba(255, 62, 108, ${normalizedValue * 0.4})`
    ctx.value.shadowBlur = glowIntensity
    ctx.value.shadowOffsetX = 0
    ctx.value.shadowOffsetY = 0
    ctx.value.fill()
    ctx.value.shadowBlur = 0
  })

  // Continue animation if we have audio data
  if (props.hasAudioData) {
    animationFrame.value = requestAnimationFrame(drawBars)
  }
}

// Watch for changes in audio data
watch(() => props.frequencyData, () => {
  if (props.hasAudioData && !animationFrame.value) {
    drawBars()
  }
}, { deep: true })

// Watch for play state changes
watch(() => props.isPlaying, (isPlaying) => {
  if (isPlaying && props.hasAudioData) {
    drawBars()
  } else {
    if (animationFrame.value) {
      cancelAnimationFrame(animationFrame.value)
      animationFrame.value = null
    }
  }
})

// Watch for audio data state
watch(() => props.hasAudioData, (hasData) => {
  if (hasData) {
    drawBars()
  } else {
    if (animationFrame.value) {
      cancelAnimationFrame(animationFrame.value)
      animationFrame.value = null
    }
  }
})

// Handle window resize
const handleResize = () => {
  initCanvas()
  if (props.hasAudioData) {
    drawBars()
  }
}

onMounted(() => {
  initCanvas()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value)
  }
})
</script>

<style scoped>
.bar-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.95));
  margin: 0;
  padding: 0;
  transform: translateY(0);
}

canvas {
  width: 100%;
  height: 100%;
  display: block;
  margin: 0;
  padding: 0;
  transform: translateY(0);
  transition: all 0.03s ease-out;
}
</style> 