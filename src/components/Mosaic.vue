<script>
export default {
  name: "Mosaic",
  data() {
    return {
      elementScale: 64,
      elementsPerRow: 0,
      rows: 0,
      intervals: [],
      alt: 0,
    };
  },
  methods: {
    updateDimensions() {
      this.elementsPerRow = Math.floor(window.innerWidth / (this.elementScale * 0.5)) + 1;
      this.rows = Math.floor(window.innerHeight / (this.elementScale * 0.8)) + 1;
    },

    getRanInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    rotateElement(element, random = true) {
      const direction = random ? (Math.random() < 0.5 ? 1 : -1) : 1;
      const currentRotation = parseInt(element.getAttribute("data-rotation") || "0");
      const newRotation = currentRotation + 90 * direction;
      element.style.transform = `rotate(${newRotation}deg)`;
      element.setAttribute("data-rotation", newRotation);
    },

    startIntervals() {
      document.querySelectorAll(".cir").forEach((cir) => {
        const intervalId = setInterval(() => this.rotateElement(cir), this.getRanInt(1000, 42000));
        this.intervals.push(intervalId);
      });
    },

    clearIntervals() {
      this.intervals.forEach(clearInterval);
      this.intervals = [];
    },

    createGrid() {
      const cirContainer = document.createElement("div");
      cirContainer.classList.add("cirContainer");
      cirContainer.style.setProperty("--size", `${this.elementScale}px`);

      // Remove previous grid before creating a new one (if any)
      const existingContainers = this.$refs.cirContainerWrapper.querySelectorAll(".cirContainer");
      existingContainers.forEach((row) => row.remove());

      this.updateDimensions();

      for (let i = 0; i < this.rows; i++) {
        const cirRow = document.createElement("div");
        cirRow.classList.add("cirRow");

        for (let j = 0; j < this.elementsPerRow; j++) {
          const cir = document.createElement("div");
          cir.classList.add("cir");
          cir.setAttribute("x", j);
          cir.setAttribute("y", i);

          if ((j % 2 === 0 && i % 2 === 0) || (j % 2 === 1 && i % 2 === 1)) {
            cir.style.rotate = "90deg";
          }

          cir.addEventListener("mouseover", () => this.rotateElement(cir));
          cirRow.appendChild(cir);
        }
        cirContainer.appendChild(cirRow);
      }

      // Append the cirContainer to the wrapper using the ref
      this.$refs.cirContainerWrapper.appendChild(cirContainer);
    },

    handleClick() {
      if (this.alt === 0) {
        document.querySelectorAll(".cir").forEach((cir, index) => {
          const newRotation = index % 4 === 0 ? 90 : 0;
          cir.style.transform = `rotate(${newRotation}deg)`;
          cir.setAttribute("data-rotation", newRotation);
        });
        this.alt++;
      } else if (this.alt === 1) {
        document.querySelectorAll(".cir").forEach((cir, index) => {
          const newRotation = index % 2 === 0 ? 90 : 0;
          cir.style.transform = `rotate(${newRotation}deg)`;
          cir.setAttribute("data-rotation", newRotation);
        });
        this.alt++;
      } else if (this.alt === 2) {
        document.querySelectorAll(".cir").forEach((cir, index) => {
          const newRotation = index % 3 === 0 ? 90 : 0;
          cir.style.transform = `rotate(${newRotation}deg)`;
          cir.setAttribute("data-rotation", newRotation);
        });
        this.alt++;
      } else {
        document.querySelectorAll(".cir").forEach((cir) => {
          cir.style.transform = "rotate(0deg)";
          cir.setAttribute("data-rotation", 0);
        });
        this.alt = 0;
      }
    },
  },
  mounted() {
    this.createGrid();
    this.startIntervals();

    document.body.addEventListener("click", this.handleClick);
    document.body.addEventListener("mouseenter", this.clearIntervals);
    document.body.addEventListener("mouseleave", this.startIntervals);

    window.addEventListener("resize", () => {
      this.clearIntervals();
      this.createGrid();
      this.startIntervals();
    });
  },
  beforeDestroy() {
    this.clearIntervals();
    window.removeEventListener("resize", this.resizeHandler);
    document.body.removeEventListener("click", this.handleClick);
    document.body.removeEventListener("mouseenter", this.clearIntervals);
    document.body.removeEventListener("mouseleave", this.startIntervals);
  },
};
</script>

<template>
  <div ref="cirContainerWrapper" class="cir-container-wrapper absolute top-0 left-0 h-full overflow-hidden hidden md:flex"></div>
</template>