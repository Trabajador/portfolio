<script setup lang="ts">
  import { servicesItems } from "../data/index.ts";
</script>

<template>
  <section id="services">
    <div class="md:container px-5 py-14">
      <h2 class="subtitle" data-aos="fade-down">
        Services
      </h2>
      <h4 class="" data-aos="fade-down">
        WHAT I OFFER
      </h4>
      <br />
      <div class="flex justify-between flex-col group">
        <div v-for="(item, index) in servicesItems" :key="index"
          class="service__item"
          data-aos="fade-up"
          :data-aos-delay="index * 500"
        >
          <div class="text-xl font-bold flex items-center gap-3 md:text-2xl w-[87%] md:w-[46%] lg::w-[40%]">
            <p class="text-primaryColorLight hover:text-whiteColor">{{ (index + 1).toString().padStart(2, '0') }}</p>
            <h6 class="">{{item.title}}</h6>
          </div>
          <div class="ml-auto origin-center w-[40px] md:order-last hidden md:block">
            <component :is="item.logo" class="mx-auto" />
          </div>
          <div class="md:max-w-[500px] lg:max-w-xl">
            <p>{{item.description}}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>