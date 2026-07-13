<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['auth']
});

// Cek user dan role di client side juga untuk keamanan tambahan - sudah dihandle oleh middleware dan layout
// Halaman ini hanya akan dirender jika user adalah ADMIN

// Mock data untuk master wallet types
const walletTypes = ref([
  { id: 1, code: 'PRETTY_CASH', name: 'Pretty Cash', isDefault: true, createdAt: '2024-01-15' },
  { id: 2, code: 'LARGE_CASH', name: 'Large Cash', isDefault: false, createdAt: '2024-01-15' },
]);

const showModal = ref(false);
const editingWallet = ref<any>(null);
const formData = ref({
  code: '',
  name: '',
  isDefault: false
});

const openModal = (wallet?: any) => {
  if (wallet) {
    editingWallet.value = wallet;
    formData.value = { ...wallet };
  } else {
    editingWallet.value = null;
    formData.value = { code: '', name: '', isDefault: false };
  }
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  editingWallet.value = null;
  formData.value = { code: '', name: '', isDefault: false };
};

const saveWallet = () => {
  // TODO: Implement API call to save wallet
  console.log('Saving wallet:', formData.value);
  closeModal();
};

const deleteWallet = (id: number) => {
  if (confirm('Are you sure you want to delete this wallet type?')) {
    // TODO: Implement API call to delete wallet
    console.log('Deleting wallet:', id);
  }
};
</script>

<template>
  <div class="p-6 md:p-8 max-w-7xl mx-auto pb-24 md:pb-8">
    
    <!-- Header -->
    <div class="flex justify-between items-end mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Master Wallet Management</h1>
        <p class="text-gray-500 dark:text-gray-400">Kelola jenis-jenis wallet yang tersedia di sistem</p>
      </div>
      <button 
        @click="openModal()"
        class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all"
      >
        <span class="material-symbols-outlined text-sm">add</span>
        Add Wallet Type
      </button>
    </div>

    <!-- Table -->
    <div class="bg-white dark:bg-[#151f2e] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Code</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Default</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Created At</th>
              <th class="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
            <tr v-for="wallet in walletTypes" :key="wallet.id" class="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition">
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                  {{ wallet.code }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ wallet.name }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span v-if="wallet.isDefault" class="inline-flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                  <span class="material-symbols-outlined text-sm">check_circle</span>
                  Yes
                </span>
                <span v-else class="text-sm text-gray-400">No</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ wallet.createdAt }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right">
                <div class="flex items-center justify-end gap-2">
                  <button 
                    @click="openModal(wallet)"
                    class="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
                  >
                    <span class="material-symbols-outlined text-sm">edit</span>
                  </button>
                  <button 
                    @click="deleteWallet(wallet.id)"
                    class="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                  >
                    <span class="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Form -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div class="bg-white dark:bg-[#151f2e] rounded-xl w-full max-w-md shadow-2xl">
        <div class="p-6 border-b border-gray-100 dark:border-gray-800">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">
            {{ editingWallet ? 'Edit' : 'Add' }} Wallet Type
          </h3>
        </div>
        
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Code</label>
            <input 
              v-model="formData.code"
              type="text" 
              placeholder="e.g., PRETTY_CASH"
              class="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
            />
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Name</label>
            <input 
              v-model="formData.name"
              type="text" 
              placeholder="e.g., Pretty Cash"
              class="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
            />
          </div>
          
          <div class="flex items-center gap-3">
            <input 
              v-model="formData.isDefault"
              type="checkbox" 
              id="isDefault"
              class="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label for="isDefault" class="text-sm font-semibold text-gray-700 dark:text-gray-300">Set as Default</label>
          </div>
        </div>
        
        <div class="p-6 border-t border-gray-100 dark:border-gray-800 flex gap-3 justify-end">
          <button 
            @click="closeModal"
            class="px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
          >
            Cancel
          </button>
          <button 
            @click="saveWallet"
            class="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>

  </div>
</template>
