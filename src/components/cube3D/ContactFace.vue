<template>
  <CubeFace faceClass="bottom">
    <h2>Contact</h2>
    <p>Email: hello@example.com</p>
    <p>Phone: +1 (123) 456-7890</p>
    <div class="social">
      <a href="#">GitHub</a>
      <a href="#">LinkedIn</a>
      <a href="#">Twitter</a>
    </div>
    <form class="contact-form">
      <div class="form-group">
        <label>Name</label>
        <input type="text" placeholder="Your name" />
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="email" placeholder="Your email" />
      </div>
      <div class="form-group">
        <label>Message</label>
        <textarea placeholder="Tell me about your audio visualization project..." rows="4"></textarea>
      </div>
      <button type="submit">Send Message</button>
    </form>
  </CubeFace>
</template>

<script setup>
import CubeFace from './CubeFace.vue'
</script>

<style scoped>
.contact-form {
  margin-top: 2rem;
  text-align: left;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #ff3e6c;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: white;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #ff3e6c;
}

.contact-form button {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(45deg, #ff3e6c, #4a00e0);
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s;
}

.contact-form button:hover {
  transform: translateY(-3px);
}

.social {
  margin: 1.5rem 0;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.social a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  transition: all 0.3s;
}

.social a:hover {
  background: #ff3e6c;
  transform: translateY(-3px);
}
</style>