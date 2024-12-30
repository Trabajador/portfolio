<script setup lang="ts">
  import { Swiper, SwiperSlide } from "swiper/vue";
  import { Autoplay, Pagination } from "swiper/modules";
  import { projectsItems } from "../data/index.ts";
  import "swiper/css";
  import "swiper/css/pagination";
</script>

<template>
  <section class="projects bg-darkBodyColor" id="projects">
    <div class="container">
      <div>
        <h2 class="subtitle" data-aos="fade-down">
          Projects
        </h2>
        <h4 class="text-whiteColor dark:text-inherit" data-aos="fade-down">
          MY CREATION
        </h4>
        <br />
      </div>
      <div class="w-full overflow-hidden">
        <Swiper
          :breakpoints="{
            0: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1280: { slidesPerView: 5, spaceBetween: 50 },
          }"
          :space-between="50"
          :loop="true"
          :autoplay="{ delay: 0, disableOnInteraction: false }"
          :speed="5000"
          :pagination="{ clickable: true }"
          :modules="[Pagination, Autoplay]"
          class="self-start"
        >
          <SwiperSlide
            v-for="(item, index) in projectsItems"
            :key="index"
            class="h-fit w-[300px] md:w-[400px] lg:w-[500px]"
          >
            <a :href="item.url" target="_blank" rel="noopener noreferrer" class="project-item cursor-none">
              <h5 v-if="!item.image" class="text-whiteColor dark:text-whiteColor font-bold font-Poppins text-7xl">
                {{ item.title }}
              </h5>
              <div v-if="item.image" class="w-full h-20">
                <img
                  :src="item.image"
                  :alt="item.title"
                  class="w-auto h-full"
                />
              </div>
            </a>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>
</template>