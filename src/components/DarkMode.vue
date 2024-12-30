<script setup lang="ts">
  import { useDark, useToggle } from "@vueuse/core";
  import { SunIcon, MoonIcon } from "@heroicons/vue/24/outline";

  const isDark = useDark({
    // selector: 'body',
    // attribute: 'color-scheme',
    // valueDark: 'custom-dark',
    // valueLight: 'custom-light',

    onChanged(isDark) {
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  });

  const toggleDark = useToggle(isDark);
</script>

<template>
  <div>
    <button
      @click="toggleDark()"
      class="btn__svg sm:cursor-pointer rounded-lg"
    >
      <SunIcon v-if="isDark" class="size-5 lg:size-7" />
      <MoonIcon v-else class="size-5 lg:size-7" />
    </button>
  </div>
</template>