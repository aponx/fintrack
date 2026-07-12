<script setup lang="ts">
// Menggunakan layout dashboard agar sidebar tetap ada
definePageMeta({
  layout: 'dashboard'
});

const router = useRouter();
const { createWallet } = useWalletLogic();

// Fetch master wallet types untuk dropdown
const { data: masterWallets, status: masterWalletsStatus, refresh } = await useFetch<any[]>('/api/wallet-types', {
  key: 'master-wallet-types',
  headers: useRequestHeaders(['cookie']),
  default: () => []
});

const form = reactive({
  walletId: '',
  code: '',
  name: '',
  amount: 0
});

const isLoading = ref(false);
const errorMessage = ref('');

const handleSave = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  
  try {
    const result = await createWallet(form);
    
    if (result.success) {
      // Setelah simpan, kembali ke halaman list wallet
      router.push('/wallets'); 
    } else {
      errorMessage.value = result.error || 'Failed to create wallet';
    }
  } catch (e: any) {
    errorMessage.value = e.data?.statusMessage || 'An error occurred';
  } finally {
    isLoading.value = false;
  }
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
        <div v-if="errorMessage" class="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm">
          {{ errorMessage }}
        </div>
        
        <div>
          <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Wallet Type</label>
          <select 
            v-model="form.walletId" 
            class="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition"
            required
          >
            <option value="" disabled>Select wallet type</option>
            <option 
              v-for="wallet in masterWallets" 
              :key="wallet.id" 
              :value="wallet.id"
            >
              {{ wallet.name }} ({{ wallet.type }})
            </option>
          </select>
          <p v-if="masterWalletsStatus === 'pending'" class="text-sm text-gray-500 mt-1">Loading wallet types...</p>
        </div>
        
        <div>
          <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Wallet Name</label>
          <input 
            v-model="form.name" 
            type="text" 
            placeholder="e.g. Main Savings" 
            class="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition"
            required
          >
        </div>
        
        <div>
          <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Code / Account Number</label>
          <input 
            v-model="form.code" 
            type="text" 
            placeholder="e.g. ACC-001" 
            class="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition"
            required
          >
        </div>
        
        <div>
          <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Initial Amount</label>
          <input 
            v-model.number="form.amount" 
            type="number" 
            placeholder="0" 
            class="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition"
          >
        </div>
        
        <button 
          type="submit" 
          :disabled="isLoading || masterWalletsStatus === 'pending'"
          class="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isLoading ? 'Saving...' : 'Save Wallet' }}
        </button>
      </form>
    </div>
  </div>
</template>