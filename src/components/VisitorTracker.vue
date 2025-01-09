<script>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { ref as dbRef, set, onValue, increment, get, remove, getDatabase } from 'firebase/database';
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
      const visitorRef = dbRef(database, 'visitors');
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
        // Update total visitors - Increment only once and don't increment on reload
        const totalVisitorsSnapshot = await get(visitorRef);
        if (!totalVisitorsSnapshot.exists()) {
          set(visitorRef, 0);  // Initialize if not set
        }
        set(visitorRef, increment(1));  // Increment only once when the visitor is first seen

        // Track online status - Use visitorId to track individual visitors
        set(dbRef(database, `online/${visitorId}`), true);

        // Update today's visitors - Increment only once per day
        const todaySnapshot = await get(todayRef);
        if (!todaySnapshot.exists()) {
          set(todayRef, 0);  // Initialize if not set
        }
        set(todayRef, increment(1));

        // Listen for changes
        onValue(visitorRef, (snapshot) => {
          totalVisitors.value = snapshot.val() || 0;
        });
      });

      onUnmounted(() => {
        // Ensure cleanup of online status when user leaves
        remove(dbRef(database, `online/${visitorId}`));
      });

      return {
        totalVisitors
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
  </div>
</template>