<script setup lang="ts">
  import { ArrowUpRightIcon } from "@heroicons/vue/24/solid";
  import { skillsItems } from "../data/index.ts";
</script>

<template>
  <section class="min-h-fit bg-sectionColor dark:bg-darkSectionColor" id="skills">
    <div class="container">
      <h2 class="subtitle" data-aos="fade-down">
        Skills
      </h2>
      <h4 class="" data-aos="fade-down">
        MY TOP SKILLS
      </h4>
      <br />
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div v-for="(item, index) in skillsItems" :key="index"
          class="group relative flex w-full max-w-sm items-center gap-5 rounded-md border-2 border-primaryColorLight dark:border-primaryColor bg-primaryColor dark:bg-primaryColorLight p-5 duration-200 sm:cursor-pointer"
          data-aos="fade-up"
          :data-aos-delay="index * 400"
        >
          <div>
            <img
              :src="item.logo"
              :alt="item.name"
              class="w-10 duration-200 transform group-hover:scale-125 aspect-square"
            />
          </div>
          <div>
            <h6 class="text-whiteColor">{{ item.name }}</h6>
            <div class="absolute right-3 top-3 text-xl">
              <ArrowUpRightIcon class="size-6 dark:text-primaryColor text-primaryColorLight group-hover:scale-110 group-hover:text-white duration-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>