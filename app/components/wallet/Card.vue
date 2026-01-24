<script setup lang="ts">
defineProps<{
  wallet: any,
  formatCurrency: (val: number) => string
}>()
</script>

<template>
  <div class="bg-white dark:bg-[#151f2e] p-5 rounded-2xl border border-gray-100 dark:border-gray-800 wallet-card-hover flex flex-col justify-between h-full min-h-[180px]">
    
    <div class="flex justify-between items-start mb-4">
      <div :class="`w-12 h-12 rounded-2xl flex items-center justify-center icon-bg-${wallet.color}`">
        <span class="material-symbols-outlined text-2xl">{{ wallet.icon }}</span>
      </div>
      <span :class="`wallet-badge badge-${wallet.color}`">{{ wallet.type }}</span>
    </div>

    <div>
      <p class="text-gray-500 dark:text-gray-400 text-xs font-medium mb-1">{{ wallet.name }}</p>
      <h3 class="text-2xl font-bold text-gray-900 dark:text-white">{{ formatCurrency(wallet.balance) }}</h3>
    </div>

    <div class="mt-4 pt-4 border-t border-gray-50 dark:border-gray-800 flex justify-between items-center text-xs">
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-green-500"></span>
        <span class="text-gray-400">{{ wallet.status }}</span>
      </div>
      <span class="text-gray-400 font-medium">{{ wallet.meta }}</span>
    </div>

  </div>
</template>