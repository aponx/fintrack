<script setup lang="ts">
const route = useRoute();

const bottomNavItems = [
  { name: 'Home', icon: 'home', path: '/' },
  { name: 'Wallet', icon: 'account_balance_wallet', path: '/wallets' },
  { name: 'Budget', icon: 'pie_chart', path: '/budgets' },
  { name: 'Transaction', icon: 'receipt_long', path: '/transactions' },
];
</script>

<template>
  <div class="fixed bottom-0 left-0 w-full bg-white dark:bg-[#151f2e] border-t border-gray-100 dark:border-gray-800 pb-safe pt-2 px-6 z-40">
    <div class="flex justify-between items-center">
      <NuxtLink 
        v-for="item in bottomNavItems" 
        :key="item.name" 
        :to="item.path"
        class="flex flex-col items-center gap-1 p-2 w-16 transition-colors"
        :class="route.path === item.path ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'"
      >
        <span class="material-symbols-outlined" :class="route.path === item.path ? 'text-[28px]' : 'text-[24px]'">{{ item.icon }}</span>
        <span class="text-[10px] font-medium">{{ item.name }}</span>
      </NuxtLink>
    </div>
    <div class="h-6 w-full"></div> 
  </div>
</template>