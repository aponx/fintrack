<script setup lang="ts">
const route = useRoute();

defineProps<{
  onLogout: () => void
}>()

const menuItems = [
  { name: 'Dashboard', icon: 'grid_view', path: '/' },
  { name: 'Wallets', icon: 'account_balance_wallet', path: '/wallets' },
  { name: 'Budgets', icon: 'pie_chart', path: '/budgets' },
  { name: 'Transactions', icon: 'receipt_long', path: '/transactions' },
  { name: 'Reports', icon: 'bar_chart', path: '/reports' },
  { name: 'Settings', icon: 'settings', path: '/settings' },
];
</script>

<template>
  <aside class="w-64 bg-white dark:bg-[#151f2e] border-r border-gray-200 dark:border-gray-800 flex flex-col justify-between h-screen sticky top-0">
    <div>
      <div class="p-8 flex items-center gap-3">
        <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
          <span class="material-symbols-outlined text-xl">account_balance_wallet</span>
        </div>
        <h1 class="text-xl font-bold tracking-tight">FinTrack Pro</h1>
      </div>

      <nav class="px-4 space-y-1">
        <NuxtLink 
          v-for="item in menuItems" 
          :key="item.name" 
          :to="item.path"
          :class="['flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors', 
                   route.path === item.path 
                   ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
                   : 'text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800']"
        >
          <span class="material-symbols-outlined text-[20px]">{{ item.icon }}</span>
          {{ item.name }}
        </NuxtLink>
      </nav>
    </div>

    <div class="p-4">
      <div class="bg-blue-600 rounded-xl p-4 text-white text-center mb-4">
          <h3 class="font-bold mb-1">Upgrade Plan</h3>
          <p class="text-xs text-blue-100 mb-3">Get unlimited access</p>
          <button class="w-full py-2 bg-white text-blue-600 text-xs font-bold rounded-lg hover:bg-gray-100">Upgrade</button>
      </div>
      <button @click="onLogout" class="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-lg w-full transition">
        <span class="material-symbols-outlined">logout</span>
        Sign Out
      </button>
    </div>
  </aside>
</template>