<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import DarkMode from "../components/DarkMode.vue";
import { AdjustmentsHorizontalIcon } from "@heroicons/vue/24/outline";
import { navItems } from "../data/index.ts";
import DarkLogo from "../assets/svg/iconM.svg";
import WhiteLogo from "../assets/svg/iconM-white.svg";

const showMenu = ref(false);
const active = ref(0);
const isScrolled = ref(false); // Track scroll for header

const toggleShowMenu = () => {
  showMenu.value = !showMenu.value;
};

const updateActive = (index: number) => {
  active.value = index;
};

let sectionObservers: IntersectionObserver[] = [];
let headerObserver: IntersectionObserver;

onMounted(() => {
  // Header scroll tracking
  const headerElement = document.querySelector("#header-marker");
  if (headerElement) {
    headerObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isScrolled.value = !entry.isIntersecting; // Toggle when header leaves the viewport
      },
      { root: null, threshold: 0 }
    );
    headerObserver.observe(headerElement);
  }

  // Scroll tracking for each section to update active nav item
  const sections = document.querySelectorAll("section");
  if (sections.length === 0) {
    console.error("No sections found to observe.");
    return;
  }

  // Create an IntersectionObserver for each section
  sectionObservers = Array.from(sections).map((section, index) => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          active.value = index; // Update active nav index when the section is visible
        }
      },
      {
        root: null, // Observe within the viewport
        threshold: 0.5, // 50% of the section should be visible
      }
    );

    observer.observe(section);
    return observer;
  });
});

onUnmounted(() => {
  // Cleanup observers on component unmount
  if (headerObserver) {
    const headerElement = document.querySelector("#header-marker");
    if (headerElement) {
      headerObserver.unobserve(headerElement);
    }
  }

  sectionObservers.forEach((observer) => observer.disconnect());
});
</script>


<template>
  <div id="header-marker"></div>

  <header
    :class="['w-screen sticky py-5 top-0 z-50 duration-300', { 'bg-sectionColor/70 shadow-lg' : isScrolled }]"
  >
    <div class="container">
      <div class="flex justify-between items-center">
        <div class="w-10 md:w-14">
          <img
            :src="DarkLogo"
            alt="Dark Logo SVG"
            class="dark:hidden"
          />
          <img
            :src="WhiteLogo"
            alt="White Logo SVG"
            class="hidden dark:block"
          />
        </div>
        <div class="flex items-center gap-3 lg:gap-5">
          <div>
            <a href="https://t.me/nostrick" class="btn">
              <span class="z-10">Hire Me!</span>
            </a>
          </div>
          <div>
            <button
              class="btn__svg sm:cursor-pointer rounded-lg"
              @click="toggleShowMenu"
            >
              <AdjustmentsHorizontalIcon class="size-5 lg:size-7" />
            </button>
          </div>
          <DarkMode />
        </div>
      </div>
      <nav
        class="fixed z-[999] flex items-center gap-5 dark:bg-primaryColorLight bg-primaryColor px-6 py-3 rounded-full text-gray-200 duration-300 left-[50%] translate-x-[-50%]"
        :class="{'bottom-10' : showMenu, 'bottom-[-100%]' : !showMenu }"
      >
        <a v-for="(item, index) in navItems" :key="index"
          :href="item.href"
          @click="updateActive(index)"
          class="text-xl p-2.5 rounded-full sm:cursor-pointer"
          :class="{ 'bg-primaryColorLight dark:bg-primaryColor' : active === index }"
        >
          <component :is="item.icon" class="size-6" />
        </a>
      </nav>
    </div>
  </header>
</template>
