<script setup lang="ts">
import '~/assets/css/home.css';
const { user, handleEmailLogin } = await useHomeLogic();

// Tentukan layout secara dinamis
// Jika user login -> pakai layout 'dashboard'
// Jika user belum login -> pakai layout default (kosong/login page)
definePageMeta({
  layout: false // Kita handle manual di template atau middleware
});
</script>

<template>
  <NuxtLayout name="dashboard" v-if="user">
    <HomeUserDashboard :user="user" :on-logout="() => {}" />
  </NuxtLayout>

  <div v-else class="min-h-screen relative flex flex-col items-center justify-center p-4 overflow-hidden bg-[#f0f4f8] dark:bg-[#101922]">
      <div class="fixed inset-0 z-0 pointer-events-none">
        <div class="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-200/40 rounded-full blur-[100px] dark:bg-blue-900/20"></div>
        <div class="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[80px] dark:bg-blue-800/20"></div>
        <div class="absolute inset-0 bg-pattern opacity-[0.4]"></div>
      </div>
      
      <div class="relative z-10 w-full max-w-[480px]">
        <HomeLoginCard :on-email-login="handleEmailLogin" />
      </div>
  </div>
</template>