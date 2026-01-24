<script setup lang="ts">
// 1. Import Logic & CSS
import '~/assets/css/wallet.css';

// --- PERBAIKAN DI SINI (Tambahkan await) ---
// Karena useWalletLogic melakukan fetching data API, kita harus menunggunya.
const { wallets, totalNetWorth, formatCurrency } = await useWalletLogic();

// 2. Gunakan Layout Dashboard
definePageMeta({
  layout: 'dashboard'
});
</script>

<template>
  <div class="p-6 md:p-8 max-w-7xl mx-auto pb-24 md:pb-8">
    
    <div class="hidden md:flex justify-between items-end mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">My Wallets</h1>
        </div>

      <NuxtLink 
        to="/wallets/create"
        class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all"
      >
        <span class="material-symbols-outlined text-sm">add</span>
        Add New Wallet
      </NuxtLink>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <WalletCard 
        v-for="wallet in wallets" 
        :key="wallet.id"
        :wallet="wallet"
        :format-currency="formatCurrency"
      />

      <div class="hidden md:block">
        <WalletAddCard />
      </div>
    </div>

    <NuxtLink 
        to="/wallets/create"
        class="md:hidden fixed bottom-24 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-xl shadow-blue-600/40 flex items-center justify-center active:scale-90 transition z-30"
    >
        <span class="material-symbols-outlined text-2xl">add</span>
    </NuxtLink>

  </div>
</template>