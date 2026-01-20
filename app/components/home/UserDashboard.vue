<script setup lang="ts">
defineProps<{
  user: any,
  onLogout: () => void
}>()
</script>

<template>
  <div class="glass-card p-8 text-center animate-fade-in">
    <div class="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
       <img :src="user.avatarUrl || ''" class="w-full h-full rounded-full object-cover border-4 border-white shadow-sm" alt="Avatar">
    </div>
    <h1 class="text-2xl font-bold mb-1">Welcome, {{ user.name }}!</h1>
    <p class="text-gray-500 mb-6 text-sm">{{ user.email }}</p>
    
    <button @click="onLogout" class="w-full py-3 px-4 bg-red-50 text-red-600 font-bold rounded-lg hover:bg-red-100 transition">
      Sign Out
    </button>
  </div>
</template>