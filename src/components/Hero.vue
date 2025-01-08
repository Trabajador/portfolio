<script setup lang="ts">
  import HeroImg from "../assets/img/hero.jpg";
  import { ArrowDownTrayIcon } from "@heroicons/vue/24/outline"
  import GitHubLines from "../components/GitHubLines.vue";
</script>

<template>
  <section
    id="hero"
    class="relative py-5"
  >
  <div class="absolute right-0 top-[-20%] w-80 h-80 bg-primaryColorLight mix-blend-screen rounded blur-[150px] opacity-50"></div>
    <div class="container">
      <div class="">
        <div class="hidden md:block absolute top-0 left-[30%] animate-scaleAnimation">
          <p class="font-Poppins text-[400px] lg:text-[450px] text-primaryColorLight uppercase z-10 opacity-5">hi</p>
        </div>

        <div class="flex flex-col lg:flex-row items-center gap-5">
          <div class="space-y-2 md:w-1/2">
            <h3 class="text-2xl font-bold md:text-3xl lg:text-4xl">I am Mike</h3>
            <h1>
              <span class="title">Front End</span>
              <br>
              <span class="title">Web Developer</span>
            </h1>

            <p class="max-w-xl text-xl pb-5 hidden lg:flex">As a front-end developer, I create responsive, user-friendly websites and online stores using modern web technologies and CMS platforms. I transform designs into pixel-perfect interfaces and integrate custom solutions to deliver high-performance, scalable sites.</p>

            <div class="flex items-center flex-wrap gap-5">
              <a href="@/assets/documents/Mike-Gurba-CV2025.pdf"  download="Mike-Gurba-CV2025.pdf" class="btn__outline">
                  Download CV <ArrowDownTrayIcon class="size-5" />
              </a>

              <div class="flex items-center gap-3">
                <!-- <a
                  href="#"
                  class="social-icon"
                >
                  <svg
                    class="w-4 h-4 z-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 8 19"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="sr-only">Facebook page</span>
                </a>
                <a
                  href="#"
                  class="social-icon"
                >
                  <svg
                    class="w-4 h-4 z-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 17"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="sr-only">Twitter page</span>
                </a> -->
                <a
                  href="https://github.com/Trabajador"
                  class="social-icon"
                >
                  <svg
                    class="w-4 h-4 z-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="sr-only">GitHub account</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/mike-gurba-694006111/"
                  class="social-icon"
                >
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  version="1.1"
                  fill="currentColor"
                  stroke="currentColor">
                    <g transform="translate(-180.000000, -7479.000000)" fill="currentColor">
                      <g id="icons" transform="translate(56.000000, 160.000000)">
                        <path d="M144,7339 L140,7339 L140,7332.001 C140,7330.081 139.153,7329.01 137.634,7329.01 C135.981,7329.01 135,7330.126 135,7332.001 L135,7339 L131,7339 L131,7326 L135,7326 L135,7327.462 C135,7327.462 136.255,7325.26 139.083,7325.26 C141.912,7325.26 144,7326.986 144,7330.558 L144,7339 L144,7339 Z M126.442,7323.921 C125.093,7323.921 124,7322.819 124,7321.46 C124,7320.102 125.093,7319 126.442,7319 C127.79,7319 128.883,7320.102 128.883,7321.46 C128.884,7322.819 127.79,7323.921 126.442,7323.921 L126.442,7323.921 Z M124,7339 L129,7339 L129,7326 L124,7326 L124,7339 Z"></path> 
                      </g>
                    </g>
                </svg>
                  <span class="sr-only">Linkedin account</span>
                </a>
              </div>
            </div>
          </div>

          <div class="relative md:w-1/2 flex justify-center">
            <div class="absolute left-0 bottom-0 w-80 h-80 bg-primaryColorLight mix-blend-screen rounded blur-[150px] opacity-50"></div>

            <div class="card my-10 max-w-[70%] xl:max-w-[60%] rounded-[38px]">
              <img
                :src="HeroImg"
                alt="Hero"
                class="duration-300 origin-center rounded-[38px]"
              />
            </div>
          </div>

          <p class="max-w-xl text-xl pb-5 lg:hidden">As a front-end developer, I create responsive, user-friendly websites and online stores using modern web technologies and CMS platforms. I transform designs into pixel-perfect interfaces and integrate custom solutions to deliver high-performance, scalable sites.</p>
        </div>
      </div>

      <div class="grid grid-cols-1 place-items-center gap-10 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div class="flex items-center gap-3">
          <p class="text-5xl font-bold lg:text-6xl">7</p>
          <p>
            Years of <br> Experience
          </p>
        </div>

        <div class="flex items-center gap-3">
          <p class="text-5xl font-bold lg:text-6xl">50+</p>
          <p>
            Projects <br> Completed
          </p>
        </div>

        <div class="flex items-center gap-3">
          <p class="text-5xl font-bold lg:text-6xl">1.3k</p>
          <p>
            Happy <br> Clients
          </p>
        </div>

        <div class="flex items-center gap-3">
          <p class="text-5xl font-bold lg:text-6xl"><GitHubLines /></p>
          <p>
            Lines of <br> Code
          </p>
        </div>
      </div>
    </div>
  </section>
</template>