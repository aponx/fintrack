<script setup lang="ts">
const route = useRoute();

defineProps<{
  onLogout: () => void
}>()

const menuItems = [
  { name: 'Admin Dashboard', icon: 'admin_panel_settings', path: '/admin' },
  { name: 'Master Wallet', icon: 'business_center', path: '/admin/wallets' },
  { name: 'User Management', icon: 'manage_accounts', path: '/admin/users' },
  { name: 'Usage Stats', icon: 'bar_chart', path: '/admin/usage' },
];
</script>

<template>
  <aside class="w-64 bg-white dark:bg-[#151f2e] border-r border-gray-200 dark:border-gray-800 flex flex-col justify-between h-screen sticky top-0">
    <div>
      <!-- Logo -->
      <div class="p-8 flex items-center gap-3">
        <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
          <span class="material-symbols-outlined text-xl">admin_panel_settings</span>
        </div>
        <h1 class="text-xl font-bold tracking-tight">FinTrack Admin</h1>
      </div>

      <!-- Navigation -->
      <nav class="px-4 space-y-1">
        <p class="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Admin Panel</p>
        <NuxtLink 
          v-for="item in menuItems" 
          :key="item.name" 
          :to="item.path"
          :class="['flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors', 
                   route.path.startsWith('/admin') && (item.path === '/admin' ? route.path === '/admin' : route.path.startsWith(item.path))
                   ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400' 
                   : 'text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800']"
        >
          <span class="material-symbols-outlined text-[20px]">{{ item.icon }}</span>
          {{ item.name }}
        </NuxtLink>
      </nav>
    </div>

    <!-- Logout Button -->
    <div class="p-4">
      <button @click="onLogout" class="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-lg w-full transition">
        <span class="material-symbols-outlined">logout</span>
        Sign Out
      </button>
    </div>
  </aside>
</template>
