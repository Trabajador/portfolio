<template>
  <div
    class="custom-cursor"
    :style="{ top: `${cursorY}px`, left: `${cursorX}px`, display: isHovering ? 'flex' : 'none' }"
  >
    <span class="cursor-text">{{ cursorText }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const cursorX = ref(0);
const cursorY = ref(0);
const isHovering = ref(false);
const cursorText = ref("View Live Site"); // Text inside the cursor

// Update cursor position
const updateCursor = (e: MouseEvent) => {
  cursorX.value = e.clientX;
  cursorY.value = e.clientY;
};

// Show cursor and set text on hover
const handleMouseEnter = (text: string) => {
  cursorText.value = text;
  isHovering.value = true;
};

// Hide cursor on hover leave
const handleMouseLeave = () => {
  isHovering.value = false;
};

// Add event listeners for the projects section
onMounted(() => {
  const projectElements = document.querySelectorAll(".project-item");
  projectElements.forEach((element) => {
    element.addEventListener("mouseenter", () => handleMouseEnter("View Live Site"));
    element.addEventListener("mouseleave", handleMouseLeave);
  });

  document.addEventListener("mousemove", updateCursor);
});

// Cleanup on unmount
onUnmounted(() => {
  const projectElements = document.querySelectorAll(".project-item");
  projectElements.forEach((element) => {
    element.removeEventListener("mouseenter", () => handleMouseEnter("View"));
    element.removeEventListener("mouseleave", handleMouseLeave);
  });

  document.removeEventListener("mousemove", updateCursor);
});
</script>
