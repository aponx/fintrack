<script setup lang="ts">
const route = useRoute();

const menuItems = [
  { name: 'Dashboard', icon: 'grid_view', path: '/admin' },
  { name: 'Wallets', icon: 'business_center', path: '/admin/wallets' },
  { name: 'Users', icon: 'manage_accounts', path: '/admin/users' },
  { name: 'Stats', icon: 'bar_chart', path: '/admin/usage' },
];
</script>

<template>
  <nav class="bg-white dark:bg-[#151f2e] border-t border-gray-200 dark:border-gray-800 fixed bottom-0 left-0 right-0 z-30">
    <div class="flex items-center justify-around py-2">
      <NuxtLink 
        v-for="item in menuItems" 
        :key="item.name" 
        :to="item.path"
        class="flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors"
        :class="[
          route.path.startsWith('/admin') && (item.path === '/admin' ? route.path === '/admin' : route.path.startsWith(item.path))
            ? 'text-indigo-600 dark:text-indigo-400' 
            : 'text-gray-500 dark:text-gray-400'
        ]"
      >
        <span class="material-symbols-outlined text-xl">{{ item.icon }}</span>
        <span class="text-xs font-medium">{{ item.name }}</span>
      </NuxtLink>
    </div>
  </nav>
</template>
