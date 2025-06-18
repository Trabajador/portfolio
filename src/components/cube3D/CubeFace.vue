<template>
  <div class="face" :class="faceClass">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  faceClass: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.face {
  position: absolute;
  width: 400px;
  height: 400px;
  background: rgba(20, 20, 40, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.content {
  padding: 2rem;
  text-align: center;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 15px;
}

/* Beautiful Custom Scrollbar */
.content::-webkit-scrollbar {
  width: 8px;
}

.content::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}

.content::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #ff3e6c, #4a00e0);
  border-radius: 10px;
  border: 2px solid rgba(20, 20, 40, 0.9);
}

.content::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #ff5483, #5b1eff);
}

.content {
  scrollbar-width: thin;
  scrollbar-color: #ff3e6c rgba(255, 255, 255, 0.05);
}

.content h1 {
  font-size: 2.5rem;
  background: linear-gradient(45deg, #ff3e6c, #4a00e0);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 1rem;
}

.content h2 {
  color: #ff3e6c;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.content h3 {
  color: #4a00e0;
  margin-bottom: 0.5rem;
}

.content p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .face {
    width: 300px;
    height: 300px;
  }

  .content {
    padding: 1rem;
  }

  .content h1 {
    font-size: 2rem;
  }

  .content h2 {
    font-size: 1.5rem;
  }
}
</style>