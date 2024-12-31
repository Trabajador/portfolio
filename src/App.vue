<script setup lang="ts">
  import { onMounted } from "vue";
  import Navbar from "./components/Navbar.vue";
  import Hero from "./components/Hero.vue";
  import Skills from "./components/Skills.vue";
  import Services from "./components/Services.vue";
  import Projects from "./components/Projects.vue";
  import Testimonials from "./components/Testimonials.vue";
  import Contact from "./components/Contact.vue";
  import Footer from "./components/Footer.vue";
  import AOS from "aos";
  import "aos/dist/aos.css";
  import CustomCursor from './components/CustomCursor.vue';

  onMounted(() => {
    AOS.init({
      duration: 700,
      offset: 50,
      disable: "mobile",
    });
  })
</script>

<template>
  <CustomCursor />
  <Navbar />
  <main class="">
    <Hero />
    <Skills />
    <Projects />
    <Services />
    <Contact />
    <Footer />
  </main>
</template>