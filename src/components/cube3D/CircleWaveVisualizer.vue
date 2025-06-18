<template>
  <canvas ref="canvas" class="circle-wave-canvas"></canvas>
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

// Draw circular wave
const drawWave = () => {
  if (!canvas.value || !ctx.value) return

  const width = canvas.value.width
  const height = canvas.value.height
  const centerX = width / 2
  const centerY = height / 2
  const cubeSize = 400 // Match cube size
  const baseRadius = cubeSize * 0.8 // Slightly larger than cube
  const segments = 128 // Increased from 64 to 128 for smoother visualization

  // Clear canvas with fade effect
  ctx.value.fillStyle = 'rgba(0, 0, 0, 0.1)'
  ctx.value.fillRect(0, 0, width, height)

  // Process frequency data for better visualization
  const processedData = props.frequencyData.map((value, index) => {
    // Apply frequency smoothing with more emphasis on current value
    const prevValue = index > 0 ? props.frequencyData[index - 1] : value
    const nextValue = index < props.frequencyData.length - 1 ? props.frequencyData[index + 1] : value
    const smoothedValue = (prevValue * 0.2 + value * 0.6 + nextValue * 0.2)
    return smoothedValue
  })

  // Draw dynamic bars around the circle
  const barCount = processedData.length // Use all frequency data points
  for (let i = 0; i < barCount; i++) {
    const angle = (i / barCount) * Math.PI * 2
    const value = processedData[i] || 0
    const normalizedValue = value / 255
    
    // Calculate bar length with higher amplitude
    const minLength = 2
    const maxLength = 50
    const barLength = minLength + (Math.pow(normalizedValue, 0.4) * (maxLength - minLength))
    const barWidth = 1.5
    
    const startX = centerX + Math.cos(angle) * baseRadius
    const startY = centerY + Math.sin(angle) * baseRadius
    const endX = centerX + Math.cos(angle) * (baseRadius + barLength)
    const endY = centerY + Math.sin(angle) * (baseRadius + barLength)
    
    // Create gradient for each bar with more vibrant colors
    const gradient = ctx.value.createLinearGradient(startX, startY, endX, endY)
    gradient.addColorStop(0, 'rgba(74, 0, 224, 0.8)')
    gradient.addColorStop(1, 'rgba(255, 62, 108, 0.8)')
    
    ctx.value.beginPath()
    ctx.value.moveTo(startX, startY)
    ctx.value.lineTo(endX, endY)
    ctx.value.strokeStyle = gradient
    ctx.value.lineWidth = barWidth
    ctx.value.stroke()

    // Add more pronounced glow effect
    ctx.value.shadowColor = 'rgba(255, 62, 108, 0.4)'
    ctx.value.shadowBlur = 5
    ctx.value.stroke()
    ctx.value.shadowBlur = 0
  }

  // Draw multiple circular waves
  for (let layer = 0; layer < 3; layer++) {
    const radius = baseRadius - (layer * 30)
    const waveHeight = 35 - (layer * 5)

    ctx.value.beginPath()
    
    // Use all frequency data points for the wave
    for (let i = 0; i <= processedData.length; i++) {
      const angle = (i / processedData.length) * Math.PI * 2
      const value = processedData[i % processedData.length] || 0
      const normalizedValue = value / 255
      
      // Calculate wave height with more dramatic response
      const minHeight = 1
      const maxHeight = waveHeight
      const dynamicHeight = minHeight + (Math.pow(normalizedValue, 0.4) * (maxHeight - minHeight))
      
      // Calculate position from center
      const waveRadius = radius + dynamicHeight
      const x = centerX + Math.cos(angle) * waveRadius
      const y = centerY + Math.sin(angle) * waveRadius

      if (i === 0) {
        ctx.value.moveTo(x, y)
      } else {
        const prevAngle = ((i - 1) / processedData.length) * Math.PI * 2
        const prevValue = processedData[(i - 1) % processedData.length] || 0
        const prevNormalizedValue = prevValue / 255
        const prevDynamicHeight = minHeight + (Math.pow(prevNormalizedValue, 0.4) * (maxHeight - minHeight))
        const prevWaveRadius = radius + prevDynamicHeight
        
        const prevX = centerX + Math.cos(prevAngle) * prevWaveRadius
        const prevY = centerY + Math.sin(prevAngle) * prevWaveRadius
        
        const cp1x = prevX + (x - prevX) * 0.5
        const cp1y = prevY
        const cp2x = prevX + (x - prevX) * 0.5
        const cp2y = y
        
        ctx.value.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
      }
    }

    // Create gradient for each wave with more vibrant colors
    const gradient = ctx.value.createLinearGradient(0, 0, width, height)
    const alpha = 0.8 - (layer * 0.2)
    gradient.addColorStop(0, `rgba(74, 0, 224, ${alpha})`)
    gradient.addColorStop(0.5, `rgba(255, 62, 108, ${alpha})`)
    gradient.addColorStop(1, `rgba(74, 0, 224, ${alpha})`)

    ctx.value.strokeStyle = gradient
    ctx.value.lineWidth = 2.5
    ctx.value.stroke()

    // Add more pronounced glow
    ctx.value.shadowColor = `rgba(255, 62, 108, ${0.4 - (layer * 0.1)})`
    ctx.value.shadowBlur = 5
    ctx.value.stroke()
    ctx.value.shadowBlur = 0
  }

  // Continue animation if we have audio data
  if (props.hasAudioData) {
    animationFrame.value = requestAnimationFrame(drawWave)
  }
}

// Watch for changes in audio data
watch(() => props.frequencyData, () => {
  if (props.hasAudioData && !animationFrame.value) {
    drawWave()
  }
}, { deep: true })

// Watch for play state changes
watch(() => props.isPlaying, (isPlaying) => {
  if (isPlaying && props.hasAudioData) {
    drawWave()
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
    drawWave()
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
    drawWave()
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
.circle-wave-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
  background: transparent;
  margin: 0;
  padding: 0;
}

canvas {
  width: 100%;
  height: 100%;
  display: block;
  margin: 0;
  padding: 0;
  transition: all 0.03s ease-out;
}
</style> 