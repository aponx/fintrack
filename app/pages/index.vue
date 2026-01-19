<script setup lang="ts">
const { data: user, refresh } = await useFetch('/api/user');

async function handleLogout() {
  try {
    await $fetch('/api/logout', { method: 'POST' });
    await refresh(); 
    window.location.href = '/login'; 
  } catch (error) {
    console.error('Logout failed', error);
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
    
    <div v-if="user" class="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
      <div class="mb-6 relative inline-block">
        <img 
          :src="user.avatarUrl || 'https://placehold.co/150'" 
          alt="Avatar" 
          class="w-24 h-24 rounded-full border-4 border-blue-100 mx-auto"
        />
        <div class="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
      </div>
      
      <h1 class="text-2xl font-bold text-gray-800 mb-1">
        Halo, {{ user.name }}!
      </h1>
      <p class="text-gray-500 text-sm mb-6">{{ user.email }}</p>

      <div class="grid grid-cols-2 gap-4 mb-6">
        <div class="bg-blue-50 p-3 rounded-lg">
          <p class="text-xs text-blue-600 font-semibold">STATUS</p>
          <p class="font-bold text-blue-800">Active</p>
        </div>
        <div class="bg-purple-50 p-3 rounded-lg">
          <p class="text-xs text-purple-600 font-semibold">MEMBER SINCE</p>
          <p class="font-bold text-purple-800">2026</p>
        </div>
      </div>

      <button 
        @click="handleLogout"
        class="w-full bg-red-50 text-red-600 py-2 px-4 rounded-lg font-medium hover:bg-red-100 transition duration-200"
      >
        Sign Out
      </button>
    </div>

    <div v-else class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">FinTrack App</h1>
      <p class="text-gray-600 mb-8">Kelola keuangan Anda dengan mudah dan aman.</p>
      
      <a href="/login/google" class="btn-google">
        Sign in with Google
      </a>
    </div>

  </div>
</template>

<style scoped>
.btn-google {
  padding: 10px 20px;
  background-color: #4285F4;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
}
.btn-google:hover {
  background-color: #357ae8;
}
</style>