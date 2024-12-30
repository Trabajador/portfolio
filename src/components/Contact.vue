<script setup lang="ts">
  // import ContactSVG from "../assets/svg/contact.svg";
  import Mosaic from '../components/Mosaic.vue';
</script>

<template>
  <section class="contact pt-0" id="contact">
    <div class="container">
      <h2 class="subtitle" data-aos="fade-down backdrop-blur-sm bg-white/30">
        Hire Me
      </h2>
      <h4 class="" data-aos="fade-down">
        FOR YOUR PROJECTS
      </h4>
      <br />
      <div class="flex items-center flex-col space-y-4 lg:flex-row justify-center">
        <div
          data-aos="fade-left"
          class=""
        >
          <div class="w-full">
            <address class="relative flex space-x-2">
              <div class="space-y-2 leading-loose hidden sm:block">
                Name <br />
                Email <br />
                Phone
              </div>
              <div
                id="contact-details"
                class="space-y-2 font-medium leading-loose"
              >
                Mike Gurba <br />
                mihailgurba@gmail.com <br />
                + 48 515 147 076
              </div>
            </address>
          </div>
          <a href="https://t.me/nostrick" class="btn inline-block mt-10">
            <span class="z-10">Hire Me!</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>