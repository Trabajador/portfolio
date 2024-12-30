<script setup lang="ts">
import { ref } from "vue";
  import { testimonialsItems } from "../data/index.ts";
  import { Swiper, SwiperSlide } from "swiper/vue";
  import { Pagination } from "swiper/modules";
  import "swiper/css";
  import "swiper/css/pagination";

  const activeIndex = ref(0)
  const updateActiveIndex = (e) => {
    activeIndex.value = e.realIndex;
  };
</script>

<template>
  <section>
    <div class="px-5 pt-14 md:container">
      <h2 class="subtitle" data-aos="fade-down">
        Testimonials
      </h2>
      <h4 class="" data-aos="fade-down">
        MY CLIENT REVIEWS
      </h4>
      <br />
      <div id="containerForBullets"></div>
      <Swiper
        direction="vertical"
        :pagination="{ clickable: true }"
        :loop="true"
        :space-between="40"
        :slides-per-view="1.7"
        @slideChange="updateActiveIndex"
        :modules="[Pagination]"
        class="h-[40rem] max-w-3xl md:h-96"
        data-aos="fade-up"
      >
        <SwiperSlide v-for="(item, i) in testimonialsItems" :key="i">
          <div
            class="mx-8 flex h-full flex-col items-center gap-6 rounded-2xl border-2 border-yellow-800 bg-gray-800 p-8 duration-500 md:flex-row"
            :class="{ 'scale-75 blur-sm' : activeIndex != i }"
          >
            <img :src="item.image" :alt="item.name" class="h-24 w-24" />
            <div>
              <p class="text-sm text-gray-400 sm:text-base">
                {{item.review}}
              </p>
              <br />
              <h6 class="text-gray-300">{{item.name}}</h6>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>