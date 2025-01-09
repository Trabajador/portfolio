<script>
import { ref, onMounted, onUnmounted } from 'vue';
import {
  ref as dbRef,
  set,
  update,
  onValue,
  onDisconnect,
  increment,
  getDatabase,
} from 'firebase/database';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default {
  name: 'VisitorTracker',
  setup() {
    const totalVisitors = ref(0);
    const onlineVisitors = ref(0);
    const todayVisitors = ref(0);
    const visitorRef = dbRef(database, 'visitors');
    const onlineRef = dbRef(database, 'online');
    const todayRef = dbRef(database, `daily/${getTodayDate()}`);

    const visitorId = generateVisitorId();

    function getTodayDate() {
      return new Date().toISOString().split('T')[0];
    }

    function generateVisitorId() {
      return `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    onMounted(async () => {
      const userOnlineRef = dbRef(database, `online/${visitorId}`);
      set(userOnlineRef, true);
      onDisconnect(userOnlineRef).remove();

      update(visitorRef, { count: increment(1) });
      update(todayRef, { count: increment(1) });

      onValue(visitorRef, (snapshot) => {
        totalVisitors.value = snapshot.val()?.count || 0;
      });

      onValue(onlineRef, (snapshot) => {
        const data = snapshot.val();
        console.log('Online visitors data:', data);
        onlineVisitors.value = data ? Object.keys(data).length : 0;
      });

      onValue(todayRef, (snapshot) => {
        todayVisitors.value = snapshot.val()?.count || 0;
      });
    });

    onUnmounted(() => {
      // No manual cleanup needed; onDisconnect handles it
    });

    return {
      totalVisitors,
      onlineVisitors,
      todayVisitors,
    };
  },
};
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
