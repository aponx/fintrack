<template>
  <NuxtLink 
    to="/wallets/create"
    class="w-full h-full min-h-[180px] rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center gap-3 text-gray-400 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all group cursor-pointer"
  >
    <div class="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 flex items-center justify-center transition-colors">
      <span class="material-symbols-outlined text-2xl">add</span>
    </div>
    <span class="font-bold text-sm">Create New Wallet</span>
  </NuxtLink>
</template>