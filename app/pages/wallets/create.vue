<script setup lang="ts">
// Menggunakan layout dashboard agar sidebar tetap ada
definePageMeta({
  layout: 'dashboard'
});

const router = useRouter();

// Mock function simpan (nanti diisi logic API)
const handleSave = () => {
  // Logic simpan ke database...
  
  // Setelah simpan, kembali ke halaman list wallet
  router.push('/wallets'); 
};
</script>

<template>
  <div class="p-6 md:p-8 max-w-2xl mx-auto">
    <div class="flex items-center gap-4 mb-8">
      <NuxtLink to="/wallets" class="w-10 h-10 rounded-full bg-white dark:bg-[#151f2e] border border-gray-200 dark:border-gray-800 flex items-center justify-center hover:bg-gray-50 transition">
        <span class="material-symbols-outlined text-gray-600 dark:text-gray-300">arrow_back</span>
      </NuxtLink>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Create New Wallet</h1>
    </div>

    <div class="bg-white dark:bg-[#151f2e] p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
      <form @submit.prevent="handleSave" class="space-y-6">
        <div>
          <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Wallet Name</label>
          <input type="text" placeholder="e.g. Main Savings" class="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition">
        </div>
        
        <button type="submit" class="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition">
          Save Wallet
        </button>
      </form>
    </div>
  </div>
</template>