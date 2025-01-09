<script>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { ref as dbRef, set, onValue, increment, getDatabase } from 'firebase/database';
  import { initializeApp } from 'firebase/app';

  const firebaseConfig = {
    apiKey: "AIzaSyCMO0_A8KvATJEPGchNueVvT_neS6wVnbU",
    authDomain: "portfolio-77a7d.firebaseapp.com",
    databaseURL: "https://portfolio-77a7d-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "portfolio-77a7d",
    storageBucket: "portfolio-77a7d.firebasestorage.app",
    messagingSenderId: "374727758344",
    appId: "1:374727758344:web:73d7dd13a1d39f0cedb7bd"
  };

  const app = initializeApp(firebaseConfig);
  export const database = getDatabase(app);

  export default {
    name: 'VisitorTracker',
    setup() {
      const totalVisitors = ref(0);
      const onlineVisitors = ref(0);
      const todayVisitors = ref(0);
      const visitorRef = dbRef(database, 'visitors');
      const onlineRef = dbRef(database, 'online');
      const todayRef = dbRef(database, `daily/${getTodayDate()}`);

      // Generate unique visitor ID
      const visitorId = generateVisitorId();

      function getTodayDate() {
        return new Date().toISOString().split('T')[0];
      }

      function generateVisitorId() {
        return 'visitor_' + Math.random().toString(36).substr(2, 9);
      }

      onMounted(async () => {
        // Update total visitors
        set(visitorRef, increment(1));

        // Track online status
        set(dbRef(database, `online/${visitorId}`), true);

        // Update today's visitors
        set(todayRef, increment(1));

        // Listen for changes
        onValue(visitorRef, (snapshot) => {
          totalVisitors.value = snapshot.val() || 0;
        });

        onValue(onlineRef, (snapshot) => {
          onlineVisitors.value = snapshot.val() ? Object.keys(snapshot.val()).length : 0;
        });

        onValue(todayRef, (snapshot) => {
          todayVisitors.value = snapshot.val() || 0;
        });
      });

      onUnmounted(() => {
        // Remove online status when user leaves
        set(dbRef(database, `online/${visitorId}`), null);
      });

      return {
        totalVisitors,
        onlineVisitors,
        todayVisitors
      };
    }
  }
</script>

<template>
  <div class="visitor-stats gap-2 hidden lg:flex">
    <div class="stat-box flex gap-1">
      <span>Total Visitors</span>
      <div class="count">{{ totalVisitors }}</div>
    </div>
    <div class="stat-box flex gap-1">
      <span>Online Now</span>
      <div class="count">{{ onlineVisitors }}</div>
    </div>
    <div class="stat-box flex gap-1">
      <span>Today's Visits</span>
      <div class="count">{{ todayVisitors }}</div>
    </div>
  </div>
</template>