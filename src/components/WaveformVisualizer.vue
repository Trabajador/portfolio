<template>
  <canvas ref="canvas" class="waveform-canvas"></canvas>
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

// Draw waveform
const drawWaveform = () => {
  if (!canvas.value || !ctx.value) return

  const width = canvas.value.width
  const height = canvas.value.height
  const startY = 0 // Start from the very top
  const maxHeight = height * 0.25 // 25% max height

  // Clear canvas with fade effect
  ctx.value.fillStyle = 'rgba(0, 0, 0, 0.1)'
  ctx.value.fillRect(0, 0, width, height)

  // Draw top waveform
  ctx.value.beginPath()
  ctx.value.moveTo(0, startY)

  props.frequencyData.forEach((value, index) => {
    const x = (index / props.frequencyData.length) * width
    const height = Math.pow(value / 255, 0.7) * maxHeight
    const y = startY + height // Draw downward from top

    if (index === 0) {
      ctx.value.moveTo(x, y)
    } else {
      const prevX = ((index - 1) / props.frequencyData.length) * width
      const prevHeight = Math.pow(props.frequencyData[index - 1] / 255, 0.7) * maxHeight
      const prevY = startY + prevHeight
      const cp1x = prevX + (x - prevX) * 0.5
      const cp1y = prevY
      const cp2x = prevX + (x - prevX) * 0.5
      const cp2y = y
      ctx.value.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
    }
  })

  // Create gradient for waveform
  const gradient = ctx.value.createLinearGradient(0, startY, 0, startY + maxHeight)
  gradient.addColorStop(0, 'rgba(74, 0, 224, 0.8)')
  gradient.addColorStop(0.5, 'rgba(255, 62, 108, 0.6)')
  gradient.addColorStop(1, 'rgba(255, 62, 108, 0.4)')

  ctx.value.strokeStyle = gradient
  ctx.value.lineWidth = 3
  ctx.value.stroke()

  // Add glow effect
  ctx.value.shadowColor = 'rgba(255, 62, 108, 0.4)'
  ctx.value.shadowBlur = 8
  ctx.value.stroke()
  ctx.value.shadowBlur = 0

  // Continue animation if we have audio data
  if (props.hasAudioData) {
    animationFrame.value = requestAnimationFrame(drawWaveform)
  }
}

// Watch for changes in audio data
watch(() => props.frequencyData, () => {
  if (props.hasAudioData && !animationFrame.value) {
    drawWaveform()
  }
}, { deep: true })

// Watch for play state changes
watch(() => props.isPlaying, (isPlaying) => {
  if (isPlaying && props.hasAudioData) {
    drawWaveform()
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
    drawWaveform()
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
    drawWaveform()
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
.waveform-canvas {
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
}

/* Smoother transition for more controlled movement */
canvas {
  transition: all 0.03s ease-out;
}
</style> 